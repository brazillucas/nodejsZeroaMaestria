// modulos externos
const inquirer = require('inquirer');
const chalk = require('chalk');

// modulos internos
const fs = require('fs');
const { type } = require('os');
const { get } = require('http');

operation();

// Operação
function operation() {
    
    // console.log("\n");
    
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'O que deseja fazer?',
                choices: [
                    'Criar Conta',
                    'Consultar Saldo',
                    'Depositar',
                    'Sacar',
                    'Sair',
                ],
            },
        ])
        .then((answer) => {
            const action = answer['action']
            
            if (action === 'Criar Conta') {
                createAccount();
            } else if (action === 'Consultar Saldo') {
                getSaldo();
            } else if (action === 'Depositar') {
                deposit();
            } else if (action === 'Sacar') {
                sacar();
            } else {
                console.log(chalk.bgRed.black('Obrigado por utilizar o Accounts!'));
                process.exit();
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
    
    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'Digite um nome para a sua conta: ',
            },
            {
                name: 'password',
                type: 'password',
                message: 'Digite uma senha: '
            },
            {
                name: 'confirmPassword',
                type: 'password',
                message: 'Confirme a senha: '
            }
        ])
        .then((answer) => {
            const accountName = answer['accountName'];
            const password = answer['password'];
            const confirmPassword = answer['confirmPassword'];

            
            // console.info(accountName);

            if (!fs.existsSync('accounts')) {
                fs.mkdirSync('accounts');
            }

            if (checkAccount(accountName)) {
                console.log(
                    chalk.bgRed.black(`Esta conta já existe, escolha outro nome!`)
                );
                buildAccount();
                return;
            }

            if (!checkPassword(password, confirmPassword)) {
                console.log(chalk.bgRed.black('As senhas não conferem!'));
                buildAccount();
                return;
            }            

            fs.writeFileSync(
                `accounts/${accountName}.json`,
                JSON.stringify({

                    "password": password,
                    "balance": 0
                }),
                function(err) {
                    console.log(err);
                },
            );

        console.log(chalk.bgGreen.black(`Conta ${accountName} criada com sucesso!`));
        
            
        reset();
        
        })
        .catch((err) => console.log(err));
}

// Ler senha
function readPassword(accountName) {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([            
        {
          name: 'readedPassword',
          type: 'password',
          message: 'Digite a sua senha conta: ',
        }
      ])
      .then((answer) => {            
        const readedPassword = answer['readedPassword'];
        const accountData = getAccount(accountName);
        const accountPassword = accountData.password;

        if(!checkPassword(readedPassword, accountPassword)) {
          console.log(
            chalk.bgRed.black(`Senha Incorreta`)
          );
          if (readPassword === -1) {
            return callback(false);
          }
          return readPassword();
        }
  
        resolve(accountPassword)
      })
    .catch((err) => {
      console.log(err)
      reject(err)
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

    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da conta que deseja depositar?',
        }
    ])
    .then((answer) => {

        const accountName = answer['accountName'];

        if (!checkAccount(accountName)) {
            console.log(chalk.bgRed.black(`Esta conta não existe!`));
            return deposit();
        }
 
        setMontante(accountName);
    
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

// Adicionar saldo a conta
function addMontante(accountName, montante) {
    const accountData = getAccount(accountName);

    if (!montante) {
        console.log(chalk.bgRed.black(`Valor inválido!`));
        return setMontante(accountName);
    }
    
    accountData.balance += parseFloat(montante);

    writeValue(accountName, accountData);

    console.log(
        chalk.bgGreen.black(`Depósito de R$${montante} realizado com sucesso!`)
    );
    
    reset();

}

// Definir o valor a ser depositado
function setMontante(accountName) {

    inquirer.prompt([
        {
            name: 'montante',
            message: 'Quanto você deseja depositar?',
        }
    ])
    .then((answer) => {

        const montante = answer['montante'];

        // Adicionar saldo
        addMontante(accountName, montante);
    }
    )
    .catch((err) => console.log(err));
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
    
        inquirer.prompt([
            {
                name: 'accountName',
                message: 'Qual o nome da conta que deseja consultar o saldo?',
            }
        ])
        .then((answer) => {
    
            const accountName = answer['accountName'];
    
            if (!checkAccount(accountName)) {
                console.log(chalk.bgRed.black(`Esta conta não existe!`));
                return getSaldo();
            }

            readPassword(accountName)
              .then(() => {
                const accountData = getAccount(accountName);
        
                console.log(
                    chalk.bgGreen.black(`O saldo da conta ${accountName} é de R$${accountData.balance}.`)
                );

                reset();

              })
              .catch((err) => console.log(err))
            
    
        })
        .catch((err) => console.log(err));
}

// Sacar
function sacar(account) {

    inquirer.prompt([
        {
            name: 'accountName',
            message: `Qual o nome da conta da qual deseja sacar? `,
        }
    ])
    .then((answer) => {

        const accountName = answer['accountName'];

        if(!checkAccount(accountName)) {
            console.log(chalk.bgRed.black(`Esta conta não existe!`));
            return sacar();
        }

        const accountData = getAccount(accountName);

        setSaque(accountName);
        

        
    })
    .catch((err) => console.log(err));



}

function setSaque(accountName) {

    inquirer.prompt([
        {
            name: 'saque',
            message: `Quanto deseja sacar? `
        }
    ])
    .then((answer) => {

        const saque = answer['saque'];

        // Retirar Saldo
        removeMontante(accountName, saque);

        return saque;

        
    })
    .catch((err) => console.log(err));
}

function removeMontante(accountName, montante) {

    const accountData = getAccount(accountName);

    if (!montante) {
        console.log(chalk.bgRed.black(`Valor inválido!`));
        return setSaque(accountName);
    }

    if (accountData.balance < montante) {
        if (accountData.balance == 0) {
            console.log(chalk.bgRed.black(`Saldo zerado!`));
            return reset();
        } else {
            console.log(chalk.bgRed.black(`Saldo insuficiente!`));
            return setSaque(accountName);
        }
    }

    accountData.balance -= parseFloat(montante);

    writeValue(accountName, accountData);

    console.log(
        chalk.bgGreen.black(`Saque realizado com sucesso!`)
    );
    console.log(
        chalk.bgGreen.black(`Valor restante na conta: R$${accountData.balance}`)
    )

    reset();
}


function writeValue (accountName, accountData) {

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err) {
            console.log(err);
        }
    );
}

// Limpar console e chamar a função principal
async function reset() {
    
    await espera(2000);

    // console.clear();

    operation();

}

function espera(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
