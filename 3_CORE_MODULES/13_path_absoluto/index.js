const path = require('path');

// path absoluto
console.log(path.resolve('teste.txt'));

// formar path

const midFolder = 'relatorios';

const filename = 'android.txt';

const finalpath = path.join('/', 'arquivos', midFolder, filename);

console.log(finalpath);