const axios = require('axios');
const bigInt = require('big-integer');

// TODO: improve and test for small and large numbers, also negatives
// TODO: ensure this is random. I have doubts.
const getRandomInt = (min, max) => {
  const bigMin = bigInt(min);
  const bigMax = bigInt(max);
  const bigMaxDigitCount = bigMax.toString().length;

  if (bigMax.toString().length > 10000 || bigMin.toString().length > 10000) {
    // TODO: implement
    // random.org can handle this through multiple requests but it's out of
    // scope for the time being.
    console.error('Not implemented for numbers with more than 10000 digits');
    return false;
  }

  return axios
    .get(`https://www.random.org/integers/?num=${bigMaxDigitCount*2}&min=0&max=9&col=1&base=10&format=plain&rnd=new`)
    .then(({ data }) => {
      const dataAsArray = data.split('\n');
      console.log(dataAsArray);
      // Start off equal to bigMax so we enter into the while loop
      let curNum = bigMax;
      let i = 0;

      while (curNum.geq(bigMax) && i < bigMaxDigitCount*2) {
        curNum = bigInt(dataAsArray.slice(i, i + bigMaxDigitCount).join(''));
        i += 1;
      }

      return curNum;
    });
};

getRandomInt(2, 10000000000000000).then(num => console.log(num));

module.exports = getRandomInt;
