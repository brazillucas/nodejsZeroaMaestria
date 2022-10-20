const x = "10";

// Chegar se x é um número
if (!Number.isInteger(x)) {
    throw new Error('O valro de x não é um número inteiro')
}

console.log('Continuando o código...')