const getRandomInt = require('./helpers/getRandomInt');

getRandomInt(10, 10000)
  .then(({ data }) => {
    console.log('my random number is', data);
  })
