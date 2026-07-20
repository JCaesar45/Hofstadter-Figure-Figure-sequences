import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Hofstadter Figure-Figure sequences — high-performance, thread-safe lazy evaluation.
 *
 * <p>R(1)=1, S(1)=2. R(n)=R(n-1)+S(n-1). S contains the positive integers not in R.
 * No upper bound on n. Memory grows linearly with the maximum n requested.
 *
 * <p>References:
 * <a href="https://rosettacode.org/wiki/Hofstadter_Figure-Figure_sequences">Rosetta Code</a>
 */
public final class HofstadterFigureFigure {

    /* ── Singleton instance for function-oriented access ── */
    private static final HofstadterFigureFigure INSTANCE = new HofstadterFigureFigure();

    /* ── Internal state ── */
    private final List<Long> r = new ArrayList<>(128);
    private final List<Long> s = new ArrayList<>(128);
    private final Set<Long> rSet = new HashSet<>(128);
    private int maxN = 0;

    /** Private constructor initialises base cases. */
    private HofstadterFigureFigure() {
        r.add(0L);   // 0-index placeholder
        r.add(1L);   // R(1) = 1
        s.add(0L);
        s.add(2L);   // S(1) = 2
        rSet.add(1L);
        maxN = 1;
    }

    /**
     * Public static accessor for R(n).
     *
     * @param n positive integer index (1‑based)
     * @return R(n)
     */
    public static long ffr(int n) {
        return INSTANCE.computeR(n);
    }

    /**
     * Public static accessor for S(n).
     *
     * @param n positive integer index (1‑based)
     * @return S(n)
     */
    public static long ffs(int n) {
        return INSTANCE.computeS(n);
    }

    /* ── Core logic ── */

    private synchronized void ensure(int n) {
        if (n <= maxN) return;

        for (int k = maxN + 1; k <= n; k++) {
            long prevR = r.get(k - 1);
            long prevS = s.get(k - 1);
            long newR = prevR + prevS;
            r.add(newR);
            rSet.add(newR);

            long candidate = s.get(s.size() - 1) + 1;
            while (rSet.contains(candidate)) {
                candidate++;
            }
            s.add(candidate);
        }
        maxN = n;
    }

    private long computeR(int n) {
        if (n < 1) throw new IllegalArgumentException("ffr index must be >= 1");
        ensure(n);
        return r.get(n);
    }

    private long computeS(int n) {
        if (n < 1) throw new IllegalArgumentException("ffs index must be >= 1");
        ensure(n);
        return s.get(n);
    }

    /* ── Demonstration main ── */
    public static void main(String[] args) {
        int[][] tests = {
            {10, 69, 14},
            {50, 1509, 59},
            {100, 5764, 112},
            {1000, 526334, 1041}
        };

        boolean allPass = true;
        for (int[] test : tests) {
            int n = test[0];
            long expectedR = test[1];
            long expectedS = test[2];
            long rVal = ffr(n);
            long sVal = ffs(n);
            boolean rOk = rVal == expectedR;
            boolean sOk = sVal == expectedS;
            if (!rOk || !sOk) allPass = false;
            System.out.printf("n=%5d  R=%8d (expected %8d) %s  S=%6d (expected %6d) %s%n",
                n, rVal, expectedR, rOk ? "✓" : "✗",
                sVal, expectedS, sOk ? "✓" : "✗");
        }

        // Stress test
        int big = 50_000;
        long start = System.nanoTime();
        long rBig = ffr(big);
        long sBig = ffs(big);
        long elapsed = (System.nanoTime() - start) / 1_000_000;
        System.out.printf("%nffr(%d) = %d  |  ffs(%d) = %d%n", big, rBig, big, sBig);
        System.out.printf("Computed in %d ms%n", elapsed);

        if (!allPass) System.exit(1);
    }
}
