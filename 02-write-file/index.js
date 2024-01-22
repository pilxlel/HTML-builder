const path = require('path');
const fs = require('fs');
const readline = require('readline');
const filePath = path.resolve(__dirname) + '/text.txt';

const fileStream = fs.createWriteStream(filePath);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Enter your text: ');

rl.on('line', (input) => {
  if (input === 'exit') {
    rl.close();
    fileStream.end();
    process.exit();
  }

  fileStream.write(input + '\n');
});

rl.on('close', () => {
  console.log('Done!');
});
