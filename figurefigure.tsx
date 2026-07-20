/**
 * Hofstadter Figure-Figure Sequences — TypeScript implementation.
 *
 * R(1)=1, S(1)=2.  R(n) = R(n-1) + S(n-1).
 * S is the strictly increasing sequence of positive integers not in R.
 * No maximum n; lazy generation with internal caching.
 */

class FigureFigureEngine {
  private readonly r: number[] = [0, 1];   // 1‑indexed
  private readonly s: number[] = [0, 2];
  private readonly rSet: Set<number> = new Set([1]);
  private maxN = 1;

  /** Ensure sequences are computed up to index n. */
  private ensure(n: number): void {
    if (n <= this.maxN) return;

    for (let k = this.maxN + 1; k <= n; k++) {
      const newR = this.r[k - 1] + this.s[k - 1];
      this.r.push(newR);
      this.rSet.add(newR);

      let candidate = this.s[this.s.length - 1] + 1;
      while (this.rSet.has(candidate)) {
        candidate++;
      }
      this.s.push(candidate);
    }
    this.maxN = n;
  }

  /** Return R(n) for n >= 1. */
  public ffr(n: number): number {
    if (!Number.isInteger(n) || n < 1) {
      throw new Error('ffr requires a positive integer index');
    }
    this.ensure(n);
    return this.r[n];
  }

  /** Return S(n) for n >= 1. */
  public ffs(n: number): number {
    if (!Number.isInteger(n) || n < 1) {
      throw new Error('ffs requires a positive integer index');
    }
    this.ensure(n);
    return this.s[n];
  }
}

// Global singleton — matches the function‑based API required by tests.
const engine = new FigureFigureEngine();

export function ffr(n: number): number {
  return engine.ffr(n);
}

export function ffs(n: number): number {
  return engine.ffs(n);
}

// ── Quick validation when run directly (e.g. ts‑node) ──
if (require.main === module) {
  const tests: [number, number, number][] = [
    [10, 69, 14],
    [50, 1509, 59],
    [100, 5764, 112],
    [1000, 526334, 1041],
  ];

  let allPass = true;
  for (const [n, expR, expS] of tests) {
    const rVal = ffr(n);
    const sVal = ffs(n);
    const rOk = rVal === expR;
    const sOk = sVal === expS;
    if (!rOk || !sOk) allPass = false;
    console.log(
      `n=${String(n).padStart(5)}  R=${String(rVal).padStart(8)} (expected ${String(expR).padStart(8)}) ${rOk ? '✓' : '✗'}  ` +
      `S=${String(sVal).padStart(6)} (expected ${String(expS).padStart(6)}) ${sOk ? '✓' : '✗'}`
    );
  }

  const big = 50_000;
  const start = performance.now();
  const rBig = ffr(big);
  const sBig = ffs(big);
  const elapsed = (performance.now() - start).toFixed(2);
  console.log(`\nffr(${big}) = ${rBig}  |  ffs(${big}) = ${sBig}`);
  console.log(`Computed in ${elapsed} ms`);

  process.exit(allPass ? 0 : 1);
}
