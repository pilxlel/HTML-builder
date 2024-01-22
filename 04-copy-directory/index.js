const path = require('path');
const fs = require('fs');

const folderPath = path.resolve(__dirname) + '/files/';
const newFolderPath = path.resolve(__dirname) + '/files-copy/';

fs.mkdir(newFolderPath, { recursive: false }, () => {});

fs.readdir(
  newFolderPath,
  { encoding: 'utf8', withFileTypes: true },
  (error, files) => {
    if (files.length) {
      files.forEach((file) => {
        fs.unlink(newFolderPath + file.name, () => {});
      });
    }
    fs.readdir(
      folderPath,
      { encoding: 'utf8', withFileTypes: true },
      (error, files) => {
        files.forEach((file) => {
          fs.copyFile(
            folderPath + file.name,
            newFolderPath + file.name,
            () => {},
          );
        });
      },
    );
  },
);
