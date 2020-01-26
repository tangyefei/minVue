var time = (new Date()).getTime();

exports.time = time;

setTimeout(() => {
  time = (new Date()).getTime();
  console.log('new:' + time)
}, 2000);


