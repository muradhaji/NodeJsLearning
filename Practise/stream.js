const fs = require(`fs`);

const readStream = fs.createReadStream('./otherFiles/readStream.txt', {
  encoding: `utf8`,
});
const writeStream = fs.createWriteStream(`./otherFiles/writeStream.txt`, {
  encoding: `utf8`,
});

readStream.on(`data`, (chunk) => {
  console.log(`Chunk ${chunk.length}`);

  // writeStream.write(`\nChunk: (${chunk.length})\n`);
  // writeStream.write(chunk);
});

// Piping
readStream.pipe(writeStream);
