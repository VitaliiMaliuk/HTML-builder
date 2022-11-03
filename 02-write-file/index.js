const fs = require('fs');
const path = require('path');

// const output = fs.createWriteStream(path.join('02-write-file', 'write.txt'));
const { stdin, stdout} = process;

fs.writeFile(
  path.join('02-write-file', 'write.txt'),
  '',
  (error) => {
    if (error) throw error;
  stdout.write('Введите текст\n');
});

stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    stdout.write('Прощай!');
    process.exit();
  } else {
    fs.appendFile(path.join('02-write-file', 'write.txt'), data, (error) => { 
      if (error) throw error;
    });
    stdout.write('Текст записан. Можете продолжить.\n');
  }
});

process.on('SIGINT', () => {
  stdout.write('Прощай!');
  process.exit();
});