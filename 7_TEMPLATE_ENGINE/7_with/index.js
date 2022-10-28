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

    const products = [
        { name: 'Notebook', price: 2499, fragil: true },
        { name: 'iPad Pro', price: 4199, fragil: true },
        { name: 'Copo de Vidro', price: 12.49, fragil: true },
        { name: 'Copo de Plástico', price: 18.99, fragil: false }
    ]
    res.render('dashboard', {products})
})

app.get('/post', (req, res) => {
    const post = {
        title: 'My first post',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
        category: 'JavaScript',
        comments: ['lorem', 'ipsum', 'dolor', 'sit', 'amet']
    }

    res.render('blogpost', {post})
})

app.get('/', (req, res) => {

    const user = {
        name: 'Lucas',
        surname: 'Cardoso',
        age: 23,
    }

    const auth = true

    const approved = true


    res.render('home', {user: user, auth, approved})
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})