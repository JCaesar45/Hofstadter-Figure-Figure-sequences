#!/usr/bin/env python3
"""
Hofstadter Figure-Figure Sequences — R(n) and S(n)
Production-grade implementation with lazy evaluation and unbounded index support.
"""

from typing import List, Set
import sys
import time


class FigureFigure:
    """
    Lazy-evaluated, cached complementary sequences.
    R(1)=1, S(1)=2. R(n) = R(n-1) + S(n-1). S contains positive ints not in R.
    """

    __slots__ = ('_r', '_s', '_r_set', '_max_n')

    def __init__(self) -> None:
        self._r: List[int] = [0, 1]      # 1-indexed
        self._s: List[int] = [0, 2]
        self._r_set: Set[int] = {1}
        self._max_n: int = 1

    def _ensure(self, n: int) -> None:
        """Expand internal caches up to index n."""
        if n <= self._max_n:
            return

        r = self._r
        s = self._s
        r_set = self._r_set

        for k in range(self._max_n + 1, n + 1):
            new_r = r[k - 1] + s[k - 1]
            r.append(new_r)
            r_set.add(new_r)

            candidate = s[-1] + 1
            while candidate in r_set:
                candidate += 1
            s.append(candidate)

        self._max_n = n

    def ffr(self, n: int) -> int:
        """Return R(n) for n >= 1."""
        if not isinstance(n, int) or n < 1:
            raise ValueError("ffr requires positive integer index")
        self._ensure(n)
        return self._r[n]

    def ffs(self, n: int) -> int:
        """Return S(n) for n >= 1."""
        if not isinstance(n, int) or n < 1:
            raise ValueError("ffs requires positive integer index")
        self._ensure(n)
        return self._s[n]


# Module-level singleton for function-based API
_engine = FigureFigure()


def ffr(n: int) -> int:
    """Public function returning R(n)."""
    return _engine.ffr(n)


def ffs(n: int) -> int:
    """Public function returning S(n)."""
    return _engine.ffs(n)


# ── CLI demo & validation ──────────────────────────────────────────
if __name__ == "__main__":
    test_cases = [
        (10, 69, 14),
        (50, 1509, 59),
        (100, 5764, 112),
        (1000, 526334, 1041),
    ]

    all_passed = True
    for n, expected_r, expected_s in test_cases:
        r_val = ffr(n)
        s_val = ffs(n)
        r_ok = r_val == expected_r
        s_ok = s_val == expected_s
        if not (r_ok and s_ok):
            all_passed = False
        print(f"n={n:>5}  R={r_val:>8} (expected {expected_r:>8}) {'✓' if r_ok else '✗'}  "
              f"S={s_val:>6} (expected {expected_s:>6}) {'✓' if s_ok else '✗'}")

    # Performance stress test
    big_n = 50_000
    start = time.perf_counter()
    r_big = ffr(big_n)
    s_big = ffs(big_n)
    elapsed = (time.perf_counter() - start) * 1000
    print(f"\nffr({big_n}) = {r_big}  |  ffs({big_n}) = {s_big}")
    print(f"Computed in {elapsed:.2f} ms")

    sys.exit(0 if all_passed else 1)
