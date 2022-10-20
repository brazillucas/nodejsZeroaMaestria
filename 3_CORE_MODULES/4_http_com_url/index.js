const http = require('http')

const port = 3000

const server = http.createServer((req, res) => {

    const urlInfo = require('url').parse(req.url, true)
    const name = urlInfo.query.name


    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    
    if (!name) {
        res.end('<h1>Preencha o seu nome: <form method="GET"><input type="text" name="name"><button type="submit">Enviar</button></form></h1>')
    } else {
        res.end(`<h1>Seja bem-vinde ${name}</h1>`)
    }
})

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}.`)
})