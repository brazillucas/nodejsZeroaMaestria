const inquirer = require("inquirer");
const chalk = require('chalk');

function setNumber() {
    return new Promise((resolve, reject) => {

        const reg = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{3,}$/g;

        inquirer
            .prompt([
                {
                    name: 'enterPassword',
                    type: 'password',
                    message: 'Digite uma senha:',                    
                    validate: function (value) {
                        if (value == -1){
                            return true;
                        } else  if (value.match(reg)) {
                            return true;
                        }
                        else {
                            return `Por favor, digite uma senha que contenha pelo menos:\n\t- 8 caracteres\n\t- uma letra maiúscula\n\t- uma letra minúscula\n\t- um número.`;
                        }
                    }
                },
                {
                    name: 'confirmPassword',
                    type: 'password',
                    message: 'Confirme sua senha:'
                }
            ])
            .then((answer) => {
                const password = answer['enterPassword'];
                const confirmPassword = answer['confirmPassword'];

                if (password == -1) {
                    return reject('Operação cancelada.');
                }

                if (password != confirmPassword) {
                    console.log(chalk.bgRed.black('As senhas não conferem!'));
                    setNumber();
                    return;
                }

                resolve(password);
            }).catch((err) => {
                console.log(err)
                reject('Deu certo não, fi');

            });
    })
}

function senha () {
    let senha = '';
    
    console.log(`Digite uma senha que contenha pelo menos:\n\t- 8 caracteres\n\t- uma letra maiúscula\n\t- uma letra minúscula\n\t- um número.\n`);
    
    setNumber()
    .then((password) => {
        console.log('Peguei a senha');
        console.log(password);
        console.log(typeof(password));
        senha = password;
        console.log(senha);
        console.log('Fim da função senha');
        return password;

    })
    .catch((err) => {
        console.log(err);
    });

}

let passwd = senha()