const bigInt = require('big-integer');
const getRandomInt = require('./getRandomInt');
// ref: http://www.geeksforgeeks.org/primality-test-set-3-miller-rabin/
// ref: https://inventwithpython.com/rabinMiller.py

const rabinMillerTest = (num, s, t, cb) => (
  getRandomInt(2, num.subtract(2))
    .then((a) => {
      let x = a.modPow(s, num);

      if (!x.equals(1)) {
        let i = 0;
        while (!x.equals(num.subtract(1))) {
          if (i === (t - 1)) {
            cb(false);
          }

          x = x.modPow(2, num);
          i += 1;
        }
      }

      cb(true);
    })
);

// ref: http://stackoverflow.com/a/6330138/7347047
const isPrime = (num, cb, k = 5) => {
  bigNum = bigInt(num);

  // All positive numbers < 3 are not prime
  if (bigNum.compare(3) === -1) {
    cb(false);
  }

  // Even numbers are not prime
  if (bigNum.mod(2).equals(0)) {
    cb(false);
  }

  // Find an odd number d such that n-1 can be written as d*(2^r)
  let s = bigNum.subtract(1);
  let t = 0;

  while (s.mod(2).equals(0)) {
    s = s.divide(2);
    t += 1;
  }

  let completedCount = 0;
  let result = true;
  for (let i = 0; i < k; i += 1) {
    rabinMillerTest(bigNum, s, t, (isProbablyPrime) => {
      completedCount += 1;

      // result is false if any isProbablyPrime is false and true iff all
      // isProbablyPrime are true.
      if (result) {
        result = isProbablyPrime;
      }
      console.log('completedCount', completedCount);

      if (completedCount === k) {
        console.log('issuing callback');
        cb(result);
      }
    });
  }
};

// Tests TODO: extract these into a test suite
const isEqualTo = (a, b, key) => {
  if (a !== b) {
    console.error(`${key}: ${a} not equal to ${b}`);
  };
};

isPrime(3, (numIsPrime) => {
  console.log(`isPrime? 3 ${numIsPrime}`);
});
isPrime(9, (numIsPrime) => {
  console.log(`isPrime? 9 ${numIsPrime}`);
});

module.exports = isPrime;
