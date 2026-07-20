// Hofstadter Figure-Figure sequences
// R(n) and S(n) are complementary - together they cover all positive integers

const cache = {
  r: [null, 1],  // 1-indexed: r[1] = 1
  s: [null, 2],  // 1-indexed: s[1] = 2
  maxR: 1,
  maxS: 1
};

// Set to track which numbers are in R sequence for fast lookup
const rSet = new Set([1]);

function generateUpTo(n, sequence) {
  // Generate both sequences up to index n
  while (cache.maxR < n || (sequence === 's' && cache.maxS < n)) {
    // Generate next R if needed
    if (cache.maxR < n) {
      const nextR = cache.r[cache.maxR] + cache.s[cache.maxR];
      cache.r[++cache.maxR] = nextR;
      rSet.add(nextR);
    }
    
    // Generate next S if needed
    // S(n) is the smallest positive integer not yet in R or S
    if (cache.maxS < n) {
      let candidate = cache.s[cache.maxS] + 1;
      // Find the next number not in R and not already in S
      while (rSet.has(candidate) || candidate <= cache.s[cache.maxS]) {
        candidate++;
      }
      cache.s[++cache.maxS] = candidate;
    }
  }
}

function ffr(n) {
  if (n < 1) return undefined;
  if (cache.maxR < n) {
    generateUpTo(n, 'r');
  }
  return cache.r[n];
}

function ffs(n) {
  if (n < 1) return undefined;
  if (cache.maxS < n) {
    generateUpTo(n, 's');
  }
  return cache.s[n];
}

// Test cases
console.log("ffr(10) =", ffr(10));    // Expected: 69
console.log("ffr(50) =", ffr(50));    // Expected: 1509
console.log("ffr(100) =", ffr(100));  // Expected: 5764
console.log("ffr(1000) =", ffr(1000)); // Expected: 526334

console.log("ffs(10) =", ffs(10));    // Expected: 14
console.log("ffs(50) =", ffs(50));    // Expected: 59
console.log("ffs(100) =", ffs(100));  // Expected: 112
console.log("ffs(1000) =", ffs(1000)); // Expected: 1041
