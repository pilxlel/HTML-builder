const path = require('path');
const fs = require('fs');

const filePath = path.resolve(__dirname) + '/text.txt';
const stream = fs.ReadStream(filePath, { encoding: 'utf8' });

stream.on('data', (chunk) => {
  console.log(chunk);
});
