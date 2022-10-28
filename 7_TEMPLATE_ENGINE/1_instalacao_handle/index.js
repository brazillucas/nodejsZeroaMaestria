const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

const port = 3000

app.get('/', (req, res) => {
    res.render('home', { layout: false})
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})