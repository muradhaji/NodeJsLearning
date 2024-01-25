const { carBrands, message } = require(`./constants`);

console.log({ carBrands, message });

const os = require('os');

console.log(os.tmpdir());
console.log(os.homedir());
console.log(os.hostname());
console.log(os.platform());
