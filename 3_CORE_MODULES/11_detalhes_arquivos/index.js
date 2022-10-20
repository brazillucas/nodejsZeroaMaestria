const fs        = require('fs');

const arquivo   = 'novoarquivo.txt';
const pasta     = 'pasta';

fs.stat(pasta, (err, stats) => {
    if(err) {
        console.log(err);
        return
    } else {
        console.log(stats);
        console.log(stats.isFile());
        console.log(stats.isDirectory());
        console.log(stats.isSymbolicLink());
        console.log(stats.ctime);
        console.log(stats.size);
        console.log(stats.uid);
        console.log(stats.gid);
        
    }
})