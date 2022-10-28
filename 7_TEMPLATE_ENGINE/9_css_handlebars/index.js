const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'handlebars',
    partialsDir: ['views/partials'],
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

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
    
    let total = products.reduce((acc, el) => {
        return acc + el.price
        }, 0);
    console.log(total)

    total = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    console.log(total)



    products.forEach(product => {
        product.price = product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    })

    res.render('dashboard', {products, total})
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

app.get('/blog', (req, res) => {
    const posts = [
        {
            title: 'Aprender Node.js',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
            category: 'JavaScript',
            comments: ['lorem', 'ipsum', 'dolor', 'sit', 'amet']
        },
        {
            title: 'Aprender Django',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
            category: 'Python',
            comments: ['lorem', 'ipsum', 'dolor', 'sit', 'amet']
        },
        {
            title: 'Aprender Selenium',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
            category: 'C#',
            comments: ['lorem', 'ipsum', 'dolor', 'sit', 'amet']
        },
    ]

    res.render('blog', {posts})
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