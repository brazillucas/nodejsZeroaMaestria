const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'handlebars',
    partialsDir: ['views/partials'],
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')


app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/books/insertbook', (req, res) => {

    const title = req.body.title
    const pagesqty = req.body.pagesqty

    const sql = `INSERT INTO books (??, ??) VALUES (?, ?)`
    const data = ['title', 'pagesqty', title, pagesqty]

    pool.query(sql, data, (err) => {
        if (err) {
            console.log(err)
        }

        res.redirect('/books')
    })
})

app.get('/books', (req, res) => {

    const sql = `SELECT * FROM books ORDER BY title `

    pool.query(sql, function (err, data) {

        if (err) {
            console.log(err)
            return
        }

        const books = data

        console.log(books)

        res.render('books', { books })
    })

})

app.get('/books/:id', (req, res) => {

    const id = req.params.id

    const sql = `SELECT * FROM books WHERE ?? = ?`
    const data = ['id', id]

    pool.query(sql, data, function(err, data) {

        if (err) {
            console.log(err)
            return
        }

        const book = data[0]

        res.render('book', { book})
        
    })
})

app.get('/books/editbook/:id', (req, res) => {
            
    const id = req.params.id

    const sql = `SELECT * FROM books WHERE ?? = ?`
    const data = ['id', id]

    pool.query(sql, data, function(err, data) {

        if (err) {
            console.log(err)
            return
        }

        const book = data[0]

        res.render('editbook', { book })
        
    })
})

app.post('/books/updatebook', (req, res) => {

    const id = req.body.id
    const title = req.body.title
    const pagesqty = req.body.pagesqty

    const sql = `UPDATE books SET ?? = '?', ?? = '?' WHERE ?? = ?`
    const data = ['title', title, 'pagesqty', pagesqty, 'id', id]

    pool.query(sql, data, (err) => {
        if (err) {
            console.log(err)
        }

        res.redirect('/books')
    })
})

app.post('/books/deletebook/:id', (req, res) => {
        
    const id = req.params.id

    const sql = `DELETE FROM books WHERE ?? = ?`
    const data = ['id', id]

    pool.query(sql, data, (err) => {
        if (err) {
            console.log(err)
        }

        res.redirect('/books')
    })
})

app.listen('3000', () => {
    console.log('Server started on port 3000')
})