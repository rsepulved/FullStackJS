$(document).ready(function () {
  $("table").DataTable();
});

// var nombreCurrent = ''
function preguntarNombre() {
  if (localStorage.getItem("usuario")) {
    let miStorage = localStorage.getItem("usuario");
    var paragraph = document.getElementById("nombreUsuario");
    var txt = document.createTextNode(`Bienvenido ${miStorage}`);
    paragraph.classList.add("nameStyle");
    paragraph.appendChild(txt);
  } else {
    var name = prompt("Dinos tu nombre: ");
    if (name == null || name == "") {
      txt = "No Name provided";
    } else {
      txt = `¡Hola ${name}!`;
      localStorage.setItem("usuario", name);
      var miStorage = localStorage.getItem("usuario");
      // console.log(miStorage);
    }
    alert(txt);
    if (txt != "No Name provided") {
      var paragraph = document.getElementById("nombreUsuario");
      var txt = document.createTextNode(`Bienvenido ${name}`);
      paragraph.classList.add("nameStyle");
      paragraph.appendChild(txt);
    }
  }
}

var hours = 1; // to clear the localStorage after 1 hour
// (if someone want to clear after 8hrs simply change hours=8)
var now = new Date().getTime();
var setupTime = localStorage.getItem("setupTime");
if (setupTime == null) {
  localStorage.setItem("setupTime", now);
} else {
  if (now - setupTime > hours * 1 * 60 * 1000) {
    localStorage.clear();
    localStorage.setItem("setupTime", now);
  }
}

let i = 0;
document.getElementById("contador").innerHTML = i;
function contadorSuma() {
  i++;
  if (i === 20) {
    $("#contador").removeClass("normal");
    $("#contador").addClass("verde");
  }
  if (i >= 0 && i < 20) {
    $("#contador").removeClass("rojo");
    $("#contador").removeClass("verde");
    $("#contador").addClass("normal");
  } else if (i < 0) {
    $("#contador").removeClass("normal");
    $("#contador").addClass("rojo");
  }
  document.getElementById("contador").innerHTML = i;
}

function contadorResta() {
  i--;
  if (i === 20) {
    $("#contador").removeClass("normal");
    $("#contador").addClass("verde");
  }
  if (i >= 0 && i < 20) {
    $("#contador").removeClass("rojo");
    $("#contador").removeClass("verde");
    $("#contador").addClass("normal");
  } else if (i < 0) {
    $("#contador").removeClass("normal");
    $("#contador").addClass("rojo");
  }
  document.getElementById("contador").innerHTML = i;
}
