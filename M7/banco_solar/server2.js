const express = require("express");
const app = express();
// const { newRoommate, calcularGastos } = require("./user");
// const { newUser, selectAll } = require("./query");
const fs = require("fs");
const port = 3000;
const { Pool } = require("pg");
const {
  newUser,
  selectAll,
  editUser,
  realizarTransaccion,
  historialTransferencias,
} = require("./query");

// Pool.on("error", (err, client) => {
//   console.error("Unexpected error on idle client", err);
//   process.exit(-1);
// });

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Alpha87a",
  database: "bancosolar",
  port: 5432,
});

app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.setHeader("Content-Type", "text/html");
    res.status(200);
    res.end(fs.readFileSync("index.html"));
  } catch (error) {
    console.log("Ayuda!!! algo fallo...");
    res.status(400);
  }
});

app.post("/usuario", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json;charset=UTF-8");
    let { nombre, balance } = req.body;
    await newUser(nombre, balance);
    let response = await selectAll();
    res.send(response);
  } catch (error) {
    res.status(400);
    res.end();
  }
});

app.get("/usuarios", async (req, res) => {
  try {
    let response = await selectAll();
    res.status(200).send(response);
  } catch (error) {
    res.status(400);
    res.end();
  }
});

app.put("/usuario", async (req, res) => {
  try {
    let id = req.url.split("=")[1] * 1;
    let { name, balance } = req.body;
    await editUser(id, name, balance);
    let response = await selectAll();
    res.status(200).send(response);
  } catch (error) {
    res.status(400);
    res.end();
  }
});

app.delete("/usuario", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json;charset=UTF-8");
    let id = req.url.split("=")[1] * 1;
    await deleteUser(id);
    let response = await selectAll();
    res.status(200).send(response);
  } catch (error) {
    res.status(400);
    res.end();
  }
});

app.post("/transferencia", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json;charset=UTF-8");
    let { emisor, receptor, monto } = req.body;
    if (monto > 0 && emisor != receptor) {
      await realizarTransaccion(emisor, receptor, monto);
      let response = await selectAll();
      res.status(200).send(response);
      res.end();
    } else {
      console.log(
        "No se pueden hacer transferencias de $0 o menos y emisor/receptor deben ser distintos"
      );
      res.status(400);
      res.end();
    }
  } catch (error) {
    res.status(400);
    res.end();
  }
});

app.get("/transferencias", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json;charset=UTF-8");
    let response = await historialTransferencias();
    res.send(JSON.stringify(response));
  } catch (error) {
    res.status(400);
    res.end();
  }
});

app.listen(port, () => {
  console.log(`server funcionaaa de panaa en el puerto: ${port}`);
});
