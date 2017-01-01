const bigInt = require('big-integer');
const getRandomInt = require('./getRandomInt');
// ref: http://www.geeksforgeeks.org/primality-test-set-3-miller-rabin/
// ref: https://inventwithpython.com/rabinMiller.py

const rabinMillerTest = (num, s, t) => {
  // const a = random between 2 and num - 2;
  return getRandomInt(2, num.subtract(2))
    .then((a) => {
      const x = a.modPow(s, num);

      if (!x.equals(1)) {
        let i = 0;
        while (!x.equals(num.subtract(1))) {
          if (i === (t - 1)) {
            return false;
          }

          x = x.modPow(2, num);
          i += 1;
        }
      }

      return true;
    })
};

// ref: http://stackoverflow.com/a/6330138/7347047
const isPrime = (num, k = 40) => {
  bigNum = bigInt(num);

  // All positive numbers < 3 are not prime
  if (bigNum.compare(3) === -1) {
    return false
  }

  // Even numbers are not prime
  if (bigNum.mod(2).equals(0)) {
    return false;
  }

  // Find an odd number d such that n-1 can be written as d*(2^r)
  let s = bigNum.subtract(1);
  let t = 0;

  while (s.mod(2).equals(0)) {
    s = s.divide(2);
    t += 1;
  }

  for (let i = 0; i < k; i += 1) {
    if (!rabinMillerTest(bigNum, s, t)) {
      return false;
    }
  }

  return true;
};

// Tests TODO: extract these into a test suite
const isEqualTo = (a, b, key) => {
  if (a !== b) {
    console.error(`${key}: ${a} not equal to ${b}`);
  };
};

for (let i = 0; i < 100; i += 1) {
  isEqualTo(isPrime(i), true, i);
}

module.exports = isPrime;
