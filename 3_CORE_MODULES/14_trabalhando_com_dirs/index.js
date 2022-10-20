const fs = require('fs');

if (!fs.existsSync('./minhapasta')) {
    console.log('A pasta não existe, criando...');
    fs.mkdirSync('minhapasta');    
} else if (fs.existsSync('./minhapasta')) {
    console.log('A pasta já existe!');
}

