# LUKAVAC — Update za auto-mode kvizove

## Šta je u ovom paketu

### 🆕 NOVI FAJLOVI (kopiraj u root tvog projekta):
- `firebase-helper.js`  → router za Firebase paths (studio vs online)
- `lobby.html`           → čekaonica za auto-mode kvizove
- `auto-runner.html`     → tab koji automatski pokreće zakazane kvizove

### ✏️ IZMIJENJENI FAJLOVI (zamijeni postojeće):
- `admin.html`        → dodan auto-routing + autopilot mode
- `player.html`       → dodan auto-routing (radi i u studio i online modu)
- `display.html`      → dodan auto-routing
- `super-admin.html`  → MODE select (auto/studio), lobby linkovi
- `quizzes.html`      → auto-mode kvizovi vode u lobby

## Kako instalirati

1. **Backup tvoj postojeći repo** (`git branch backup-prije-update` ili kopiraj folder)
2. Iskopiraj sve fajlove iz ovog ZIP-a u root tvog Lukavac projekta (prepiše stare)
3. Push na GitHub:
   ```
   git add .
   git commit -m "Add auto-mode online kvizovi (paralelni)"
   git push
   ```

## Kako koristiti

### Za STUDIO (uživo, kao do sada):
- Otvoriš `admin.html` → radi tačno isto kao prije
- Igrači idu na `player.html` (bez parametra)

### Za AUTO online kvizove:
1. U `super-admin.html` kreiraš kviz → izaberi **Mode: 🤖 AUTO**
2. Otvoriš `auto-runner.html` u zasebnom tabu (i ostaviš ga otvoren!)
3. Kopiraš lobby link iz super-admina → dijeliš igračima
4. Igrači klikni link → uđu u lobby → čekaju početak
5. U zakazano vrijeme auto-runner sve pokreće sam

### Više kvizova istovremeno:
Auto-runner pokreće svaki kviz u svom Firebase namespace-u
(`liveQuizzes/{quizId}/...`), tako da se ne miješaju.
Možeš imati 5 online kvizova + studio kviz u istom trenutku.

## Caveats

- Auto-runner tab MORA ostati otvoren (kasnije možeš migrirati na Firebase Cloud Function)
- Stari kvizovi bez `mode` polja se tretiraju kao `auto`

---
Generirano: 2026-04-28
