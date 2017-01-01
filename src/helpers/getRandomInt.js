const axios = require('axios');

const getRandomInt = (min, max) => (
  axios
    .get(`https://www.random.org/integers/?num=1&min=${+min}&max=${+max}&col=1&base=10&format=plain&rnd=new`)
);

module.exports = getRandomInt;
