const fs = require('fs');
const path = require('path');

const readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
let data = '';

readableStream.on('data', chunk => console.log(data += chunk));
readableStream.on('error', error => console.log('Error', error.message));