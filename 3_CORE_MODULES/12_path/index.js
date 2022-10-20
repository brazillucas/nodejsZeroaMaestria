const path = require('path');

const customPath = "/relatorios/projeto/mensal/2020/01/relatorio.pdf";

console.log(path.basename(customPath));
console.log(path.dirname(customPath));
console.log(path.extname(customPath));