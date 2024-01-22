const path = require('path');
const fs = require('fs');

const projectFolderPath = path.resolve(__dirname) + '/project-dist/';
const stylesFolderPath = path.resolve(__dirname) + '/styles/';
const assetsFolderPath = path.resolve(__dirname) + '/assets/';
const componentsFolderPath = path.resolve(__dirname) + '/components/';
const temlateFilePath = path.resolve(__dirname) + '/template.html';

let styleArray = [];
let newCssStream;

fs.mkdir(projectFolderPath, { recursive: false }, () => {
  const writeHTMLStream = fs.createWriteStream(
    projectFolderPath + 'index.html',
    'utf8',
    { flags: 'w' },
  );

  // HTML
  fs.readFile(temlateFilePath, 'utf8', (err, templateData) => {
    fs.readdir(componentsFolderPath, (error, files) => {
      files.forEach((file, index, arr) => {
        let tag = '{{' + file.replace('.html', '') + '}}';
        fs.readFile(
          componentsFolderPath + file,
          'utf8',
          (err, componentData) => {
            templateData = templateData.replace(tag, componentData);
            if (index === arr.length - 1) {
              writeHTMLStream.write(templateData);
            }
          },
        );
      });
    });
  });
  newCssStream = fs.createWriteStream(projectFolderPath + 'style.css');
  // CSS
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
              newCssStream.write(part, 'utf8', () => {
                newCssStream.end();
              });
            });
          });
        }
      });
    },
  );
  // ASSETS
  fs.mkdir(projectFolderPath + 'assets', () => {
    fs.readdir(
      assetsFolderPath,
      { encoding: 'utf8', withFileTypes: true },
      (err, paths) => {
        paths.forEach((path) => {
          if (path.isDirectory()) {
            console.log(path.name);
            fs.mkdir(projectFolderPath + 'assets/' + path.name, () => {});
            fs.readdir(
              assetsFolderPath + path.name,
              {
                encoding: 'utf8',
                withFileTypes: true,
              },
              (err, files) => {
                console.log(files);
                files.forEach((file) => {
                  fs.copyFile(
                    assetsFolderPath + path.name + '/' + file.name,
                    projectFolderPath + 'assets/' + path.name + '/' + file.name,
                    () => {},
                  );
                });
              },
            );
          }
        });
      },
    );
  });
});
