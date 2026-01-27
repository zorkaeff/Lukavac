# 🦊 LUKAVAC KVIZ PLATFORMA - Kompletan Ekosistem

## 📋 PREGLED SISTEMA

Kompletna kviz platforma sa:
- Multi-kviz sistem (različita vremena i tipovi)
- Player dashboard sa svim funkcionalnostima
- Admin super dashboard sa bazama podataka
- Automatsko zakazivanje i izvršavanje kvizova
- Kompletna statistika i rang liste

---

## 🗂️ STRUKTURA FILEA

### **Player Side (Korisnici):**
```
register.html         → Registracija sa profilom
login.html            → Login sa email/nadimak
dashboard.html        → Glavni dashboard nakon logina ✅ KREIRAN
player.html           → Igranje kviza (postojeći)
quizzes.html          → Lista svih kvizova
results.html          → Tvoji rezultati
rankings.html         → Globalna rang lista
profile.html          → Moj profil
rules.html            → Pravila igre
news.html             → Novosti
donations.html        → Donacije
contact.html          → Kontakt
```

### **Admin Side (Administrator):**
```
admin-dashboard.html  → Super dashboard pregled ✅ KREIRAN
admin.html            → Uživo kontrola kviza (postojeći)
```

---

## 🎯 DASHBOARD.HTML - Player Dashboard

### **Features:**
✅ Quick Stats (Pobjede, Zarada, Ocjena, Rang)
✅ 8 Glavnih Kategorija:
  - 🎮 KVIZOVI
  - 📊 REZULTATI
  - 🏆 RANG LISTA
  - 👤 MOJ PROFIL
  - 📋 PRAVILA
  - 📰 NOVOSTI
  - 💝 DONACIJE
  - 📧 KONTAKT

✅ Uživo & Nadolazeći Kvizovi
✅ Tvoji Nedavni Rezultati

### **Kviz Tipovi:**
```javascript
scheduledQuizzes: {
  quiz1: {
    name: "Lukavac Sata 08:00",
    type: "sata",
    startTime: 1706432400000,
    prizePool: 100,
    status: "scheduled" | "live" | "finished"
  }
}
```

**Svi Tipovi:**
- 🕐 Lukavac Sata (08:00, 12:00, 16:00, 20:00, 00:00)
- 🌙 Lukavac Dana (20:00)
- 🌃 Lukavac Noći (00:00)
- 💎 Lukavac Premium Subota (22:00)
- 📅 Lukavac Tjedna Nedjelja (20:00)
- 📆 Lukavac Mjeseca 31.01.2026 (21:00)

---

## 🛠️ ADMIN-DASHBOARD.HTML - Super Admin Panel

### **7 Glavnih Sekcija:**

#### **1. 📊 Dashboard**
- Ukupno pitanja, igrača, kvizova, zarade
- Nedavne aktivnosti
- Quick actions (Zakaži kviz, Dodaj pitanja, Pokreni uživo)

#### **2. ❓ Baza Pitanja**
**Tablica sa:**
- ID, Pitanje, Kategorija, Težina, Status (Korišteno/Nekorišteno)
- Broj puta korišteno
- Filter: Težina (Easy/Medium/Hard)
- Filter: Kategorija (Sport, Geografija, Film, Muzika...)
- Filter: Korišteno/Nekorišteno
- Akcije: Edit, Delete, Dodaj novo

**Firebase Struktura:**
```javascript
questionBank: {
  question1: {
    text: "Koji je glavni grad Hrvatske?",
    answers: ["Zagreb", "Split", "Rijeka", "Osijek"],
    correct: 0,
    category: "Geografija",
    difficulty: "easy",
    timesUsed: 5,
    lastUsed: 1706374800000,
    createdBy: "admin",
    createdAt: 1706374800000
  }
}
```

#### **3. 👥 Baza Igrača**
**Tablica sa:**
- Profilna slika, Nadimak, Ime, Lokacija
- Pobjede, Ukupna zarada, Prosječna ocjena
- Broj igara
- Export CSV
- Search (pretraživanje)
- Akcije: View profil, Edit, Block

#### **4. 📈 Baza Rezultata**
**Tablica sa:**
- Kviz naziv, Igrač, Rang, Bodovi, Zarada, Ocjena
- Vrijeme (koliko je trajala igra)
- Datum
- Filter po kvizistu

**Firebase Struktura:**
```javascript
playerResults: {
  playerId1: {
    quiz1: {
      quizId: "quiz1",
      quizName: "Lukavac Sata 08:00",
      timestamp: 1706374800000,
      rank: 1,
      score: 850,
      earnings: 500,
      rating: 10,
      totalTime: 45000,
      questionCount: 10
    }
  }
}
```

#### **5. 🎮 Napravljeni Kvizovi**
**Lista kvizova:**
- Spremljeni kvizovi (draft)
- Zakazani kvizovi (scheduled)
- Završeni kvizovi (completed)

**Svaki kviz sadrži:**
- Naziv, Tip, Broj pitanja
- Nagradni fond
- Datum i vrijeme
- Status badge (Draft/Scheduled/Live/Finished)

**Firebase Struktura:**
```javascript
scheduledQuizzes: {
  quiz1: {
    name: "Lukavac Sata 08:00",
    type: "sata",
    startTime: 1706432400000,
    prizePool: 100,
    questionIds: ["q1", "q2", ...],
    status: "scheduled",
    playerCount: 0,
    createdBy: "admin",
    createdAt: 1706374800000
  }
}

completedQuizzes: {
  quiz1: {
    ...scheduledQuiz data,
    endTime: 1706433000000,
    finalPlayerCount: 45,
    winner: {
      playerId: "p1",
      name: "Marko",
      score: 850
    },
    results: {...}
  }
}
```

#### **6. 📅 Zakaži Novi Kviz**
**Forma:**
- Naziv kviza
- Tip (Sata/Dana/Noći/Premium/Tjedna/Mjeseca)
- Datum i vrijeme početka
- Nagradni fond
- Odabir pitanja iz baze (popup sa filterima)
- Broj pitanja
- Trajanje po pitanju

**Workflow:**
1. Popuni formu
2. Odaberi pitanja (otvara modal sa listom svih pitanja)
3. Klikni "Zakaži Kviz"
4. Sprema u Firebase `/scheduledQuizzes`
5. Cron job automatski pokreće kviz u zakazano vrijeme

#### **7. 🔴 Uživo Kontrola**
- Lista svih zakazanih kvizova
- Klik na kviz → Otvara postojeći `admin.html` sa tim kvizom
- Manual start kviza

---

## 🔥 FIREBASE BAZA - Kompletan Struktura

```javascript
{
  // PITANJA
  "questionBank": {
    "question-id-1": {
      "text": "Pitanje?",
      "answers": ["A", "B", "C", "D"],
      "correct": 0,
      "category": "Sport",
      "difficulty": "easy",
      "timesUsed": 5,
      "lastUsed": 1706374800000,
      "createdBy": "admin",
      "createdAt": 1706374800000
    }
  },
  
  // IGRAČI PROFILI
  "playerProfiles": {
    "player-id-1": {
      "nickname": "LukavacKing",
      "firstName": "Marko",
      "email": "marko@example.com",
      "profilePhoto": "data:image...",
      "wins": 12,
      "stats": {
        "totalGames": 45,
        "totalEarnings": 12500,
        "averageRating": 8.5,
        "currentRank": 5
      },
      // ... sve ostalo iz registracije
    }
  },
  
  // ZAKAZANI KVIZOVI
  "scheduledQuizzes": {
    "quiz-id-1": {
      "name": "Lukavac Sata 08:00",
      "type": "sata",
      "startTime": 1706432400000,
      "prizePool": 100,
      "questionIds": ["q1", "q2", "q3"],
      "status": "scheduled",
      "playerCount": 0,
      "settings": {
        "maxPlayers": 100,
        "rounds": [...]
      }
    }
  },
  
  // ZAVRŠENI KVIZOVI
  "completedQuizzes": {
    "quiz-id-1": {
      "name": "Lukavac Sata 08:00",
      "startTime": 1706432400000,
      "endTime": 1706433000000,
      "finalPlayerCount": 45,
      "winner": {
        "playerId": "p1",
        "name": "Marko",
        "score": 850
      }
    }
  },
  
  // REZULTATI IGRAČA
  "playerResults": {
    "player-id-1": {
      "quiz-id-1": {
        "rank": 1,
        "score": 850,
        "earnings": 500,
        "rating": 10,
        "timestamp": 1706433000000
      }
    }
  },
  
  // TRENUTNA IGRA (za uživo)
  "players": { ... },
  "gameState": { ... },
  "answers": { ... },
  "settings": { ... }
}
```

---

## 🤖 AUTOMATIZACIJA - Cron Jobs

### **Schedule Service (potrebno kreirati):**

```javascript
// Provjerava svake minute
setInterval(() => {
  database.ref('scheduledQuizzes').once('value').then(snap => {
    const quizzes = snap.val();
    const now = Date.now();
    
    Object.entries(quizzes).forEach(([id, quiz]) => {
      // Pokreni kviz ako je vrijeme
      if (quiz.status === 'scheduled' && quiz.startTime <= now) {
        startQuizAutomatically(id, quiz);
      }
    });
  });
}, 60000); // Svaku minutu

function startQuizAutomatically(quizId, quizData) {
  // 1. Update status
  database.ref(`scheduledQuizzes/${quizId}/status`).set('live');
  
  // 2. Load questions
  const questionPromises = quizData.questionIds.map(qid => 
    database.ref(`questionBank/${qid}`).once('value')
  );
  
  Promise.all(questionPromises).then(snaps => {
    const questions = snaps.map(s => s.val());
    
    // 3. Initialize game
    database.ref('gameState').set({
      quizId: quizId,
      phase: 'waiting',
      currentRound: 1,
      currentQuestion: 0,
      isActive: true,
      autoMode: true
    });
    
    database.ref('questions').set(questions);
    database.ref('settings').set(quizData.settings);
    
    // 4. Auto-start after 30s
    setTimeout(() => {
      database.ref('gameState/phase').set('answering');
    }, 30000);
  });
}
```

---

## 📱 DODATNE STRANICE (Za Implementaciju)

### **quizzes.html** - Lista Kvizova
- Grid sa svim kvizovima
- Filter: Tip, Status, Datum
- Kartice sa info (Naziv, Vrijeme, Nagrada, Broj igrača)
- Klik → Join kviz

### **results.html** - Tvoji Rezultati
- Timeline svih tvojih kvizova
- Statistika po tipu kviza
- Graf zarade kroz vrijeme
- Best performance highlight

### **rankings.html** - Globalna Rang Lista
- Overall ranking (svi igrači)
- Filter po tipu kviza
- Filter po vremenskom periodu
- Klik na igrača → Vidi profil

### **profile.html** - Moj Profil
- Edit sve podatke iz registracije
- Upload nova slika
- Privacy settings
- Delete account

### **rules.html** - Pravila
- Kako se igra
- Bodovanje (!, ., ?)
- Rang sistem
- FAQ

### **news.html** - Novosti
- Lista obavijesti
- Nadolazeći eventi
- Izmjene pravila
- Nove funkcionalnosti

### **donations.html** - Donacije
- PayPal/Stripe integracija
- Lista donatora
- Incentivi za doniranje

### **contact.html** - Kontakt
- Email forma
- Social media linkovi
- Discord/Telegram community

---

## 🚀 DEPLOYMENT PLAN

### **Faza 1: Core Functionality** ✅
- register.html ✅
- login.html ✅
- dashboard.html ✅
- admin-dashboard.html ✅

### **Faza 2: Player Features**
- quizzes.html
- results.html
- rankings.html
- profile.html

### **Faza 3: Content Pages**
- rules.html
- news.html
- donations.html
- contact.html

### **Faza 4: Automatizacija**
- Cron job za auto-start kvizova
- Email/WhatsApp notifikacije
- Auto ranking update

### **Faza 5: Advanced**
- Mobile app (React Native)
- Admin mobile kontrola
- Real-time chat tijekom kviza
- Live leaderboard display za publiku

---

## 🎯 PRIORITETI ZA IMPLEMENTACIJU

1. **Dashboard.html** → Upload i testiraj ✅
2. **Admin-Dashboard.html** → Upload i testiraj ✅
3. **Update login.html** → Redirect na dashboard umjesto player
4. **Kreiraj question bank** → Dodaj 50+ pitanja sa kategorijama
5. **Napravi quiz scheduler** → UI za zakazivanje
6. **Implementiraj quizzes.html** → Lista dostupnih kvizova
7. **Auto-start sistem** → Cloud Function ili server-side script

---

Imam 2 filea spremna:
- **dashboard.html** (Player Hub)
- **admin-dashboard.html** (Admin Super Panel)

Trebaš li ih uploadati i nastaviti sa ostalim stranicama?
