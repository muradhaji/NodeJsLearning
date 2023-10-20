const fs = require('node:fs');

console.log(`Files in current directory: ${fs.readdirSync('./')}`);

fs.readdir('./', (err, files) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Files in current directory: ${files}`);
  }
});

// learn orther methods