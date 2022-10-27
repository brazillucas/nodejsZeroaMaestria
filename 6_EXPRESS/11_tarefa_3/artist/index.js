const express = require('express');
const path = require('path');
const basePath = path.join(__dirname, '../templates');

const router = require('express').Router();

router.get('/legiaourbana', (req, res) => {
    res.sendFile(`${basePath}/legiaourbana.html`)
})

router.get('/chicobuarque', (req, res) => {
    res.sendFile(`${basePath}/chicobuarque.html`)
})

router.get('/cadastro', (req, res) => {
    res.sendFile(`${basePath}/cadastro.html`)
})

router.post('/salvar', (req, res) => {
    console.log(req.body)
    const banda = req.body.name
    const tempo = parseInt(req.body.tempo)

    console.log(`A banda é ${banda} e tem ${tempo} anos de carreira.`)

    res.sendFile(`${basePath}/sucesso.html`)
})

module.exports = router