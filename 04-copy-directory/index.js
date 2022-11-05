const fs = require("fs");
const path = require("path");
const fsPromise = require('fs/promises');

fs.mkdir(
  path.resolve("04-copy-directory", "files-copy"),
  { recursive: true },
  (error) => {
    if (error) throw error;
  }
);

async function copyDir() {
  try {
    const fileCopies = await fsPromise.readdir(
      path.join("04-copy-directory", "files-copy"),
      { withFileTypes: true }
    );
    for (let fileCopy of fileCopies) {
      fs.unlink(
        path.resolve(
          path.join("04-copy-directory", "files-copy"),
          fileCopy.name
        ),
        (error) => {
          if (error) {
            console.log(error);
          }
        }
      );
    }
    const files = await fsPromise.readdir(
      path.join("04-copy-directory", "files"),
      { withFileTypes: true }
    );
    for (const file of files) {
      if (file.isFile()) {
        fs.copyFile(
          path.resolve(path.join("04-copy-directory", "files"), file.name),
          path.resolve(path.join("04-copy-directory", "files-copy"), file.name),
          (error) => {
            if (error) {
              console.log(error);
            }
          }
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
}
copyDir();