const path = require('path');
const fs = require('fs');

const stylesFolderPath = path.resolve(__dirname) + '/styles/';
const projectFolderPath = path.resolve(__dirname) + '/project-dist/';
let newFileStream;
let styleArray = [];

fs.readdir(
  projectFolderPath,
  { encoding: 'utf8', withFileTypes: true },
  (error, files) => {
    if (files.length) {
      files.forEach((file) => {
        if (file.name.includes('.css')) {
          fs.unlink(projectFolderPath + file.name, () => {});
        }
        newFileStream = fs.createWriteStream(projectFolderPath + 'bundle.css');
      });
    }
    fs.readdir(
      stylesFolderPath,
      { encoding: 'utf8', withFileTypes: true },
      (error, files) => {
        files.forEach((file) => {
          if (file.name.includes('.css')) {
            let stream = fs.ReadStream(stylesFolderPath + file.name, {
              encoding: 'utf8',
            });
            stream.on('data', (chunk) => {
              styleArray.push(chunk);
            });
            stream.on('end', () => {
              styleArray.forEach((part) => {
                newFileStream.write(part, 'utf8', () => {
                  newFileStream.end();
                });
              });
            });
          }
        });
      },
    );
  },
);
