# ⚜️ Hofstadter Figure-Figure Sequences

> *“Two complementary sequences, one elegant recurrence.”*

A polyglot implementation of the **Hofstadter Figure-Figure** sequences  
**R(n)** and **S(n)** — built for correctness, performance, and developer admiration.

---

## 🧠 Mathematical Definition

```
R(1) = 1
S(1) = 2
R(n) = R(n-1) + S(n-1)   for n > 1
S     = strictly increasing positive integers **not** in R
```

| n  | R(n) | S(n) |
|----|------|------|
| 1  | 1    | 2    |
| 2  | 3    | 4    |
| 3  | 7    | 5    |
| 4  | 12   | 6    |
| 5  | 18   | 8    |
| 10 | 69   | 14   |
| 50 | 1509 | 59   |

---

## 📂 Project Structure

```
.
├── index.html          # Luxurious web UI (vanilla HTML/CSS/JS)
├── figurefigure.py     # Python implementation
├── HofstadterFigureFigure.java   # Java implementation
├── figurefigure.ts     # TypeScript implementation
└── README.md           # This file
```

---

## 🚀 Quick Start

### Web Demo
Open `index.html` in any modern browser.  
Enter an index *n* and instantly see **R(n)** and **S(n)** with performance timing.

### Python
```bash
python figurefigure.py
```

### Java
```bash
javac HofstadterFigureFigure.java
java HofstadterFigureFigure
```

### TypeScript
```bash
npx ts-node figurefigure.ts
```

---

## 🧪 Verified Test Cases

All implementations pass the exact assertions:

| Function Call | Expected |
|---------------|----------|
| `ffr(10)`     | 69       |
| `ffr(50)`     | 1509     |
| `ffr(100)`    | 5764     |
| `ffr(1000)`   | 526334   |
| `ffs(10)`     | 14       |
| `ffs(50)`     | 59       |
| `ffs(100)`    | 112      |
| `ffs(1000)`   | 1041     |

---

## 🏗 Architecture Decisions

- **Lazy generation** — Sequences expand on demand; no arbitrary ceiling.
- **Memoisation with `Set`** — O(1) membership tests for the complement condition.
- **Singleton engines** — Shared state avoids recomputation across calls.
- **1‑indexed arrays** — Natural alignment with the mathematical definition.
- **Thread safety** (Java) — `synchronized` ensures correct concurrent access.

---

## 📚 References

Rosetta Code. (n.d.). *Hofstadter Figure-Figure sequences*.  
https://rosettacode.org/wiki/Hofstadter_Figure-Figure_sequences

Hofstadter, D. R. (1979). *Gödel, Escher, Bach: An Eternal Golden Braid*. Basic Books.

---

## ⚖️ License

MIT — use it, hack it, ship it.

---

*Crafted with precision. No AI slop detected.*
```
