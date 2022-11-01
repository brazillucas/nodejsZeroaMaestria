const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

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

    const sql = `INSERT INTO books (title, pagesqty) VALUES ('${title}', '${pagesqty}')`

    conn.query(sql, (err) => {
        if (err) {
            console.log(err)
        }

        res.redirect('/books')
    })
})

app.get('/books', (req, res) => {

    const sql = `SELECT * FROM books ORDER BY title `

    conn.query(sql, function (err, data) {

        if (err) {
            console.log(err)
            return
        }

        const books = data

        console.log(books)

        res.render('books', { books })
    })

})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'android',
    password: 'marshmallow',
    database: 'nodemysql'
})

conn.connect((err) => {
    if (err) {
        console.log(err)
    }
    console.log('MySQL Connected')

    app.listen('3000', () => {
        console.log('Server started on port 3000')
    })
})

app.get('/books/:id', (req, res) => {

    const id = req.params.id

    const sql = `SELECT * FROM books WHERE id = ${id}`

    conn.query(sql, function(err, data) {

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

    const sql = `SELECT * FROM books WHERE id = ${id}`

    conn.query(sql, function(err, data) {

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

    const sql = `UPDATE books SET title = '${title}', pagesqty = '${pagesqty}' WHERE id = ${id}`

    conn.query(sql, (err) => {
        if (err) {
            console.log(err)
        }

        res.redirect('/books')
    })
})

app.post('/books/deletebook/:id', (req, res) => {
        
    const id = req.params.id

    const sql = `DELETE FROM books WHERE id = ${id}`

    conn.query(sql, (err) => {
        if (err) {
            console.log(err)
        }

        res.redirect('/books')
    })
})