console.log(global);

global.setTimeout(() => {
  console.log(`This is timeout`);
  clearInterval(intId);
}, 3000);

var intId = setInterval(() => {
  console.log(`This is interval`);
}, 1000);

console.log(`Directory name: ${__dirname}`);
console.log(`File name: ${__filename}`);
