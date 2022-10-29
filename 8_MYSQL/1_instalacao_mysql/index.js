const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

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
    res.render('home')
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