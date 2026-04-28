// ===================================================================
// FIREBASE HELPER - Quiz Namespace Router
// ===================================================================
// Cilj: omogućiti da admin.html (studio) i super-admin auto-kvizovi
// rade PARALELNO u Firebase, bez međusobnog ometanja.
//
// Studio kviz (admin.html)  →  globalne putanje: /settings, /gameState, /players, ...
// Online kviz (auto-mode)   →  /liveQuizzes/{quizId}/settings, /liveQuizzes/{quizId}/gameState, ...
//
// Kako se koristi:
//   <script src="firebase-config.js"></script>
//   <script src="firebase-helper.js"></script>
//
// Onda umjesto:   database.ref('gameState').on('value', ...)
// Pišeš:          Q.ref('gameState').on('value', ...)
//
// Q automatski zna gdje je: čita ?quiz=ID iz URL-a.
// Ako nema ?quiz=ID, ponaša se IDENTIČNO kao raniji kod (globalne putanje).
// ===================================================================

(function (global) {
  'use strict';

  // Pročitaj quiz ID iz URL-a (?quiz=abc123)
  function readQuizIdFromUrl() {
    try {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('quiz');
      return id && id.trim() ? id.trim() : null;
    } catch (e) {
      return null;
    }
  }

  // Trenutni quiz ID (može se promijeniti programski preko Q.setQuizId)
  let currentQuizId = readQuizIdFromUrl();

  // Putanje koje su "per-quiz" — ako smo u online modu, prefix se dodaje.
  // Sve ostale putanje (npr. playerProfiles, questionBank, scheduledQuizzes,
  // playerResults, kicked, ranglista...) ostaju GLOBALNE jer su zajedničke
  // za platformu.
  const PER_QUIZ_PATHS = [
    'settings',
    'gameState',
    'players',
    'questions',
    'answers',
    'answerHistory',
    'roundHistory',
    'roundResults',
    'lobby',           // ko čeka u lobby-ju za auto-kviz
    'eliminated',
    'autoState',       // interni state auto-runnera (timestamp sljedeće akcije, itd.)
  ];

  // Provjeri da li je putanja "per-quiz" — gleda samo prvi segment.
  function isPerQuizPath(path) {
    if (!path) return false;
    const firstSegment = String(path).split('/')[0];
    return PER_QUIZ_PATHS.includes(firstSegment);
  }

  // Vrati pravi Firebase ref za zadati path, uzimajući u obzir trenutni quiz.
  // Ako je quizId postavljen i path je per-quiz, dodaje prefix.
  // Inače, vraća globalnu putanju (kao i prije).
  function ref(path) {
    if (!global.database) {
      throw new Error('[firebase-helper] database nije inicijaliziran. Učitaj firebase-config.js prije firebase-helper.js.');
    }
    if (currentQuizId && isPerQuizPath(path)) {
      return global.database.ref(`liveQuizzes/${currentQuizId}/${path}`);
    }
    return global.database.ref(path);
  }

  // Eksplicitno postavi quiz ID (korisno za auto-runner koji upravlja sa više kvizova)
  function setQuizId(id) {
    currentQuizId = id && String(id).trim() ? String(id).trim() : null;
    console.log('[Q] Quiz ID set to:', currentQuizId || '(global / studio mode)');
  }

  function getQuizId() {
    return currentQuizId;
  }

  function isOnlineMode() {
    return !!currentQuizId;
  }

  // Pomoćnik za auto-runner i super-admin: vraća ref bilo kojeg kviza
  // bez obzira na trenutni currentQuizId. Korisno kad jedan tab upravlja
  // sa više kvizova istovremeno.
  function refForQuiz(quizId, path) {
    if (!quizId) {
      // Studio kviz — globalno
      return global.database.ref(path);
    }
    if (isPerQuizPath(path)) {
      return global.database.ref(`liveQuizzes/${quizId}/${path}`);
    }
    return global.database.ref(path);
  }

  // Korisno za debug: ispiši sve aktivne live kvizove
  function listLiveQuizzes() {
    return global.database.ref('liveQuizzes').once('value').then(snap => {
      const data = snap.val() || {};
      return Object.keys(data);
    });
  }

  // ===================================================================
  // AUTO-ROUTING MODE
  // ===================================================================
  // Umjesto da mijenjamo svaki database.ref('...') u player.html / display.html,
  // možemo monkey-patch-ovati database.ref da automatski radi prefix.
  // Ovo se uključuje pozivom Q.enableAutoRouting() ODMAH nakon firebase init.
  //
  // Nakon toga, sav postojeći kod koji koristi database.ref('settings') itd.
  // automatski prelazi na liveQuizzes/{id}/settings ako smo u online modu.
  // ===================================================================

  let _originalRef = null;
  function enableAutoRouting() {
    if (!global.database) {
      throw new Error('[Q] enableAutoRouting: database nije inicijaliziran.');
    }
    if (_originalRef) {
      console.warn('[Q] Auto-routing je već uključen.');
      return;
    }
    _originalRef = global.database.ref.bind(global.database);
    global.database.ref = function (path) {
      // Specijalne Firebase putanje (počinju sa .) ne diramo
      if (typeof path === 'string' && path.startsWith('.')) {
        return _originalRef(path);
      }
      if (currentQuizId && isPerQuizPath(path)) {
        return _originalRef(`liveQuizzes/${currentQuizId}/${path}`);
      }
      return _originalRef(path);
    };
    console.log('[Q] Auto-routing enabled. database.ref() sada automatski usmjerava na liveQuizzes/' + currentQuizId + '/* za per-quiz putanje.');
  }

  // Eksportuj
  global.Q = {
    ref,
    refForQuiz,
    setQuizId,
    getQuizId,
    isOnlineMode,
    isPerQuizPath,
    listLiveQuizzes,
    enableAutoRouting,
    PER_QUIZ_PATHS,
  };

  console.log(
    '[Q] firebase-helper učitan. Mode:',
    currentQuizId ? `ONLINE (quiz=${currentQuizId})` : 'STUDIO (global paths)'
  );
})(window);
