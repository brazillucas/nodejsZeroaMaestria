const express = require('express')
const exphbs = require('express-handlebars')
const port = 5000
const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'handlebars',
    partialsDir: ['views/partials'],
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {

    const products = [
        { name: 'Galaxy S22', price: 2493, store: 'Samsung', link: '#'},
        { name: 'Galaxy Fold 4', price: 12493, store: 'Samsung', link: '#'},
        { name: 'Redmi Note 11', price: 2430, store: 'Xiaomi BR', link: '#'},
        { name: 'Motorola Razr', price: 4362, store: 'Motorola', link: '#'},
        { name: 'Positvo P40', price: 1400, store: 'Positivo', link: '#'},
        { name: 'Motorola G100', price: 3200, store: 'Xiaomi BR', link: '#'},
    ]

    products.forEach(product => {
        product.price = product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    })

    res.render('home', { products })
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}!`)
})