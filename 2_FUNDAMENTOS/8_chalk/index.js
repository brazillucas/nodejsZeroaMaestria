const chalk = require('chalk');

const nota = 6;

// console.log(chalk.green.bold('Parabéns! Você foi aprovado!'));

if (nota >= 7) {
    console.log(chalk.green.bold('Parabéns! Você tirou %d e foi aprovado!'), nota);
} else {
    console.log(chalk.white.bgRedBright.bold(`Sinto muito! Você tirou ${nota} e foi reprovado!`))
}