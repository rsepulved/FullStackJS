const url = "https://jsonplaceholder.typicode.com/posts";
var datosFetched;
var listaFavoritos = [];
// var firstLoad = false

const tresSegundos = new Promise((resolve, reject) => {
  resolve(
    setTimeout(function () {
      console.log("Informacion enviada");
    }, 3000)
  );
});

async function recibirTresSegundos() {
  try {
    datosFetched = await tresSegundos();
  } catch (err) {
    console.log(err.message);
  }
}

const getDatos = () => {
  return new Promise((resolve, reject) => {
    resolve(fetch(url).then((response) => response.json()));
    reject(new Error("No existen datos"));
  });
};

async function fectchinData() {
  try {
    datosFetched = await getDatos();
    for (i = 0; i < 20; i++) {
      crearTarjetas(datosFetched[i]);
    }
  } catch (err) {
    console.log("No existen datos");
  }
}

fectchinData();

let tarjeta = document.getElementById("tarjeta");
let modalTile = document.getElementById("exampleModalLabel");
let modalBody = document.getElementById("modalBody");

function soloLetras(e) {
  key = e.keyCode || e.which;
  tecla = String.fromCharCode(key).toLowerCase();
  letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
  especiales = "8-37-39-46";

  tecla_especial = false;
  for (var i in especiales) {
    if (key == especiales[i]) {
      tecla_especial = true;
      break;
    }
  }

  if (letras.indexOf(tecla) == -1 && !tecla_especial) {
    return false;
  }
}

// crear tarjetas desde el array usuarios
let tester = () => {
  for (let i = 0; i < 3; i++) {
    console.log(usuarios[i]);
  }
};

// console.log(data);
let crearTarjetas = (element) => {
  // console.log(element);
  const miNodoColumna = document.createElement("div");
  miNodoColumna.classList.add(
    "col-lg-4",
    "col-md-6",
    "col-sm-12"
    // "align-self-center"
  );
  const miNodoTarjeta = document.createElement("div");
  miNodoTarjeta.classList.add("card", "text-center", "w-100", "mb-3", "h-90");
  miNodoTarjeta.setAttribute("style", "width: 18rem");
  const miNodoBody = document.createElement("div");
  miNodoBody.classList.add("card-body");
  const miNodoHeader = document.createElement("h5");
  miNodoHeader.classList.add("card-title");
  miNodoHeader.textContent = element.title;
  const miNodoText = document.createElement("p");
  miNodoText.classList.add("card-text");
  miNodoText.textContent = element.title;
  const miNodoBotones = document.createElement("div");
  miNodoBotones.classList.add("row", "justify-content-evenly");
  const miNodoBotonUno = document.createElement("div");
  miNodoBotonUno.classList.add("col-4");
  const miNodoBotonDos = document.createElement("div");
  miNodoBotonDos.classList.add("col-4");
  //   miNodoBoton.classList.add("btn", "btn-primary");
  const miNodoBoton = document.createElement("button");
  miNodoBoton.classList.add("btn", "btn-primary", "col");
  miNodoBoton.textContent = "Display!";
  // asignamos al boton el valor del usuario.id para
  // que sea el argumento de la funcion que despliega el modal
  miNodoBoton.setAttribute("data-bs-toggle", "modal");
  miNodoBoton.setAttribute("data-bs-target", "#exampleModal");
  miNodoBoton.setAttribute("onclick", `desplegarModal(${element.id})`);

  const miNodoBotonFav = document.createElement("button");
  if (listaFavoritos.includes(element.id)) {
    miNodoBotonFav.classList.add("btn", "text-bg-primary", "col");
  } else {
    miNodoBotonFav.classList.add("btn", "text-bg-light", "col");
  }
  //   miNodoBotonFav.classList.add("btn", "text-bg-light", "col");
  miNodoBotonFav.textContent = "Favoritos";
  miNodoBotonFav.setAttribute("onclick", `addFavoritos(${element.id})`);
  miNodoBotonFav.setAttribute("id", `favorito_${element.id}`);

  // asignamos cada chlild a su paren correspondiente
  miNodoBotonUno.appendChild(miNodoBoton);
  miNodoBotonDos.appendChild(miNodoBotonFav);
  miNodoBotones.appendChild(miNodoBotonUno);
  miNodoBotones.appendChild(miNodoBotonDos);
  miNodoBody.appendChild(miNodoHeader);
  miNodoBody.appendChild(miNodoText);
  miNodoBody.appendChild(miNodoBotones);
  miNodoTarjeta.appendChild(miNodoBody);
  miNodoColumna.appendChild(miNodoTarjeta);

  tarjeta.appendChild(miNodoColumna);
};

// funcion para desplegar el modal dinamicamente
let desplegarModal = (x) => {
  datosFetched.forEach(function (usuario) {
    if (x == usuario.id) {
      console.log(usuario.id);
      modalTile.textContent = usuario.title;
      modalBody.textContent = usuario.body;
    }
  });
};

let addFavoritos = (x) => {
  let botonFavorito = document.getElementById(`favorito_${x}`);
  console.log(botonFavorito);
  if (listaFavoritos.length > 0) {
    if (listaFavoritos.includes(x)) {
      listaFavoritos = listaFavoritos.filter(function (item) {
        return item !== x;
      });
      botonFavorito.classList.remove("text-bg-primary");
      botonFavorito.classList.add("text-bg-light");
    } else {
      listaFavoritos.push(x);
      botonFavorito.classList.remove("text-bg-light");
      botonFavorito.classList.add("text-bg-primary");
    }
  } else {
    listaFavoritos.push(x);
    botonFavorito.classList.remove("text-bg-light");
    botonFavorito.classList.add("text-bg-primary");
  }
  console.log(listaFavoritos);
};

let filtrarFavoritos = () => {
  let textoBusqueda = document.getElementById("formaBusqueda").value;
  let paraBuscar = document.getElementById("paraBuscar").value;
  if (paraBuscar == "porFavorito") {
    if (textoBusqueda.length == 0) {
      tarjeta.textContent = "";
      listaFavoritos.forEach((element) => {
        crearTarjetas(datosFetched[element - 1]);
      });
    } else {
      tarjeta.textContent = "";
      listaFavoritos.forEach((element) => {
        if (datosFetched[element - 1].title.includes(textoBusqueda))
          crearTarjetas(datosFetched[element - 1]);
      });
    }
  } else {
    if (textoBusqueda.length == 0) {
      tarjeta.textContent = "";
      for (i = 0; i < 20; i++) {
        crearTarjetas(datosFetched[i]);
      }
    } else {
      tarjeta.textContent = "";
      datosFetched.forEach((element) => {
        if (element.title.includes(textoBusqueda)) {
          crearTarjetas(element);
        }
      });
    }
  }
  if (tarjeta.textContent == "") {
    alert("No se encontraron coincidencias a tu busqueda");
  }
};
// sacarlo de la lista y cambiar el color del padre a no favorito
// continue

// Funcion para el loader
var myVar;

let tiempo = () => {
  myVar = setTimeout(showPage, 3000);
};

let showPage = () => {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myCards").style.display = "block";
};
