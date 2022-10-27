const express = require('express');
const app = express();
const port = 3000; // variáǘel de ambiente

const path = require('path');

const basePath = path.join(__dirname, 'templates');

checkAuthy = function(req, res, next) {
    
    req.authStatus = true

    if (req.authStatus) {
        console.log('Autenticado. Continuando...');
        next();
    } else {
        console.log('Não autenticado. Faça login para continuar!');
    }
}

app.use(checkAuthy);

app.get('/users/:id', (req, res) => {
    const id = req.params.id

    console.log(`O id do usuário é ${id}`);
    res.sendFile(`${basePath}/users.html`);
})

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})