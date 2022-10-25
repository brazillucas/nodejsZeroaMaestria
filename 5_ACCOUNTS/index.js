// modulos externos
const inquirer = require('inquirer');
const chalk = require('chalk');

// modulos internos
const fs = require('fs');
const { type } = require('os');
const { get } = require('http');
const { resolve } = require('path');

operation();

// Menu principal
function operation() {
    
    // console.log("\n");
    
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'O que deseja fazer?',
                choices: [
                    '1 - Criar Conta',
                    '2 - Consultar Saldo',
                    '3 - Depositar',
                    '4 - Sacar',
                    '5 - Transferir',
                    '6 - Sair',
                ],
            },
        ])
        .then((answer) => {
            const action = answer['action']
            

            switch(action) {
                case '1 - Criar Conta':
                    createAccount();
                    break;
                case '2 - Consultar Saldo':
                    getSaldo();
                    break;
                case '3 - Depositar':
                    deposit();
                    break;
                case '4 - Sacar':
                    sacar();
                    break
                case '5 - Transferir':
                    transfer()
                    break
                default:
                    console.log(chalk.bgRed.black('Obrigado por utilizar o Accounts!'));
                    process.exit();
                    break
            }

        })
        .catch((err) => console.log(err));
}

// Criar conta
function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'));
    console.log(chalk.green('Defina as opção da sua conta a seguir: '));
    buildAccount();
}

// Construir a conta
function buildAccount() {
    cancelar()

    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'Digite um nome para a sua conta: ',
                validate: function (value) {
                    
                    if (value == -1 ) {
                        return true
                    }
                    if (checkAccount(value)) {
                        return chalk.bgRed.black(`Esta conta já existe, escolha outro nome!`)
                    }
                    return true;

                }
            }
        ])
        .then((answer) => {
            const accountName = answer['accountName'];

            if (accountName == -1) {
                cancelado();
                return reset();
            }

            if (!fs.existsSync('accounts')) {
                fs.mkdirSync('accounts');
            }

            console.log(chalk.blueBright(`\nPor favor, digite uma senha que contenha pelo menos:\n -4 números`));
            cancelar()

            let accountPassword;

            createPassword()
            .then((password) => {
                accountPassword = password;

                const accountData =
                {
                    "name" :accountName,
                    "password": accountPassword,
                    "balance": 0
                }

                writeValue(accountName, accountData);

                console.log(chalk.bgGreen.black(`Conta ${accountName} criada com sucesso!`));

                return reset();

            })
            .catch((err) => {
                console.log(err)
                buildAccount();

            });
        })
        .catch((err) => console.log(err));
}

function createPassword() {

    return new Promise ((resolve, reject) => {
        
        // const reg = /^(?=[^0-9]*[0-9]).{4,8}$/g;
        const reg = /^(\-[1-1])|((?=[^0-9]*[0-9]).{4,8})$/g;

        inquirer
        .prompt([
            {
                name: 'password',
                type: 'password',
                message: 'Digite uma senha: ',
                validate: function (value) {

                    if (value.match(reg)) {
                        return true;
                    }
                    return `Por favor, digite uma senha que contenha pelo menos:\n\t- 4 números\nE no máximo\n\t- 8 números`;
                },
            },
            {
                name: 'confirmPassword',
                type: 'password',
                message: 'Confirme a senha: '
            }
        ])
        .then((answer) => {
            const password = answer['password'];
            const confirmPassword = answer['confirmPassword'];

            if (password == -1) {
                reject('Operação cancelada!\n');
            }


            if (!checkPassword(password, confirmPassword)) {
                console.log(chalk.bgRed.black('As senhas não conferem!'));
                createPassword();
                return;
            }

            resolve(password);
        })
        .catch((err) => {
            console.log(err)
            reject(err);
        });
        
    })
}

// Ler senha
function readPassword(accountName) {

    cancelar()

    return new Promise((resolve, reject) => {

        inquirer
        .prompt([
            {
                name: 'readedPassword',
                type: 'password',
                message: 'Digite a sua senha conta: ',
                validate: function (value) {
                    const accountData = getAccount(accountName);
                    const accountPassword = accountData.password;

                    if (value == -1) {
                        return true;
                    }
                    if(!checkPassword(value, accountPassword)) {
                        return chalk.bgRed.black(`Senha Incorreta. Digite novamente!`);
                    }
                    return true
                }
            }
        ])
        .then((answer) => {
            const readedPassword = answer['readedPassword'];


            if (readedPassword == -1) {
                return reject('Operação Cancelada');
            }

            resolve(true);

        })
        .catch((err) => {
            console.log(err)
            reject(err);
        });

    })

}

function checkPassword(firstPassword, confirmPassword) {
    
    if(firstPassword !== confirmPassword) {
        return false;
    }

    return true;
}

// Depositar
function deposit() {
    cancelar();

    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da conta que deseja depositar?',
            validate: function(value) {

                if (value == -1) {
                    return true
                }
                if (!checkAccount(value)) {
                    console.log();
                    return chalk.bgRed.black(`Esta conta não existe! Insira novamente!`);
                }
                return true
            }
        }
    ])
    .then((answer) => {

        const accountName = answer['accountName'];

        if (accountName == '-1') {
            cancelado();
            return reset()
        }
 
        setMontante(accountName)
        .then((montante) => {

            // Adicionar Saldo
            addMontante(accountName, montante)
            .then(() => {
                
                console.log(chalk.bgGreen.black(`Depósito de R$${montante} realizado com sucesso!`));
                reset();

            })
            .catch((err) => {
                console.log(err)
                return reset();
            })

            
        })
        .catch((err) => {
            console.log(err)
            return deposit();
        });
    
    })
    .catch((err) => console.log(err));
}

// Checar a conta
function checkAccount(accountName) {

    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        return false;
    }

    return true;
}

// Pegar dados da conta
function getAccount(account) {
    const accountJSON = fs.readFileSync(`accounts/${account}.json`, {
        encoding: 'utf-8',
        flag: 'r',
    });

    return JSON.parse(accountJSON);
}

// Consultar saldo
function getSaldo() {
    cancelar();
    
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'De qual conta vocẽ deseja consultar o saldo?',
            validate: function(value) {

                if (value == -1) {
                    return true
                }
                if (!checkAccount(value)) {
                    console.log();
                    return chalk.bgRed.black(`Esta conta não existe! Insira novamente!`);
                }
                return true
            }
        }
    ])
    .then((answer) => {

        const accountName = answer['accountName'];

        if (accountName == -1) {
            cancelado()
            return reset()
        }
        
        readPassword(accountName)
        .then(() => {
            const accountData = getAccount(accountName);

            console.log(
                chalk.bgGreen.black(`O saldo da conta ${accountName} é de R$${accountData.balance}.`)
            );

            return reset();

        })
        .catch((err) => {
            console.log(err)
            return reset();
        })
        
    })
    .catch((err) => console.log(err));
}

// Sacar
function sacar() {
    cancelar()

    inquirer.prompt([
        {
            name: 'accountName',
            message: `Qual o nome da conta da qual deseja sacar? `,
            validate: function(value) {

                if (value == -1) {
                    return true
                }
                if (!checkAccount(value)) {
                    console.log();
                    return chalk.bgRed.black(`Esta conta não existe! Insira novamente!`);
                }
                return true
            }
        }
    ])
    .then((answer) => {

        const accountName = answer['accountName'];

        if (accountName == -1) {
            cancelado()
            return reset()
        }

        readPassword(accountName)
        .then(() => {

            setMontante(accountName)
            .then((montante) => {

                removeMontante(accountName, montante)
                .then((restante) => {

                    console.log(chalk.bgGreen.black(`Saque de R$${montante} realizado com sucesso!`));
                    console.log(chalk.bgGreen.black(`Valor restante na conta: R$${restante}\n`))
                    return reset();

                })
                .catch((err) => {
                    console.log(err)
                    return sacar();
                })

            })
            .catch((err) => {
                console.log(err)
            })
        })
        .catch((err) => {
            console.log(err)
            // return reset();
        })
    })
    .catch((err) => console.log(err));

}

// Definir o valor a ser depositado, sacado ou transferido
function setMontante() {

    return new Promise((resolve, reject) => {

        cancelar()

        inquirer.prompt([
            {
                name: 'montante',
                message: 'Qual o valor?',
                validade: function (value) {
                    if (value == -1) {
                        return true;
                    }
                    if (isNaN(value)) {
                        return chalk.bgRed.black('O valor deve ser um número!');
                    }
                    return true;
                }
            }
        ])
        .then((answer) => {
            const montante = answer['montante'];

            if (montante == -1) {
                cancelado()
                return reset()
            }

            resolve(montante);

        })
        .catch((err) => {
            console.log(err)
            reject(err)
        });

    })

}

// Adicionar saldo a uma conta
function addMontante(accountName, montante) {
    
    return new Promise((resolve, reject) => {

            const accountData = getAccount(accountName);

            if (accountData.balance == undefined) {
                accountData.balance = 0;
            }
            
            accountData.balance += parseFloat(montante);

            writeValue(accountName, accountData);

            resolve();

        })

}

// Remover um valor de uma conta
function removeMontante(accountName, montante) {
    return new Promise((resolve, reject) => {

        const accountData = getAccount(accountName);

        if (!montante) {
            return reject(chalk.bgRed.black(`Valor inválido!`));
        }

        if (accountData.balance < montante) {
            if (accountData.balance == 0) {
                return reject(chalk.bgRed.black(`Saldo zerado!`));
            }
            return reject(chalk.bgRed.black(`Saldo insuficiente!`));
        }

        accountData.balance -= parseFloat(montante);

        writeValue(accountName, accountData);

        let restante = accountData.balance;

        resolve(restante);
    })
}

// Transferir valor de uma conta para outra
function transfer() {
    cancelar()

    inquirer
    .prompt([
        {
            name: 'selfAccount',
            message: 'Qual o nome da sua conta?',
            validate: function(value) {

                if (value == -1) {
                    return true
                }
                if (!checkAccount(value)) {
                    console.log();
                    return chalk.bgRed.black(`Esta conta não existe! Insira novamente!`);
                }
                return true
            }
        },
        {
            name: 'targetAccount',
            message: 'Qual a conta que receberá a transferência?',
            validate: function(value) {

                if (value == -1) {
                    return true
                }
                if (!checkAccount(value)) {
                    console.log();
                    return chalk.bgRed.black(`Esta conta não existe! Insira novamente!`);
                }
                return true
            }
        }
    ])
    .then((answer) => {
        const selfAccount = answer['selfAccount']
        const targetAccount = answer['targetAccount']

        if (selfAccount == -1 || targetAccount == -1) {
            cancelado();
            return reset()
        }

        readPassword(selfAccount)
        .then(() => {

            makeTransfer(selfAccount, targetAccount)
            .then(() => {
                return reset()
            })
            .catch((err) => {

                console.log(err)

            })
            
        })
        .catch((err) => {
            console.log(err)
        })

    })
    .catch((err) => {
        console.log(err)
        return reset()
    })
}

// Efetiva a transferência
function makeTransfer(accountName, targetAccount){
    return new Promise((resolve, reject) => {
        cancelar()

        setMontante()
        .then((montante) => {
            
            removeMontante(accountName, montante)
            .then((restante) => {

                addMontante(targetAccount, montante)
                .then(() => {

                    console.log(chalk.bgGreen.black(`Transferência de R$${montante} realizada com sucesso!`));
                    console.log(chalk.bgGreen.black(`Valor restante na conta: R$${restante}\n`))

                    resolve()

                })
                .catch((err) => {
                    console.log(err)
                    return makeTransfer();
                })

            })
            .catch((err) =>{
                addMontante(accountName, montante)
                reject(err)

            })
        })
        .catch((err) => {
            console.log(err)
        })
    })

}

// Escreve dados no arquivo JSON
// Futuramente será usada para gravar no banco de dados
function writeValue (accountName, accountData) {

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err) {
            console.log(err);
        }
    );
}

// Exibe instruções de cancelamento de operação
function cancelar() {
    console.log(chalk.blueBright(`Insira -1 para cancelar a operação!\n`));
}

// Exibe aviso de que operação foi cancelada
function cancelado() {
    console.log(chalk.bgRed.black('Operação cancelada!\n'));
}

// Limpar console e chamar a função principal
function reset() {
    
    espera(2000)
    .then(() => {
        // console.clear();
        operation();
    })
    .catch((err) => console.log(err));
}

// Tempo antes de limpar a tela e chamar o menu principal
function espera(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }