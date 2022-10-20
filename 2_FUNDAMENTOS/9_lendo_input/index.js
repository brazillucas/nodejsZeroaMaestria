const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

readline.question("QUal a sua linguagem preferida? ", (language) => {

    language = (/[a-b^]/);
    console.log(language)

    if (language === 'JavaScript') {
        console.log('Você é um programador web!');
    } else if (language === 'Python') {
        console.log('Você é um cientista de dados!');
    } else if(language === 'Java') {
        console.log('Você é um maluco!');
    } else {
      console.log(`A minha linguagem preferida é: ${language}`)
    }

    readline.close()
})