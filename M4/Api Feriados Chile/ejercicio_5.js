let url = 'https://api.victorsanmartin.com/feriados/en.json'
let datos = [];

function cambiaformatoFecha(string) {
    var infoFecha = string.split('-').reverse().join('/');
    return infoFecha;
}

function diasIrrenunciables (algo) {
    if (algo) {
        return 'si'
    } else {
        return 'no'
    }
}

fetch(url)
    .then (response => response.json())
    .then (data => mostrarData(data))
    .catch (error => console.log(error))

const mostrarData = (data) => {
    
     datos.push(data);
     console.log ("los datos son estos",datos);
     let cuerpo= '';
    for (let i=0; i<datos[0].data.length ; i++) {
        cuerpo +=`<tr><td> ${cambiaformatoFecha(datos[0].data[i].date)} </td><td>${datos[0].data[i].title}</td><td>${datos[0].data[i].type}</td><td>${diasIrrenunciables(datos[0].data[i].inalienable)}</td></tr>`
     
    }
    document.getElementById("tablebody").innerHTML = cuerpo; 

} 
