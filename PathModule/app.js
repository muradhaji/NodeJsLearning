// const path = require('node:path/win32');
// const path = require('node:path').win32;
// const path = require('node:path/posix').posix;
// const path = require('node:path').posix;
const path = require('node:path');

console.log('Filename: ' + __filename);

const pathObj = path.parse(__filename);

console.log('Path object: ');
console.log(pathObj);

console.log('Basename Windows: ' + path.basename(__filename));
console.log('Basename Posix: ' + path.posix.basename(__filename));

// [suffix] is case sensitive!
console.log('Basename without suffix: ' + path.basename(__filename, '.js'));

console.log('Delimiter Windows: ', path.delimiter);
console.log('Delimiter Posix: ', path.posix.delimiter);

console.log('Process env PATH: ', process.env.path);
console.log(
  'Process env PATH (splitted): ' + process.env.path.split(path.delimiter)
);

// learn other methods