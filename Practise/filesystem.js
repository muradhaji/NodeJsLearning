const fs = require(`fs`);
const readline = require(`readline`);
const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Reading file

fs.readFile(`./otherFiles/test.txt`, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Content in the file (test.txt): ${data.toString()}`);
  }
});

// Creating | Writing file

fs.writeFile(`./otherFiles/test2.txt`, `Hello, Friend!`, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`File (test2.txt) written successfully!`);
  }
});

// Creating directory

fs.mkdir(`./otherFiles`, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Directory (./otherFiles) created successfully!`);
  }
});

// Removing directory

fs.rmdir(`./otherFiles`, (err) => {
  if (err) {
    if (err.code == `ENOTEMPTY`) {
      console.log(`The directory (./otherFiles) is not empty!`);
      interface.question(
        `Do you want to delete it anyway? (yes/no):`,
        (answer) => {
          if (answer == `yes`) {
            fs.rm(`./otherFiles`, { recursive: true, force: true }, (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log(`Directory (./otherFiles) removed successfully!`);
              }
            });
          }
          interface.pause();
        }
      );
    } else {
      console.log(err);
    }
  } else {
    console.log(`Directory (./otherFiles) removed successfully!`);
  }
});

// Deleting file

fs.unlink(`./otherFiles/test2.txt`, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('File (test2.txt) removed successfully!');
  }
});

// Check existance

console.log(
  `Is file (test.txt) exists: ${fs.existsSync('./otherFiles/test.txt')}`
);
