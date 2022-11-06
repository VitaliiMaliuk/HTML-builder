const fs = require('fs');
const path = require('path');
const filePath = path.resolve('05-merge-styles', 'project-dist', 'bundle.css');
const pathForMerge = path.resolve('05-merge-styles', 'styles');

fs.writeFile(filePath, '', (error) => {
  if (error) throw error;
});

fs.readdir(pathForMerge, {withFileTypes: true}, function(error, files) {
  for (let file of files) {
    if (file.isFile() === true && path.extname(file.name) == '.css') {
      fs.readFile(path.resolve(pathForMerge, file.name), 'utf-8', (error, data) => {
        data = data + '\n';
        fs.appendFile(filePath, data, (error) => {
          if (error) throw error;
        });
      });
    }
  }
});