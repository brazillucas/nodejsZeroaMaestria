const fs = require('fs');

const arquivo = 'arquivo.txt';
const arquivo_renomeado = 'arquivo_renomeado.txt';

fs.writeFile(arquivo, 'Arquivo de teste', function(err) {
    if (err) {
        console.log(err);
        console.log('Erro ao escrever arquivo');
        return;
    }
    console.log('Arquivo criado com sucesso!');
})

fs.readFile(arquivo, function(err, data) {
    if (err) {
        console.log(err);
        console.log('Erro ao ler arquivo');
        return;
    }
    console.log(data.toString());
})

setTimeout(function() {
    fs.rename(arquivo, arquivo_renomeado, function(err) {
        if (err) {
            console.log(err);
            console.log('Erro ao renomear arquivo');
            return;
        }
        console.log('Arquivo renomeado com sucesso!');
    });
}, 3000);

setTimeout(function() {
    fs.unlink(arquivo_renomeado, function(err) {
        if (err) {
            console.log(err);
            console.log('Erro ao excluir arquivo');
            return;
        }
        console.log('Arquivo removido com sucesso!');
        });
}, 6000);