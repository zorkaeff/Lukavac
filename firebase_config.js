// ===================================================================
// FIREBASE KONFIGURACIJA - ZAMIJENI SA SVOJIM PODACIMA!
// ===================================================================

// KORAK 1: Idi na https://console.firebase.google.com
// KORAK 2: Klikni na svoj projekt "Lukavac"
// KORAK 3: Project Settings (⚙️ ikona) > General
// KORAK 4: Scroll dolje do "Your apps" > Web app
// KORAK 5: Kopiraj firebaseConfig objekt i zalijepi ga ispod

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

// ===================================================================
// INICIJALNA PITANJA
// ===================================================================

const INITIAL_QUESTIONS = [
  // KRUG 1 - Lakša pitanja (10€/5€)
  {
    round: 1,
    text: "Glavni grad Hrvatske je?",
    answers: ["Zagreb", "Split", "Rijeka", "Osijek"],
    correct: 0,
    value: 10
  },
  {
    round: 1,
    text: "Koliko planeta ima u Sunčevom sustavu?",
    answers: ["7", "8", "9", "10"],
    correct: 1,
    value: 10
  },
  {
    round: 1,
    text: "Koja je valuta u Hrvatskoj od 2023. godine?",
    answers: ["Kuna", "Euro", "Dinar", "Funta"],
    correct: 1,
    value: 10
  },
  {
    round: 1,
    text: "Tko je naslikao Mona Lisu?",
    answers: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
    correct: 1,
    value: 10
  },
  {
    round: 1,
    text: "Koliko kontinenata ima na Zemlji?",
    answers: ["5", "6", "7", "8"],
    correct: 2,
    value: 10
  },
  {
    round: 1,
    text: "U kojoj zemlji se nalazi Eiffelov toranj?",
    answers: ["Italija", "Španjolska", "Francuska", "Belgija"],
    correct: 2,
    value: 10
  },
  {
    round: 1,
    text: "Koliko igrača ima u nogometnoj momčadi?",
    answers: ["9", "10", "11", "12"],
    correct: 2,
    value: 10
  },
  {
    round: 1,
    text: "Koji je najveći ocean na Zemlji?",
    answers: ["Atlantski", "Indijski", "Arktički", "Tihi"],
    correct: 3,
    value: 10
  },
  {
    round: 1,
    text: "Koliko stupnjeva ima pravi kut?",
    answers: ["45", "60", "90", "180"],
    correct: 2,
    value: 10
  },
  {
    round: 1,
    text: "Koja je kemijska oznaka za zlato?",
    answers: ["Go", "Gd", "Au", "Ag"],
    correct: 2,
    value: 10
  },
  
  // KRUG 2 - Srednje teška (20€/10€)
  {
    round: 2,
    text: "Koje godine je pao Berlinski zid?",
    answers: ["1987", "1989", "1991", "1993"],
    correct: 1,
    value: 20
  },
  {
    round: 2,
    text: "Tko je napisao 'Romeo i Julija'?",
    answers: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correct: 1,
    value: 20
  },
  {
    round: 2,
    text: "Koliko kostiju ima odrasla osoba?",
    answers: ["186", "206", "226", "246"],
    correct: 1,
    value: 20
  },
  {
    round: 2,
    text: "Koja je najveća pustinja na svijetu?",
    answers: ["Sahara", "Gobi", "Antarktik", "Arabijska"],
    correct: 2,
    value: 20
  },
  {
    round: 2,
    text: "U kojoj godini je čovjek prvi put sletio na Mjesec?",
    answers: ["1965", "1967", "1969", "1971"],
    correct: 2,
    value: 20
  },
  {
    round: 2,
    text: "Koliko srca ima hobotnica?",
    answers: ["1", "2", "3", "4"],
    correct: 2,
    value: 20
  },
  {
    round: 2,
    text: "Koji je najdulji rijeka na svijetu?",
    answers: ["Nil", "Amazon", "Yangtze", "Mississippi"],
    correct: 0,
    value: 20
  },
  {
    round: 2,
    text: "Koliko zuba ima odrasla osoba?",
    answers: ["28", "30", "32", "34"],
    correct: 2,
    value: 20
  },
  {
    round: 2,
    text: "Koji element ima kemijski simbol 'O'?",
    answers: ["Osmij", "Kisik", "Optij", "Oganesson"],
    correct: 1,
    value: 20
  },
  {
    round: 2,
    text: "Koliko je stranica u kocki?",
    answers: ["4", "6", "8", "12"],
    correct: 1,
    value: 20
  },

  // KRUG 3 - Teža (30€/15€)
  {
    round: 3,
    text: "Tko je bio prvi predsjednik Sjedinjenih Američkih Država?",
    answers: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"],
    correct: 1,
    value: 30
  },
  {
    round: 3,
    text: "U kojoj je godini počeo Prvi svjetski rat?",
    answers: ["1912", "1914", "1916", "1918"],
    correct: 1,
    value: 30
  },
  {
    round: 3,
    text: "Koliko aminokiselina ima u ljudskom tijelu?",
    answers: ["18", "20", "22", "24"],
    correct: 1,
    value: 30
  },
  {
    round: 3,
    text: "Koji je najdublji ocean?",
    answers: ["Atlantski", "Indijski", "Tihi", "Arktički"],
    correct: 2,
    value: 30
  },
  {
    round: 3,
    text: "Koliko je stupnjeva Celzijusa apsolutna nula?",
    answers: ["-273.15", "-270.15", "-260.15", "-250.15"],
    correct: 0,
    value: 30
  },
  {
    round: 3,
    text: "Koji je plin najzastupljeniji u Zemljinoj atmosferi?",
    answers: ["Kisik", "Dušik", "Argon", "Ugljični dioksid"],
    correct: 1,
    value: 30
  },
  {
    round: 3,
    text: "Koliko je elementi u periodnom sustavu?",
    answers: ["108", "112", "118", "124"],
    correct: 2,
    value: 30
  },
  {
    round: 3,
    text: "U kojoj zemlji se nalazi Machu Picchu?",
    answers: ["Meksiko", "Peru", "Brazil", "Čile"],
    correct: 1,
    value: 30
  },
  {
    round: 3,
    text: "Tko je otkrio penicilin?",
    answers: ["Louis Pasteur", "Marie Curie", "Alexander Fleming", "Jonas Salk"],
    correct: 2,
    value: 30
  },
  {
    round: 3,
    text: "Koliko je planeta veće od Zemlje?",
    answers: ["3", "4", "5", "6"],
    correct: 1,
    value: 30
  }
];

// ===================================================================
// HELPER FUNKCIJE
// ===================================================================

function initializeGame() {
  database.ref('questions').set(INITIAL_QUESTIONS);
  database.ref('gameState').set({
    currentRound: 1,
    currentQuestion: 0,
    isActive: false,
    timerEnd: null,
    showResults: false,
    phase: 'waiting'
  });
  database.ref('players').set({});
  database.ref('answers').set({});
  console.log('✅ Igra inicijalizirana!');
}

// Pozovi ovu funkciju samo prvi put
// initializeGame();
