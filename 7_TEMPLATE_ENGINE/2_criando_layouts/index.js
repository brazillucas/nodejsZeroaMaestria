const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

const port = 3000

app.get('/vaca', (req, res) => {
    res.render('vaca')
})

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})