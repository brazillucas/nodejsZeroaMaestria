const express = require('express');
const app = express();
const port = 3000; // variáǘel de ambiente

const path = require('path');

const basePath = path.join(__dirname, 'templates');

// ler o body
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.get('/users/add', (req, res) => {
    res.sendFile(`${basePath}/userform.html`);
})

app.post('/users/save', (req, res) => {
    console.log(req.body)
    const name = req.body.name
    const age = req.body.age

    console.log(`O nome do usuário é ${name} e tem ${age} anos.name`)
    res.send('Dados salvos com sucesso!');
})

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