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

        res.redirect('/')
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