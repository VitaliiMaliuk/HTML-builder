const fs = require("fs");
const path = require("path");

fs.readdir(
  path.join("03-files-in-folder", "secret-folder"),
  { withFileTypes: true },
  (error, files) => {
    if (error) {
      console.log(error);
    } else {
      files.forEach((file) => {
        if (file.isFile() === true) {
          fs.stat(
            path.resolve("03-files-in-folder", "secret-folder", file.name),
            (error, stats) => {
              console.log(
                `${file.name
                  .split(".")
                  .slice(0, -1)
                  .join(".")} - ${path.extname(file.name)} - ${
                  stats.size
                } bytes`
              );
            }
          );
        } else if (file.isDirectory() === true) {
          return;
        }
      });
    }
  }
);
