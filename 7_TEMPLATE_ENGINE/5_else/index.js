const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

const port = 3000

app.get('/vaca', (req, res) => {
    res.render('vaca')
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

app.get('/', (req, res) => {

    const user = {
        name: 'Lucas',
        surname: 'Cardoso',
        age: 23,
    }

    const auth = false

    const approved = true

    res.render('home', {user: user, auth, approved})
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})