# 📊 LUKAVAC KVIZ - KOMPLETNA CSV ANALIZA

## ✅ SVE 4 NOVE FUNKCIONALNOSTI IMPLEMENTIRANE!

---

## 📋 SADRŽAJ CSV IZVJEŠTAJA

### 1. OSNOVNE INFORMACIJE
### 2. KONAČNI POREDAK
### 3. DETALJAN PRIKAZ PO PITANJIMA
### 4. **NOVA** - STATISTIKA PO KRUGOVIMA
### 5. **NOVA** - PROMJENE ODGOVORA (Lukavac Faza)
### 6. **NOVA** - POVIJEST PORETKA
### 7. **NOVA** - ANALIZA PITANJA (Težina)

---

## 4️⃣ STATISTIKA PO KRUGOVIMA

**Za svakog igrača, za svaki krug:**

```csv
Krug,Ime Igrača,Bodovi Ovaj Krug,Kumulativni Bodovi,! Korišteno,. Korišteno,? Korišteno,Točnih,Netočnih,Avg Vrijeme/Pitanje
1,"Marko Marković",+50,50,5,3,2,8,2,12s
2,"Marko Marković",+70,120,6,2,2,9,1,11s
3,"Marko Marković",+90,210,7,1,2,9,1,10s
1,"Ana Horvat",+40,40,3,5,2,7,3,15s
2,"Ana Horvat",+60,100,4,4,2,8,2,13s
```

### Stupci:

| Stupac | Opis | Primjer |
|--------|------|---------|
| **Krug** | Broj kruga | 1, 2, 3... |
| **Ime Igrača** | Ime | Marko Marković |
| **Bodovi Ovaj Krug** | Koliko zaradio/izgubio u ovom krugu | +50, -10 |
| **Kumulativni Bodovi** | Ukupno do kraja ovog kruga | 120 |
| **! Korišteno** | Koliko puta koristio ! u ovom krugu | 5 |
| **. Korišteno** | Koliko puta koristio . u ovom krugu | 3 |
| **? Korišteno** | Koliko puta koristio ? u ovom krugu | 2 |
| **Točnih** | Broj točnih odgovora u ovom krugu | 8 |
| **Netočnih** | Broj netočnih odgovora u ovom krugu | 2 |
| **Avg Vrijeme/Pitanje** | Prosječno vrijeme po pitanju | 12s |

### 📊 Analiza:

**Excel Pivot Table:**
```
Igrač    | Krug 1 | Krug 2 | Krug 3 | Total
---------|--------|--------|--------|-------
Marko    |   +50  |   +70  |   +90  |  210
Ana      |   +40  |   +60  |   +50  |  150
```

**Graf - Kumulativni Bodovi:**
```
250 |                        ●Marko
200 |                   ●    
150 |              ●    ●Ana
100 |         ●    
 50 |    ●    
  0 |________________________
    R1   R2   R3   R4   R5
```

**Formula - Prosječna Uspješnost:**
```excel
=AVERAGE(H2:H7)  // Prosječno točnih po krugu
```

---

## 5️⃣ PROMJENE ODGOVORA (LUKAVAC FAZA)

**Prati SVE promjene koje su igrači napravili u Lukavac fazi:**

```csv
Krug,Pitanje #,Ime Igrača,Početni Odgovor (Faza 1),Konačni Odgovor (Faza 2),Promjena Tipa,Rezultat
1,3,"Marko Marković","? Lukavac","! Zagreb","? → !","Točno ✓"
1,5,"Ana Horvat","? Lukavac",". Split","? → .","Netočno ✗"
2,1,"Petar Novak","! Paris","? Berlin","! → ?","Točno ✓"
2,7,"Marko Marković","? Lukavac",". London","? → .","Točno ✓"
```

### Stupci:

| Stupac | Opis | Primjer |
|--------|------|---------|
| **Krug** | Broj kruga | 1, 2, 3 |
| **Pitanje #** | Broj pitanja u krugu | 3, 5 |
| **Ime Igrača** | Tko je mijenjao odgovor | Marko Marković |
| **Početni Odgovor** | Što je kliknuo u Fazi 1 | ? Lukavac, ! Zagreb |
| **Konačni Odgovor** | Što je kliknuo u Fazi 2 | ! Zagreb, . Split |
| **Promjena Tipa** | Kako se tip promijenio | ? → !, ! → ., Isti tip |
| **Rezultat** | Je li bio točan na kraju | Točno ✓, Netočno ✗ |

### 📊 Analiza:

**Najčešće Promjene:**
```sql
SELECT "Promjena Tipa", COUNT(*) 
FROM Changes 
GROUP BY "Promjena Tipa"
ORDER BY COUNT(*) DESC
```

**Rezultat:**
```
? → !  (15)  ← Najviše
? → .  (12)
! → ?  (8)
Isti tip (3)
```

**Uspješnost Strategije:**
```
? → ! : 85% točnih  ← Najbolja strategija!
? → . : 60% točnih
! → ? : 40% točnih
```

**Graf - Koliko Puta Mijenjao:**
```
Marko:  ████████ (8 promjena)
Ana:    █████ (5 promjena)
Petar:  ███ (3 promjene)
```

---

## 6️⃣ POVIJEST PORETKA PO KRUGOVIMA

**Prati kako se rang mijenjao kroz igru:**

```csv
Krug,Ime Igrača,Rang,Bodovi,Promjena Ranga
1,"Marko Marković",1,50,Start
1,"Ana Horvat",2,40,Start
1,"Petar Novak",3,30,Start
2,"Marko Marković",1,120,=
2,"Petar Novak",2,100,↑ +1
2,"Ana Horvat",3,100,↓ -1
3,"Ana Horvat",1,210,↑ +2
3,"Marko Marković",2,200,↓ -1
3,"Petar Novak",3,180,↓ -1
```

### Stupci:

| Stupac | Opis | Primjer |
|--------|------|---------|
| **Krug** | Broj kruga | 1, 2, 3 |
| **Ime Igrača** | Ime | Marko Marković |
| **Rang** | Pozicija na kraju kruga | 1, 2, 3 |
| **Bodovi** | Kumulativni bodovi | 120 |
| **Promjena Ranga** | Kako se rang promijenio | ↑ +2, ↓ -1, = |

### 📊 Analiza:

**Vizualizacija - Rank Over Time:**
```
Rang
  1 |●━━●━━━━━━━━━━━━━○  Ana wins!
  2 |  ━━━━━━━━━━━━━●━●  Marko 2nd
  3 |    ━━━━━━○━━━━━━  Petar 3rd
    |________________________
      R1   R2   R3   R4   R5
```

**Volatility Score:**
```excel
=STDEV(B2:B7)  // Koliko često mijenja poziciju
```

**Most Consistent Player:**
```
Marko:  ± 0.5  ← Najstabilniji
Ana:    ± 1.2
Petar:  ± 0.8
```

**Comeback King:**
```
Ana:  Start #2 → End #1  (+1)  ← Najveći comeback!
```

**Excel Conditional Formatting:**
- ↑ pozicije = Zeleno
- ↓ pozicije = Crveno
- = pozicija = Žuto

---

## 7️⃣ ANALIZA PITANJA (TEŽINA)

**Rangira pitanja po težini:**

```csv
Krug,Pitanje #,Tekst Pitanja,Točan Odgovor,Ukupno Odgovora,Točnih,Netočnih,% Točnosti,Prosječni Bodovi,Težina
1,1,"Glavni grad Hrvatske?","A. Zagreb",8,8,0,100%,+10,Lako ★
1,2,"Koliko kontinenata?","C. 7",8,6,2,75%,+6,Lako ★
1,3,"Prvo na Mjesec?","B. Armstrong",8,3,5,38%,-2,Vrlo teško ★★★★
2,1,"Tko je Picasso?","D. Slikar",8,7,1,88%,+8,Lako ★
2,5,"Gustoća vode?","A. 1g/cm³",8,2,6,25%,-5,Vrlo teško ★★★★
```

### Stupci:

| Stupac | Opis | Primjer |
|--------|------|---------|
| **Krug** | Broj kruga | 1, 2 |
| **Pitanje #** | Broj pitanja | 1, 2, 3 |
| **Tekst Pitanja** | Pitanje | "Glavni grad...?" |
| **Točan Odgovor** | Točan odgovor | A. Zagreb |
| **Ukupno Odgovora** | Koliko je odgovorilo | 8 |
| **Točnih** | Koliko točno | 6 |
| **Netočnih** | Koliko netočno | 2 |
| **% Točnosti** | Postotak točnih | 75% |
| **Prosječni Bodovi** | Prosječno zaradjeno | +6, -2 |
| **Težina** | Rating | Lako ★ do Vrlo teško ★★★★ |

### Težina Rating:

| % Točnosti | Težina |
|------------|--------|
| 80% - 100% | Lako ★ |
| 60% - 79%  | Srednje ★★ |
| 40% - 59%  | Teško ★★★ |
| 0% - 39%   | Vrlo teško ★★★★ |

### 📊 Analiza:

**Top 5 Najlakših Pitanja:**
```
1. "Glavni grad Hrvatske?" (100%)
2. "Tko je Picasso?" (88%)
3. "Koliko kontinenata?" (75%)
```

**Top 5 Najte žih Pitanja:**
```
1. "Gustoća vode?" (25%)  ★★★★
2. "Prvo na Mjesec?" (38%) ★★★★
3. "Kvantna fizika?" (42%) ★★★
```

**Graf - Distribucija Težine:**
```
Lako ★      ████████ (8)
Srednje ★★  █████ (5)
Teško ★★★   ███ (3)
Vrlo teško ★★★★ ██ (2)
```

**Correlation: Težina vs Bodovi:**
```
Lako pitanje   → +8 avg bodova
Teško pitanje  → -3 avg bodova
```

**Filter - Samo Teška Pitanja:**
```excel
=FILTER(A:J, I:I<40)  // % < 40%
```

---

## 📈 GRAFIKONI ZA EXCEL

### 1. Line Chart - Kumulativni Bodovi

**Data:**
```
       | Krug 1 | Krug 2 | Krug 3
-------|--------|--------|-------
Marko  |   50   |  120   |  210
Ana    |   40   |  100   |  210
Petar  |   30   |   90   |  180
```

**Insert → Line Chart → 3 linije**

---

### 2. Stacked Bar - Korištenje Tipova

**Data:**
```
       | ! | . | ?
-------|---|---|---
Marko  | 12| 8 | 5
Ana    | 10| 9 | 3
Petar  | 8 | 10| 4
```

**Insert → Stacked Bar Chart**

---

### 3. Pie Chart - Težina Pitanja

**Data:**
```
Lako:       8
Srednje:    5
Teško:      3
Vrlo teško: 2
```

**Insert → Pie Chart**

---

### 4. Scatter Plot - Točnost vs Vrijeme

**Data:**
```
Točnost (%) | Vrijeme (s)
------------|------------
100         | 8
75          | 12
50          | 15
25          | 10
```

**Insert → Scatter Plot**

---

## 🔍 NAPREDNE EXCEL FORMULE

### Pivot Table - Najbolji Igrač po Krugu

```
Row: Krug
Column: Ime Igrača
Values: MAX(Bodovi)
```

### Conditional Formatting - Heat Map

**Odaberi range bodova:**
```
Home → Conditional Formatting → Color Scales
  Zeleno (max) → Crveno (min)
```

### VLOOKUP - Pronađi Igrača

```excel
=VLOOKUP("Marko", A:J, 4, FALSE)
```

### SUMIF - Ukupno Bodova po Tipu

```excel
=SUMIF(TipStupac, "!", BodoviStupac)
```

### COUNTIF - Koliko Promjena

```excel
=COUNTIF(PromjenaStupac, "? → !")
```

---

## 📊 GOOGLE SHEETS IMPORT

### Auto-Split u Sheete:

1. **Sheet 1:** Osnovne info + Poredak
2. **Sheet 2:** Detaljan prikaz pitanja
3. **Sheet 3:** Statistika po krugovima
4. **Sheet 4:** Promjene odgovora
5. **Sheet 5:** Povijest poretka
6. **Sheet 6:** Analiza pitanja

### Script za Auto-Split:

```javascript
function splitCSV() {
  var file = DriveApp.getFilesByName('Lukavac.csv').next();
  var csvData = file.getBlob().getDataAsString();
  var sections = csvData.split('\n\n');
  
  sections.forEach((section, i) => {
    var sheet = SpreadsheetApp.create(`Sheet${i+1}`);
    var rows = section.split('\n').map(r => r.split(','));
    sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
  });
}
```

---

## 💡 CASE STUDY - Real Analiza

### Pitanje: "Tko je najbolji igrač?"

**Pristup 1: Po Bodovima**
```
Marko: 450€ ← Winner!
```

**Pristup 2: Po Konzistentnosti**
```
Ana: 88% točnih odgovora ← Most accurate!
```

**Pristup 3: Po Strategiji**
```
Petar: 90% uspješnih ? promjena ← Best strategist!
```

**Pristup 4: Po Brzini**
```
Marko: 10s avg ← Fastest!
```

### Zaključak:
CSV omogućava **multi-dimensional analizu** - nema jednog "najboljeg", već više dimenzija uspjeha!

---

## 🎯 EXPORT WORKFLOW

### Puni Workflow:

1. **Admin:** Klikni "📥 Export CSV"
2. **Wait:** 3-5 sekundi (učitava podatke)
3. **Download:** `Lukavac_KVIZ_2026-01-24.csv`
4. **Excel:** Open → Data → From Text/CSV → UTF-8
5. **Split:** Kopiraj sekcije u različite tabove
6. **Grafikoni:** Insert → Charts
7. **Analiza:** Pivot Tables, Formule
8. **Share:** Export PDF ili Google Sheets

---

## ⚠️ NAPOMENA

**Answer History se prati od implementacije!**

Za kompletnu analizu sa svim sekcijama:
1. Reset igru
2. Pokreni novi kviz
3. Export će imati SVE podatke

Stari kvizovi će imati samo osnovne sekcije (1-3).

---

Sve 4 nove funkcionalnosti su LIVE! 🦊📊✨
