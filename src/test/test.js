let {time} = require('./time');

console.log('get 1st:' + time);
setTimeout(() => {
  console.log('get 2nd:' + time);
  time = 'try to modify';
  console.log(time);
}, 2000);