const axios = require('axios');
const bigInt = require('big-integer');

const getRandomIntByBitLength = bitLength => {
  if (bitLength === 0) {
    return null;
  } else if (bitLength <= 32) {
    const min = 1 << (bitLength - 1);
    const max = (min * 2) - 1;
    return axios
      .get(`https://www.random.org/integers/?num=1&min=${+min}&max=${+max}&col=1&base=10&format=plain&rnd=new`)
  } else {
    const min = 0;
    const max = 1;
    return axios
      .get(`https://www.random.org/integers/?num=${bitLength}&min=${+min}&max=${+max}&col=1&base=2&format=plain&rnd=new`)
      .then(({ data }) => (
         bigInt(data.split('\n').join(''), 2)
      ));
  }
};

module.exports = getRandomIntByBitLength;
