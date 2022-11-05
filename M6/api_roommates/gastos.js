const fs = require('fs');
const { v4: uuidv4}  = require('uuid');
const gastosFile = 'gastos.json';

function newGasto(gasto){
    console.log(gasto);
    gasto.id = uuidv4();
    let gastos = [];
    if(fs.existsSync(gastosFile)){
        loosgastos = JSON.parse(fs.readFileSync(gastosFile));
        gastos = [...loosgastos.gastos];
    }
    gastos.push(gasto);
    fs.writeFileSync(gastosFile,JSON.stringify({ gastos } ));
}

module.exports = {
    newGasto
}