const path = require('path');
const fs = require('fs');
const fsPromise = require('fs/promises');

const assets = path.resolve('06-build-page', 'assets');
const components = path.resolve('06-build-page', 'components');
const html = path.resolve('06-build-page', 'template.html');
const styles = path.resolve('06-build-page', 'styles');

const pathMy = path.resolve('06-build-page', 'project-dist');
const pathAssets = path.resolve('06-build-page', 'project-dist', 'assets');
const pathHtml = path.resolve('06-build-page', 'project-dist', 'index.html');
const pathCss = path.resolve('06-build-page', 'project-dist', 'style.css');

fs.mkdir(pathMy, {recursive: true}, (error) => {
  if (error) throw error;
});

fs.mkdir(pathAssets, {recursive: true}, (error) => {
  if (error) throw error;
});

fs.writeFile(pathHtml, '', (error) => {
  if (error) throw error;
});

fs.writeFile(pathCss, '', (error) => {
  if (error) throw error;
});

async function copyFiles() {
  try {
    const dirForCopy = await fsPromise.readdir(assets, {withFileTypes: true});
    for (let dirCopy of dirForCopy) {
      let currentCopy = await fsPromise.readdir(path.resolve(assets, dirCopy.name), {withFileTypes:true});
      fs.mkdir(path.resolve(pathAssets, dirCopy.name), {recursive: true}, (error) => {
        if (error) throw error;
      });
      let copies = await fsPromise.readdir(path.resolve(pathAssets, dirCopy.name), {withFileTypes: true});
      for (let copy of copies) {
        fs.unlink(path.resolve(pathAssets, dirCopy.name, copy.name), function (error) {
          if (error) {
            console.log(error);
          }
      });
    }
    for (let currentFile of currentCopy) {
      fs.copyFile(path.resolve(assets, dirCopy.name, currentFile.name), path.resolve(pathAssets, dirCopy.name, currentFile.name), (error) => {
        if (error) {
          console.log(error);
        }
      });
    }
  }
  } catch (error) {
    console.log(error);
  }
}

copyFiles();

async function htmlCreate() {
  try {
    let htmlFiles = await fsPromise.readdir(components, {withFileTypes: true});
    let template = await fsPromise.readFile(html);
    let templateString = template.toString();
    let currentFile = '';
    for (let file of htmlFiles) {
      if (file.isFile() && path.extname(file.name) === '.html') {
        currentFile = await fsPromise.readFile(path.resolve(components, file.name));
        templateString = templateString.replace(`{{${file.name.slice(0, -5)}}}`, currentFile.toString());
      }
    }
    fsPromise.writeFile(pathHtml, templateString);
  } catch (error) {
    console.log(error);
  }
}
htmlCreate();

async function copyStyle() {
  try {
    let styleFiles = await fsPromise.readdir(styles, {withFileTypes: true});
    for (let styleFile of styleFiles) {
      if (styleFile.isFile() === true && path.extname(styleFile.name) === '.css') {
        fs.readFile(path.resolve(styles, styleFile.name), 'utf-8', (error, data) => {
          fs.appendFile(pathCss, data + '\n', (error) => {
            if (error) throw error;
          });
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

copyStyle();