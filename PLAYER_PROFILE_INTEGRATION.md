# 🦊 Lukavac Kviz - Player Profile System

## 📋 Pregled Sistema

Ovaj sistem dodaje **trajne igrače profile** u Lukavac kviz sa:
- ✅ Registracija s detaljnim podacima
- ✅ Login sa email/nadimak + quiz password
- ✅ Privacy settings (javno/privatno po polju)
- ✅ Profil display u leaderboardu
- ✅ Notifikacije (Email/WhatsApp/In-App)
- ✅ Globalna rang lista
- ✅ Statistika kroz sve kvizove

---

## 🗂️ Firebase Struktura

### `/playerProfiles/{profileId}`
```json
{
  "firstName": "Marko",
  "lastName": "Marković",
  "nickname": "Lukavac2024",
  "email": "marko@example.com",
  "phone": "+385911234567",
  "location": "Zagreb, Hrvatska",
  "birthDate": "1990-05-15",
  "occupation": "Programer",
  
  "strongAreas": "Sport, Geografija, Film",
  "weakAreas": "Muzika, Likovna umjetnost",
  "tvQuizExperience": "Potjera 2022, Tko želi biti milijunaš 2023",
  "pubQuizExperience": "Kviz Plebs Zagreb - redoviti igrač",
  "quizEarnings": 5000,
  "wins": 12,
  "team": "Kviz Udruga Zagreb",
  "rankingGoal": "top50",
  
  "notifications": {
    "email": true,
    "whatsApp": true,
    "inApp": true
  },
  
  "privacy": {
    "firstName": true,
    "lastName": false,
    "nickname": true,
    "email": false,
    "phone": false,
    "location": true,
    "birthDate": false,
    "occupation": false,
    "strongAreas": true,
    "weakAreas": false,
    "tvQuizExperience": true,
    "pubQuizExperience": true,
    "quizEarnings": false,
    "wins": true,
    "team": true,
    "rankingGoal": true
  },
  
  "stats": {
    "totalGames": 45,
    "totalEarnings": 12500,
    "averageRating": 8.5,
    "bestRank": 1,
    "currentRank": 5
  },
  
  "createdAt": 1706374800000,
  "updatedAt": 1706374800000,
  "playerId": "-Abc123XyZ"
}
```

### `/players/{playerId}` (Trenutna igra)
```json
{
  "name": "Lukavac2024",
  "score": 250,
  "profileId": "-Abc123XyZ",  // Link to playerProfiles
  "rating": 9,
  // ... ostalo kao prije
}
```

---

## 🔗 Integracija u Postojeći Sistem

### 1. Modificiraj `player.html`

**Zamijeni login screen:**

```html
<!-- PRIJE: -->
<div id="loginScreen">
  <input id="passwordInput">
  <input id="playerName">
  <button onclick="joinGame()">Pridruži se</button>
</div>

<!-- SAD: -->
<div id="loginScreen">
  <h2>Imaš profil?</h2>
  <button onclick="window.location.href='login.html'">
    Login
  </button>
  
  <h2>Nemaš profil?</h2>
  <button onclick="window.location.href='register.html'">
    Registriraj se
  </button>
  
  <!-- Ili Quick Join (bez profila) -->
  <details>
    <summary>Quick Join (bez profila)</summary>
    <input id="passwordInput">
    <input id="playerName">
    <button onclick="joinGameGuest()">Gost</button>
  </details>
</div>
```

### 2. Učitaj profil u `player.html`

```javascript
// Na početku player.html
let playerProfile = null;

window.onload = function() {
    const profileId = sessionStorage.getItem('playerProfileId');
    if (profileId) {
        const profile = JSON.parse(sessionStorage.getItem('playerProfile'));
        playerProfile = profile;
        
        // Auto-join sa profilom
        joinGameWithProfile(profileId, profile);
    } else {
        // Redirektiraj na login
        window.location.href = 'login.html';
    }
};

function joinGameWithProfile(profileId, profile) {
    const displayName = profile.nickname || profile.firstName;
    
    database.ref(`players/${profileId}`).set({
        name: displayName,
        score: 0,
        profileId: profileId,
        // ... ostalo
    }).then(() => {
        playerId = profileId;
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('gameScreen').classList.remove('hidden');
    });
}
```

### 3. Prikaz Profila u Leaderboardu

**Dodaj u `updateLeaderboard()` funkciju:**

```javascript
function updateLeaderboard() {
    // ... existing code ...
    
    sorted.forEach((player, idx) => {
        const hasProfile = player.profileId ? true : false;
        const profileIcon = hasProfile ? '👤' : '';
        
        html += `
            <div class="player-row">
                ${idx + 1}. ${player.name} ${profileIcon}
                ${hasProfile ? `<button onclick="showProfile('${player.profileId}')">📋</button>` : ''}
                ${player.score}€
            </div>
        `;
    });
}

function showProfile(profileId) {
    database.ref(`playerProfiles/${profileId}`).once('value').then(snap => {
        const profile = snap.val();
        displayProfileModal(profile);
    });
}

function displayProfileModal(profile) {
    // Show modal with profile info (respecting privacy settings)
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    let html = '<h2>' + (profile.privacy.firstName ? profile.firstName : 'Anonimni Igrač') + '</h2>';
    
    if (profile.privacy.location) {
        html += '<p>📍 ' + profile.location + '</p>';
    }
    
    if (profile.privacy.strongAreas) {
        html += '<p>💪 ' + profile.strongAreas + '</p>';
    }
    
    html += '<p>🏆 Wins: ' + (profile.privacy.wins ? profile.wins : 'Privatno') + '</p>';
    html += '<p>📊 Avg Rating: ' + profile.stats.averageRating + '/10</p>';
    
    modal.innerHTML = html;
    document.body.appendChild(modal);
}
```

---

## 📊 Globalna Rang Lista

Kreiraj novu stranicu `rankings.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Globalna Rang Lista</title>
</head>
<body>
    <h1>🏆 Svi Igrači</h1>
    <div id="rankings"></div>
    
    <script>
        database.ref('playerProfiles').on('value', snap => {
            const profiles = snap.val();
            const sorted = Object.entries(profiles)
                .map(([id, p]) => ({id, ...p}))
                .sort((a, b) => (b.stats?.totalEarnings || 0) - (a.stats?.totalEarnings || 0));
            
            let html = '';
            sorted.forEach((player, idx) => {
                const name = player.privacy.firstName ? player.firstName : 'Anonimni';
                html += `
                    <div>
                        ${idx + 1}. ${name}
                        ${player.stats?.totalEarnings || 0}€
                        ${player.stats?.averageRating || 0}/10
                    </div>
                `;
            });
            
            document.getElementById('rankings').innerHTML = html;
        });
    </script>
</body>
</html>
```

---

## 📧 Notifikacije (Email/WhatsApp)

### Email Notifikacije

Koristi **Firebase Cloud Functions** + **SendGrid/Mailgun**:

```javascript
// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendQuizInvite = functions.https.onCall(async (data, context) => {
    const { quizDate, quizName } = data;
    
    // Get all players with email notifications enabled
    const snapshot = await admin.database().ref('playerProfiles').once('value');
    const profiles = snapshot.val();
    
    for (let id in profiles) {
        const profile = profiles[id];
        if (profile.notifications?.email && profile.email) {
            const msg = {
                to: profile.email,
                from: 'lukavac@quizplatform.com',
                subject: `🦊 Novi Lukavac Kviz: ${quizName}`,
                html: `
                    <h1>Poziv na Kviz!</h1>
                    <p>Pozdrav ${profile.firstName}!</p>
                    <p>Pozivamo te na ${quizName}</p>
                    <p>Datum: ${quizDate}</p>
                    <a href="https://tvoj-link.com/login.html">Prijavi se</a>
                `
            };
            
            await sgMail.send(msg);
        }
    }
});
```

### WhatsApp Notifikacije

Koristi **Twilio WhatsApp API**:

```javascript
const twilio = require('twilio');
const client = twilio(accountSid, authToken);

exports.sendWhatsAppNotification = functions.https.onCall(async (data) => {
    const { message } = data;
    
    const snapshot = await admin.database().ref('playerProfiles').once('value');
    const profiles = snapshot.val();
    
    for (let id in profiles) {
        const profile = profiles[id];
        if (profile.notifications?.whatsApp && profile.phone) {
            await client.messages.create({
                from: 'whatsapp:+14155238886',  // Twilio sandbox
                to: `whatsapp:${profile.phone}`,
                body: `🦊 Lukavac Kviz: ${message}`
            });
        }
    }
});
```

---

## 🎯 Update Statistike Nakon Igre

U `admin.html`, dodaj u `nextRound()` ili `endGame()`:

```javascript
function updatePlayerStats() {
    database.ref('players').once('value').then(snap => {
        const players = snap.val();
        
        Object.entries(players).forEach(([id, player]) => {
            if (player.profileId) {
                // Update profile stats
                database.ref(`playerProfiles/${player.profileId}/stats`).transaction(stats => {
                    if (!stats) stats = {};
                    
                    stats.totalGames = (stats.totalGames || 0) + 1;
                    stats.totalEarnings = (stats.totalEarnings || 0) + (player.score || 0);
                    stats.averageRating = (stats.averageRating || 0) * 0.9 + (player.rating || 0) * 0.1;
                    
                    return stats;
                });
                
                // Update rank
                const rank = getSortedPlayers().findIndex(p => p.id === id) + 1;
                database.ref(`playerProfiles/${player.profileId}/stats/currentRank`).set(rank);
            }
        });
    });
}
```

---

## 🚀 Deployment

1. **Upload files:**
   - `register.html`
   - `login.html`
   - `rankings.html` (optional)

2. **Update Firebase Rules:**

```json
{
  "rules": {
    "playerProfiles": {
      ".read": true,
      "$profileId": {
        ".write": "auth != null || !data.exists()"
      }
    },
    "players": {
      ".read": true,
      ".write": true
    }
  }
}
```

3. **Test flow:**
   - Register → Login → Join Quiz → Play → Check Stats

---

## 📱 Mobile App Ready

Svi API-evi su spremni za mobile app:
- Firebase Realtime Database
- Push notifications setup
- Profile photos (dodaj Firebase Storage)

---

Готово! Kompletan player profile system! 🦊✅
