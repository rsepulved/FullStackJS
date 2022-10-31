let productos = [
  {
    imagen:
      "https://www.paris.cl/dw/image/v2/BCHW_PRD/on/demandware.static/-/Sites-paris-marketplace/default/dw9d638f5d/images/imagenes-productos/800/MKX5/MKX53ATHYZ-001.jpg?sw=513&sh=654&sm=fit",
    Nombre: "Nintendo Switch V2",
    Categoria: "Consolas",
    Precio: 319990,
    Codigo: "CS-8456",
    Stock: "Si",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum deserunt.",
  },
  {
    imagen:
      "https://www.lapolar.cl/dw/image/v2/BCPP_PRD/on/demandware.static/-/Sites-master-catalog/default/dw37c35450/images/large/24206726.jpg?sw=1200&sh=1200&sm=fit",
    Nombre: "Samsung Galaxy AE32 128GB",
    Categoria: "Telefonía",
    Precio: 159990,
    Codigo: "SP-9889",
    Stock: "Si",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum deserunt.",
  },
  {
    imagen:
      "https://media.ldlc.com/r1600/ld/products/00/05/94/60/LD0005946049.jpg",
    Nombre: "Xiamoi Redmi 10C 64GB",
    Categoria: "Telefonía",
    Precio: 139990,
    Codigo: "SP-5468",
    Stock: "Si",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum deserunt.",
  },
  {
    imagen:
      "https://sipoonline.cl/wp-content/uploads/2022/01/Consola-Sony-PlayStation-5-Blu-Ray-Glacier-White.png",
    Nombre: "PlayStation 5 Glacier White",
    Categoria: "Consolas",
    Precio: 679990,
    Codigo: "CS-4568",
    Stock: "No",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum deserunt.",
  },
  {
    imagen:
      "https://http2.mlstatic.com/D_NQ_NP_628105-MLA49423179604_032022-O.jpg",
    Nombre: "Xiaomi Poco X4 Pro 128GB",
    Categoria: "Telefonia",
    Precio: 309990,
    Codigo: "SP-45231",
    Stock: "No",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum deserunt.",
  },
  {
    imagen:
      "https://http2.mlstatic.com/D_NQ_NP_954129-MLA48035379675_102021-O.jpg",
    Nombre: "Iphone 14",
    Categoria: "Telefonia",
    Precio: 1400000,
    Codigo: "IP-2354",
    Stock: "No",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum deserunt.",
  },
  {
    imagen: "https://m.media-amazon.com/images/I/61TzjMeU3mS._AC_SX522_.jpg",
    Nombre: "Reloj",
    Codigo: 1,
    Categoria: "Reloj",
    Precio: 300,
    Stock: "Si",
  },
  {
    imagen:
      "https://home.ripley.cl/store/Attachment/WOP/D347/2000378718727/2000378718727_2.jpg",
    Nombre: "Audifonos pro",
    Codigo: 2,
    Categoria: "Audifono",
    Precio: 200,
    Stock: "Si",
  },
  {
    imagen:
      "https://s3.amazonaws.com/imagenes-sellers-mercado-ripley/2019/06/17172919/I88STWS-T-ripley.jpg",
    Nombre: "Audifonos noob",
    Codigo: 3,
    Categoria: "Audifono",
    Precio: 100,
    Stock: "Si",
  },
  {
    imagen:
      "https://home.ripley.cl/store/Attachment/WOP/D408/2000386234523/2000386234523_2.jpg",
    Nombre: "Silla",
    Codigo: 4,
    Categoria: "Silla",
    Precio: 400,
    Stock: "No",
  },
];

const divisa = "$";
let productosCarrito = document.getElementById("carritoElements");
let elementosCarrito = document.getElementById("elementosCarrito");
let precioTotal = document.getElementById("precioTotal");
let totalProductos = document.getElementById("totalProductos");
let botonVaciarCarrito = document.getElementById("botonVaciarCarrito");
let iconoCarrito = document.getElementById("iconoCarrito");

//elementos originales
let animacionCarritoOriginal = document.getElementById("sinElementos");
let iconoCarritoOriginal = document.getElementById("0ElementosCarro");
let totalProductosOriginal = document.getElementById("totalProductos");
// Lista de carrito
var nombresItems = [];
var preciosItems = {};
//                array , objetos
function vaciarCarrito() {
  nombresItems = [];
  preciosItems = {};
  modalCompra.style.display = "none";
  if (elementosCarrito.hasChildNodes()) {
    elementosCarrito.textContent = "";
    elementosCarrito.appendChild(animacionCarritoOriginal);
  }
  if (precioTotal.hasChildNodes()) {
    precioTotal.textContent = "";
  }
  if (totalProductos.hasChildNodes()) {
    totalProductos.textContent = "";
    totalProductos.appendChild(totalProductosOriginal);
  }
  if (iconoCarrito.hasChildNodes()) {
    iconoCarrito.textContent = "";
    iconoCarrito.appendChild(iconoCarritoOriginal);
  }
}

function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

function substractElement(thisobj) {
  let thisId = thisobj.id;
  productos.forEach((info) => {
    if (thisId == info.Nombre) {
      for (var i = 0; i < nombresItems.length; i++) {
        if (nombresItems[i] === thisId) {
          nombresItems.splice(i, 1);
          break;
        }
      }
    }
    const preciosItems = {};
    nombresItems.forEach(function (x) {
      preciosItems[x] = (preciosItems[x] || 0) + 1;
    });

    crearElementosCarrito(preciosItems);
    precioTotalFunc(preciosItems, productos);
  });
  if (!nombresItems.includes(thisobj.id)) {
    var objVac = document.getElementById(thisobj.id);
    elementosCarrito.removeChild(objVac);
  }

  if (nombresItems.length == 0) {
    elementosCarrito.appendChild(animacionCarritoOriginal);
    precioTotal.textContent = "";
    modalCompra.style.display = "none";
  }
}

function addElement(thisobj) {
  let thisId = thisobj.id;
  productos.forEach((info) => {
    if (thisId == info.Nombre) {
      for (var i = 0; i < nombresItems.length; i++) {
        if (nombresItems[i] === thisId) {
          nombresItems.push(thisId);
          break;
        }
      }
    }
    const preciosItems = {};
    nombresItems.forEach(function (x) {
      preciosItems[x] = (preciosItems[x] || 0) + 1;
    });
    crearElementosCarrito(preciosItems);
    precioTotalFunc(preciosItems, productos);
  });
}

function crearElementosCarrito(object) {
  Object.entries(object).forEach((entry) => {
    const [key, value] = entry;
    const miNodoCarrito = document.createElement("div");
    miNodoCarrito.classList.add(
      "elementoCarrito",
      "my-3",
      "row",
      "justify-content-between"
    );
    miNodoCarrito.setAttribute("id", key);
    const miNodoFullText = document.createElement("div");
    miNodoFullText.classList.add("col-3");
    const miNodoBotones = document.createElement("div");
    miNodoBotones.classList.add("col-lg-3", "col-md-8", "mx-1", "text-center");
    const miNodoNombreItem = document.createElement("div");
    miNodoNombreItem.classList.add("col", "elementoEnElCarro", "text-center");
    miNodoNombreItem.textContent = `${key}`;
    const miNodoCantidadItem = document.createElement("div");
    miNodoCantidadItem.classList.add("col", "elementoEnElCarro", "text-center");
    miNodoCantidadItem.textContent = `x${value}`;

    const miNodoCarritoFoto = document.createElement("img");
    const botonAgregar = document.createElement("button");
    const botonRestar = document.createElement("button");
    productos.forEach((info) => {
      if (key == info.Nombre) {
        miNodoCarritoFoto.setAttribute("src", info.imagen);
        miNodoCarritoFoto.classList.add("fotosCarro");
        miNodoCantidadItem.setAttribute("id", info.Codigo);
        botonAgregar.setAttribute("id", info.Nombre);
        botonRestar.setAttribute("id", info.Nombre);
      }
    });

    //botones Agregar y restar

    botonAgregar.classList.add(
      "col-lg-10",
      "col-md-4",
      // "col-sm-2",
      "btn",
      "btn-danger",
      "estiloBoton"
    );
    botonAgregar.onclick = function () {
      addElement(this);
    };
    botonAgregar.textContent = "+";

    botonRestar.classList.add(
      "col-lg-10",
      "col-md-4",
      // "col-sm-2",
      "btn",
      "btn-danger",
      "estiloBoton"
    );
    botonRestar.onclick = function () {
      substractElement(this);
    };

    botonRestar.textContent = "-";

    miNodoCarrito.classList.add(
      "row",
      "justify-content-around",
      "align-items-center",
      "carritoDiv",
      "border"
    );

    miNodoBotones.appendChild(botonAgregar);
    miNodoBotones.appendChild(botonRestar);
    miNodoFullText.appendChild(miNodoNombreItem);
    miNodoFullText.appendChild(miNodoCantidadItem);
    miNodoCarrito.appendChild(miNodoCarritoFoto);
    miNodoCarrito.appendChild(miNodoFullText);
    miNodoCarrito.appendChild(miNodoBotones);

    if (elementosCarrito.hasChildNodes()) {
      if (document.getElementById(key)) {
        var nuevoDiv = document.getElementById(key);
        elementosCarrito.removeChild(nuevoDiv);
        elementosCarrito.appendChild(miNodoCarrito);
      } else if (document.getElementById("sinElementos")) {
        var nuevoDiv = document.getElementById("sinElementos");
        elementosCarrito.removeChild(nuevoDiv);
        elementosCarrito.appendChild(miNodoCarrito);
      } else {
        elementosCarrito.appendChild(miNodoCarrito);
      }
    } else {
      elementosCarrito.appendChild(miNodoCarrito);
    }
  });
}

function precioTotalFunc(preciosItems, database) {
  var precioCompra = 0;
  var productosTotal = 0;
  Object.entries(preciosItems).forEach((entry) => {
    const [key, value] = entry;
    database.forEach((info) => {
      if (key == info.Nombre) {
        precioCompra = precioCompra + info.Precio * value;
        productosTotal = productosTotal + value;
      }
    });
  });

  //boton vaciar carrito
  let botonVaciar = document.createElement("button");
  botonVaciar.setAttribute("id", "bVaciar");
  botonVaciar.setAttribute("onclick", "vaciarCarrito()");
  botonVaciar.classList.add("btn", "btn-warning");
  botonVaciar.textContent = "Vaciar Carrito";
  if (botonVaciarCarrito.hasChildNodes()) {
    var totalDiv = document.getElementById("bVaciar");
    botonVaciarCarrito.removeChild(totalDiv);
    botonVaciarCarrito.appendChild(botonVaciar);
  } else {
    botonVaciarCarrito.appendChild(botonVaciar);
  }

  let miNodoPrecioTotal = document.createElement("col");
  miNodoPrecioTotal.setAttribute("id", "totalCarrito");
  miNodoPrecioTotal.classList.add("text-center", "container-fluid");
  miNodoPrecioTotal.textContent = `Total = $ ${precioCompra}`;
  if (precioTotal.hasChildNodes()) {
    var totalDiv = document.getElementById("totalCarrito");
    precioTotal.removeChild(totalDiv);
    precioTotal.appendChild(miNodoPrecioTotal);
  } else {
    precioTotal.appendChild(miNodoPrecioTotal);
  }
  // carro N productos
  let miNodoTotalProductos = document.createElement("p");
  miNodoTotalProductos.setAttribute("id", "totalProductosActual");
  if (productosTotal == 1) {
    miNodoTotalProductos.textContent = `${productosTotal} producto`;
  } else {
    miNodoTotalProductos.textContent = `${productosTotal} productos`;
  }
  if (document.getElementById("0Elementos")) {
    var nuevoDiv = document.getElementById("0Elementos");
    totalProductos.removeChild(nuevoDiv);
    totalProductos.appendChild(miNodoTotalProductos);
  } else if (document.getElementById("totalProductosActual")) {
    var totalDiv = document.getElementById("totalProductosActual");
    totalProductos.removeChild(totalDiv);
    totalProductos.appendChild(miNodoTotalProductos);
  }
  //numero de productos al lado del carrito
  let miNodoElementosCarro = document.createElement("p");
  miNodoElementosCarro.setAttribute("id", "totalProductosActualCarro");
  miNodoElementosCarro.classList.add("mx-2");
  miNodoElementosCarro.textContent = `${productosTotal}`;
  if (document.getElementById("0ElementosCarro")) {
    var nuevoDiv = document.getElementById("0ElementosCarro");
    iconoCarrito.removeChild(nuevoDiv);
    iconoCarrito.appendChild(miNodoElementosCarro);
  } else if (document.getElementById("totalProductosActualCarro")) {
    var totalDiv = document.getElementById("totalProductosActualCarro");
    iconoCarrito.removeChild(totalDiv);
    iconoCarrito.appendChild(miNodoElementosCarro);
  }
}

function agregarCarrito(info) {
  if (info.Stock === "Si") {
    nombresItems.push(info.Nombre);
    var preciosItems = {};
    nombresItems.forEach((x) => {
      preciosItems[x] = (preciosItems[x] || 0) + 1;
    });
  } else alert("Este elemento no está disponible");

  crearElementosCarrito(preciosItems);
  precioTotalFunc(preciosItems, productos);
}

function crearProductos() {
  productos.forEach((info) => {
    // Estructura
    const miNodo = document.createElement("div");
    miNodo.classList.add("card", "col-lg-2", "col-md-4", "col-sm-6");
    // Body
    const miNodoCardBody = document.createElement("div");
    miNodoCardBody.classList.add("card-body");
    // Titulo
    const miNodoTitle = document.createElement("h5");
    miNodoTitle.classList.add("card-title");
    miNodoTitle.textContent = info.Nombre;
    // Imagen
    const miNodoImagen = document.createElement("img");
    miNodoImagen.classList.add("img-fluid");
    miNodoImagen.setAttribute("src", info.imagen);
    // Precio
    const miNodoPrecio = document.createElement("p");
    miNodoPrecio.classList.add("card-text");
    miNodoPrecio.textContent = `${divisa}${info.Precio}`;
    // Boton

    // al hacer click comienza la funcion
    var miNodoBoton;
    if (info.Stock == "Si") {
      var miNodoBoton = document.createElement("button");
      miNodoBoton.classList.add("btn", "btn-primary");
      miNodoBoton.textContent = "+";
      miNodoBoton.setAttribute("marcador", info.Codigo);
      // al hacer click comienza la funcion
      miNodoBoton.onclick = function () {
        agregarCarrito(info);
      };
    } else {
      var miNodoBoton = document.createElement("p");
      miNodoBoton.textContent = "No hay stock";
    }

    // Insertamos
    miNodoCardBody.appendChild(miNodoImagen);
    miNodoCardBody.appendChild(miNodoTitle);
    miNodoCardBody.appendChild(miNodoPrecio);
    miNodoCardBody.appendChild(miNodoBoton);
    miNodo.appendChild(miNodoCardBody);
    productosCarrito.appendChild(miNodo);
  });
}

crearProductos();

let tablaProductos = document.getElementById("tituloProductos");
// let footerProductos = document.getElementById("footerProductos");

$(document).ready(function () {
  Object.keys(productos[0]).forEach((key) => {
    // console.log(key, value);
    if (key != "imagen" && key != "descripcion") {
      const tableHeader = document.createElement("th");
      tableHeader.textContent = key;
      tablaProductos.appendChild(tableHeader);
    }
  });

  $("#tablaProductos").DataTable({
    data: productos,
    scrollX: true,

    columns: [
      { data: "Nombre" },
      { data: "Categoria" },
      { data: "Precio" },
      { data: "Codigo" },
      { data: "Stock" },
    ],
  });
});

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var modalCompra = document.getElementById("myModalCompra");
var btnCompra = document.getElementById("myBtnCompra");
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  if (modal.style.display == "block") {
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
  }
};

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function (event) {
  if (event.target == modal || event.target == modalCompra) {
    modal.style.display = "none";
    modalCompra.style.display = "none";
  }
});

btnCompra.onclick = function () {
  if (nombresItems.length > 0) {
    if (modalCompra.style.display == "block") {
      modalCompra.style.display = "none";
    } else {
      modalCompra.style.display = "block";
    }
  }
};

function colocarNombre() {
  let miStorage = localStorage.getItem("usuario");
  if (miStorage) {
    var paragraph = document.getElementById("nombreUsuario");
    var txt = document.createTextNode(`Bienvenido ${miStorage}`);
    paragraph.classList.add("nameStyle");
    paragraph.appendChild(txt);
  }
}
