const Promise = require('bluebird');
const getRandomInt = require('./helpers/getRandomInt');
const getRandomIntByBitLength = require('./helpers/getRandomIntByBitLength');
const isPrime = require('./helpers/isPrime');

/*
 * RSA Algorithm
 * ref: http://www.di-mgt.com.au/rsa_alg.html#practicalkeygen
 *
 * 1. Generate two large random primes, p and q, of approximately equal size such that their product n = pq is of the required bit length, e.g. 1024 bits. [See note 1].
 * 2. Compute n = pq and (phi) φ = (p-1)(q-1). [See note 6].
 * 3. Choose an integer e, 1 < e < phi, such that gcd(e, phi) = 1. [See note 2].
 * 4. Compute the secret exponent d, 1 < d < phi, such that ed ≡ 1 (mod phi). [See note 3].
 * 5. The public key is (n, e) and the private key (d, p, q). Keep all the values d, p, q and phi secret. [We prefer sometimes to write the private key as (n, d) because you need the value of n when using d. Other times we might write the key pair as ((N, e), d).]
 *
 * n is known as the modulus.
 * e is known as the public exponent or encryption exponent or just the exponent.
 * d is known as the secret exponent or decryption exponent.
 */

const genRandomPrimeOfBitlength = (bitLength) => {
  // ref: http://www.di-mgt.com.au/rsa_alg.html#note1
  //
  // 1. Set the low bit
  //   (this ensures the number is odd)
  // 2. Set the two highest bits
  //   (this ensures that the high bit of n is also set)
  // 3. Check if prime
  //   (use the Rabin-Miller test)
  // 4. If not, increment the number by two and check again until you find a
  //   prime.

  return getRandomIntByBitLength(bitLength)
    .then((num) => {
      //console.log('my random bitlength number is', num.toString(10));
      console.log(isPrime(num));
    });
};

const genRSAKey = (keyLength = 2048) => {
  const pLength = Math.floor(keyLength / 2) - 1;
  const qLength = Math.ceil(keyLength / 2) - 1;
  let p;
  let q;

  genRandomPrimeOfBitlength(40);
  //genRandomPrimeOfBitlength(pLength);
  //genRandomPrimeOfBitlength(qLength);
};

genRSAKey();




module.exports = genRSAKey;
