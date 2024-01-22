const path = require('path');
const fs = require('fs');
const folderPath = path.resolve(__dirname) + '/secret-folder/';

fs.readdir(
  folderPath,
  { encoding: 'utf8', withFileTypes: true },
  (error, files) => {
    files.forEach((file) => {
      if (file.isFile()) {
        fs.stat(folderPath + file.name, (error, item) => {
          console.log(
            file.name.replace('.', ' - ') + ' - ' + item.size + ' bytes',
          );
        });
      }
    });
  },
);
