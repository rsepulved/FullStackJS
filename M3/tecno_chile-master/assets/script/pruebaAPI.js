// const { data } = require("jquery");

const url = "https://jsonplaceholder.typicode.com/posts";

const getDatos = () => {
  return new Promise((resolve, reject) => {
    resolve(fetch(url).then((response) => response.json()));
    reject(err);
    console.log(err);
  });
};

async function fectchinData() {
  try {
    const listaUsuarios = [];
    const datosFetched = await getDatos();
    datosFetched.forEach((element) => {
      if (element.id < 21) {
        listaUsuarios.push(element);
      }
    });
    return listaUsuarios;
  } catch (err) {
    console.log(err);
  }
}

datosFetchedFinal = fectchinData();
console.log(datosFetchedFinal);
