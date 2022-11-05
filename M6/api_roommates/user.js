const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
// const { data } = require('cheerio/lib/api/attributes');
const roommateFile = "roommates.json";

async function newRoommate() {
  const { data } = await axios.get("https://randomuser.me/api");
  const roommate = {
    id: uuidv4(),
    nombre: `${data.results[0].name.first} ${data.results[0].name.last}`,
    debe: 0,
    recibe: 0,
  };
  let roommates = [];
  if (fs.existsSync(roommateFile)) {
    toooloscabros = JSON.parse(fs.readFileSync(roommateFile));
    roommates = [...toooloscabros.roommates];
  }
  roommates.push(roommate);
  fs.writeFileSync(roommateFile, JSON.stringify({ roommates }));
}

function calcularGastos() {
  let { roommates } = JSON.parse(fs.readFileSync(roommateFile));
  const { gastos } = JSON.parse(fs.readFileSync("gastos.json"));

  roommates = roommates.map((r) => {
    r.debe = 0;
    r.recibe = 0;
    r.total = 0;
    return r;
  });

  gastos.forEach((g) => {
    roommates = roommates.map((r) => {
      const cuota = Number(g.monto / roommates.length);
      if (r.nombre == g.roommate) {
        r.recibe += cuota * (roommates.length - 1);
      } else {
        r.debe -= cuota;
      }
      r.total = r.recibe - r.debe;
      return r;
    });
  });
  fs.writeFileSync(roommateFile, JSON.stringify({ roommates }));
}

module.exports = {
  newRoommate,
  calcularGastos,
};
