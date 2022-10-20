const fs = require('fs');

// Sincrono
console.log('Inicio');

fs.writeFileSync('arquivo.txt', 'Conteúdo do arquivo');

console.log('Fim');