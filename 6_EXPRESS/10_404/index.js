const express = require('express');
const app = express();
const port = 3000; // variável de ambiente

const path = require('path');

const users = require('./users')

// ler o body
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json());

// Arquivos estáticos
app.use(express.static('public'));

const basePath = path.join(__dirname, 'templates');

app.use('/users', users)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`);
})

app.use((req, res, next) => {
    let cabeca = res.getHeader
    console.log(cabeca)
    
    res.status(404).sendFile(`${basePath}/404.html`);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})