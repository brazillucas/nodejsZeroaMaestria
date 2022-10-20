const os = require('os');



console.log('info: ',os.userInfo())


console.log('dir por temp: ', os.tmpdir());

console.log('dir por home: ', os.homedir());

console.log('CPUs: ', os.cpus());

// Como saber quanto de memória seu pc tem
const totalmem = os.totalmem();
console.log('Memoria Total: ', os.totalmem());
console.log('Memória Livre: ', os.freemem());

// Para pegarmos em bytes precisamos dividir pelo 1024
const totalmemKB = totalmem / 1024;
const totalmemMB = (totalmemKB / 1024).toFixed(2);
const totalmemGB = (totalmemMB / 1024).toFixed(2);

console.log('Memoria Total em KB ', totalmemKB);
console.log('Memoria Total em MB ', totalmemMB);
console.log('Memoria Total em GB ', totalmemGB);

const osMiras = os.type();

console.log('OS: ', osMiras); //=> dará darwin para IOS.