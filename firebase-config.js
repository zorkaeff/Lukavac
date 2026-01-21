// ===================================================================
// FIREBASE KONFIGURACIJA
// ===================================================================

const firebaseConfig = {
  apiKey: "AIzaSyCtzey-4az-UKVXWfPi4-62-lZU5usPoCM",
  authDomain: "lukavac-4feb1.firebaseapp.com",
  databaseURL: "https://lukavac-4feb1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "lukavac-4feb1",
  storageBucket: "lukavac-4feb1.firebasestorage.app",
  messagingSenderId: "709802643693",
  appId: "1:709802643693:web:003422c72fc8422d07fce4"
};

// Inicijalizacija Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

console.log('🔥 Firebase initialized successfully!');

// ===================================================================
// DEFAULT SETTINGS - POSTAVKE IGRE
// ===================================================================

const DEFAULT_SETTINGS = {
  quizName: "LUKAVAC DANA",
  password: "1234",
  minPlayers: 2,
  maxPlayers: 8,
  numRounds: 6,
  rounds: [
    // KRUG 1: Lakša pitanja
    { 
      questions: 10, 
      values: [10, 5, 0, -5, -10],  // [!, ., netočno ., -?, -!]
      elimination: 2,               // Ispadaju 2 igrača
      time1: 20,                    // Vrijeme za ! i . odgovore
      time2: 5,                     // Vrijeme za ? odgovore
      timeAnswer: 5,                // Prikaz točnog odgovora
      timePause: 45,                // Pauza između pitanja
      pauseRound: "manual" 
    },
    // KRUG 2
    { 
      questions: 10, 
      values: [20, 10, 0, -10, -20], 
      elimination: 1, 
      time1: 20, 
      time2: 5, 
      timeAnswer: 5, 
      timePause: 45, 
      pauseRound: "manual" 
    },
    // KRUG 3
    { 
      questions: 10, 
      values: [30, 15, 0, -15, -30], 
      elimination: 1, 
      time1: 20, 
      time2: 5, 
      timeAnswer: 5, 
      timePause: 45, 
      pauseRound: "manual" 
    },
    // KRUG 4
    { 
      questions: 10, 
      values: [40, 20, 0, -20, -40], 
      elimination: 1, 
      time1: 20, 
      time2: 5, 
      timeAnswer: 5, 
      timePause: 45, 
      pauseRound: "manual" 
    },
    // KRUG 5
    { 
      questions: 10, 
      values: [50, 25, 0, -25, -50], 
      elimination: 1, 
      time1: 20, 
      time2: 5, 
      timeAnswer: 5, 
      timePause: 45, 
      pauseRound: "manual" 
    },
    // KRUG 6: FINALE
    { 
      questions: 10, 
      values: [100, 50, 0, -50, -100], 
      elimination: 1, 
      time1: 20, 
      time2: 5, 
      timeAnswer: 5, 
      timePause: 45, 
      pauseRound: "manual" 
    }
  ]
};

// ===================================================================
// INICIJALNA PITANJA
// ===================================================================

const INITIAL_QUESTIONS = [
  // KRUG 1 - Lakša pitanja (10€/5€)
  {
    round: 1,
    text: "Glavni grad Hrvatske je?",
    answers: ["Zagreb", "Split", "Rijeka", "Osijek"],
    correct: 0
  },
  {
    round: 1,
    text: "Koliko planeta ima u Sunčevom sustavu?",
    answers: ["7", "8", "9", "10"],
    correct: 1
  },
  {
    round: 1,
    text: "Koja je valuta u Hrvatskoj od 2023. godine?",
    answers: ["Kuna", "Euro", "Dinar", "Funta"],
    correct: 1
  },
  {
    round: 1,
    text: "Tko je naslikao Mona Lisu?",
    answers: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
    correct: 1
  },
  {
    round: 1,
    text: "Koliko kontinenata ima na Zemlji?",
    answers: ["5", "6", "7", "8"],
    correct: 2
  },
  {
    round: 1,
    text: "U kojoj zemlji se nalazi Eiffelov toranj?",
    answers: ["Italija", "Španjolska", "Francuska", "Belgija"],
    correct: 2
  },
  {
    round: 1,
    text: "Koliko igrača ima u nogometnoj momčadi?",
    answers: ["9", "10", "11", "12"],
    correct: 2
  },
  {
    round: 1,
    text: "Koji je najveći ocean na Zemlji?",
    answers: ["Atlantski", "Indijski", "Arktički", "Tihi"],
    correct: 3
  },
  {
    round: 1,
    text: "Koliko stupnjeva ima pravi kut?",
    answers: ["45", "60", "90", "180"],
    correct: 2
  },
  {
    round: 1,
    text: "Koja je kemijska oznaka za zlato?",
    answers: ["Go", "Gd", "Au", "Ag"],
    correct: 2
  },
  
  // KRUG 2 - Srednje teška (20€/10€)
  {
    round: 2,
    text: "Koje godine je pao Berlinski zid?",
    answers: ["1987", "1989", "1991", "1993"],
    correct: 1
  },
  {
    round: 2,
    text: "Tko je napisao 'Romeo i Julija'?",
    answers: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correct: 1
  },
  {
    round: 2,
    text: "Koliko kostiju ima odrasla osoba?",
    answers: ["186", "206", "226", "246"],
    correct: 1
  },
  {
    round: 2,
    text: "Koja je najveća pustinja na svijetu?",
    answers: ["Sahara", "Gobi", "Antarktik", "Arabijska"],
    correct: 2
  },
  {
    round: 2,
    text: "U kojoj godini je čovjek prvi put sletio na Mjesec?",
    answers: ["1965", "1967", "1969", "1971"],
    correct: 2
  },
  {
    round: 2,
    text: "Koliko srca ima hobotnica?",
    answers: ["1", "2", "3", "4"],
    correct: 2
  },
  {
    round: 2,
    text: "Koji je najdulji rijeka na svijetu?",
    answers: ["Nil", "Amazon", "Yangtze", "Mississippi"],
    correct: 0
  },
  {
    round: 2,
    text: "Koliko zuba ima odrasla osoba?",
    answers: ["28", "30", "32", "34"],
    correct: 2
  },
  {
    round: 2,
    text: "Koji element ima kemijski simbol 'O'?",
    answers: ["Osmij", "Kisik", "Optij", "Oganesson"],
    correct: 1
  },
  {
    round: 2,
    text: "Koliko je stranica u kocki?",
    answers: ["4", "6", "8", "12"],
    correct: 1
  },

  // KRUG 3 - Teža (30€/15€)
  {
    round: 3,
    text: "Tko je bio prvi predsjednik Sjedinjenih Američkih Država?",
    answers: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"],
    correct: 1
  },
  {
    round: 3,
    text: "U kojoj je godini počeo Prvi svjetski rat?",
    answers: ["1912", "1914", "1916", "1918"],
    correct: 1
  },
  {
    round: 3,
    text: "Koliko aminokiselina ima u ljudskom tijelu?",
    answers: ["18", "20", "22", "24"],
    correct: 1
  },
  {
    round: 3,
    text: "Koji je najdublji ocean?",
    answers: ["Atlantski", "Indijski", "Tihi", "Arktički"],
    correct: 2
  },
  {
    round: 3,
    text: "Koliko je stupnjeva Celzijusa apsolutna nula?",
    answers: ["-273.15", "-270.15", "-260.15", "-250.15"],
    correct: 0
  },
  {
    round: 3,
    text: "Koji je plin najzastupljeniji u Zemljinoj atmosferi?",
    answers: ["Kisik", "Dušik", "Argon", "Ugljični dioksid"],
    correct: 1
  },
  {
    round: 3,
    text: "Koliko je elemenata u periodnom sustavu?",
    answers: ["108", "112", "118", "124"],
    correct: 2
  },
  {
    round: 3,
    text: "U kojoj zemlji se nalazi Machu Picchu?",
    answers: ["Meksiko", "Peru", "Brazil", "Čile"],
    correct: 1
  },
  {
    round: 3,
    text: "Tko je otkrio penicilin?",
    answers: ["Louis Pasteur", "Marie Curie", "Alexander Fleming", "Jonas Salk"],
    correct: 2
  },
  {
    round: 3,
    text: "Koliko je planeta veće od Zemlje?",
    answers: ["3", "4", "5", "6"],
    correct: 1
  }
];

// ===================================================================
// FUNKCIJA ZA INICIJALIZACIJU
// ===================================================================

function initializeGame() {
  console.log('🎮 Inicijalizacija igre...');
  
  // 1. Postavi settings
  database.ref('settings').set(DEFAULT_SETTINGS).then(() => {
    console.log('✅ Settings postavljeni!');
  });
  
  // 2. Postavi pitanja
  database.ref('questions').set(INITIAL_QUESTIONS).then(() => {
    console.log('✅ Pitanja učitana! Ukupno:', INITIAL_QUESTIONS.length);
  });
  
  // 3. Reset game state
  database.ref('gameState').set({
    currentRound: 1,
    currentQuestion: 0,
    isActive: false,
    timerEnd: null,
    showResults: false,
    phase: 'waiting'
  }).then(() => {
    console.log('✅ Game state resetiran!');
  });
  
  // 4. Reset players i answers
  database.ref('players').set({});
  database.ref('answers').set({});
  
  console.log('✅ Igra spremna za pokretanje!');
  console.log('📋 Postavke:');
  console.log('   - Ime: ' + DEFAULT_SETTINGS.quizName);
  console.log('   - Šifra: ' + DEFAULT_SETTINGS.password);
  console.log('   - Krugova: ' + DEFAULT_SETTINGS.numRounds);
  console.log('   - Pitanja: ' + INITIAL_QUESTIONS.length);
}

// ===================================================================
// POZOVI OVO SAMO PRVI PUT!
// Nakon što pokreneš, zakomentiraj liniju ispod
// ===================================================================

// Odkomentiraj sljedeću liniju i refreshaj stranicu DA INICIJALIZIRAŠ:
// initializeGame();

// Nakon inicijalizacije, ZAKOMENTIRAJ liniju iznad i refreshaj ponovo!
