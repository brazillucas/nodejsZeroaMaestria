const inquirer = require("inquirer");

function setNumber() {
    inquirer
        .prompt([
            {
                name: 'password',
                type: 'password',
                message: 'Digite uma senha:',
            }
        ])
        .then((answer) => {
            const password = answer['password'];

            return password;
        }).catch((err) => {
            console.log(err)
        });
}

async function senha () {
    const senha = setNumber();

    await espera(1000);
    console.info(senha)
}
