const express = require('express')
const app = express()
const port = 5000

const path = require('path')

const artistRouter = require('./artist')


app.use(
    express.urlencoded({
        extended: true 
    }),
)

app.use(express.json());


app.use(express.static(`public`))

const basePath = path.join(__dirname, 'templates')

app.use('/artist', artistRouter)


app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.use((req, res, next) => {
        
    res.status(404).sendFile(`${basePath}/404.html`);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})