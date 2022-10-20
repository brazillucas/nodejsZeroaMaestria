// nome

let nome, idade;

console.log(process.argv);

const args = process.argv.slice(2);

console.log(args);

args.forEach((arg, index) => {
    console.log(`${index}: ${arg}`);
});

let argumentos


if (args[0]) {
    argumentos = args[0].split("");
    console.log(argumentos);

    switch (argumentos[1]) {
        case "n":
            nome = args[argumentos.length - 2];
            break;
        case "i":
            idade = args[argumentos.length - 2];
            break;
        default:
            console.log("Argumento inválido");
            return;
    }

    switch (argumentos[2]) {
        case "n":
            nome = args[argumentos.length - 1];
            break;
        case "i":
            idade = args[argumentos.length - 2];
            break;
        default:
            console.log("Argumento inválido");
            return;
    }

}


console.log(`O nome dele é ${nome} e ele tem ${idade} anos.`);