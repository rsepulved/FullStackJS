const express = require("express");
const app = express();
const { newRoommate, calcularGastos } = require("./user");
const { newGasto } = require("./gastos");
const fs = require("fs");
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.setHeader("Content-Type", "text/html");
    res.end(fs.readFileSync("index.html"));
  } catch (error) {
    console.log("Ayuda!!! algo fallo...");
  }
});

app.post("/roommate", async (req, res) => {
  try {
    await newRoommate();
    calcularGastos();
    res.end();
  } catch (error) {
    res.statusCode = 500;
    res.end();
  }
});
app.get("/roommates", (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    fs.readFile("roommates.json", (err, roommates) => {
      if (err) {
        res.statusCode = 500;
        res.end();
      } else {
        res.end(roommates);
      }
    });
  } catch (error) {}
});

app.post("/gasto", (req, res) => {
  try {
    newGasto(req.body);
    calcularGastos();
    res.end();
  } catch (error) {
    res.statusCode = 500;
    res.end();
  }
});

app.get("/gastos", (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    fs.readFile("gastos.json", (err, gastos) => {
      if (err) {
        res.statusCode = 500;
        res.end();
      } else {
        res.end(gastos);
      }
    });
  } catch (error) {}
});

app.put("/gasto", (req, res) => {
  try {
    var fullUrl = req.originalUrl;
    let id = fullUrl.split("=");

    const modificarGasto = (eliminar) => {
      res.setHeader("Content-Type", "application/json");
      fs.readFile("gastos.json", "utf-8", (err, gastos) => {
        const menu = gastos;
        const menuJSON = JSON.parse(menu);
        console.log(menuJSON);
        objIndex = menuJSON.gastos.findIndex((obj) => obj.id == eliminar);
        console.log(typeof req.body);
        console.log(req.body);
        menuJSON.gastos[objIndex].roommate = req.body.roommate;
        menuJSON.gastos[objIndex].descripcion = req.body.descripcion;
        menuJSON.gastos[objIndex].monto = req.body.monto;

        fs.writeFile("gastos.json", JSON.stringify(menuJSON), (err) => {
          if (err) {
            console.log(err);
          } else {
            res.end(calcularGastos());
          }
        });
      });
    };
    modificarGasto(id[1]);
  } catch (error) {
    res.statusCode = 500;
    res.end();
  }
});

app.delete("/gasto", (req, res) => {
  try {
    var fullUrl = req.originalUrl;
    let id = fullUrl.split("=");

    const quitarGasto = (eliminar) => {
      res.setHeader("Content-Type", "application/json");
      fs.readFile("gastos.json", "utf-8", (err, gastos) => {
        const menu = gastos;
        const menuJSON = JSON.parse(menu);
        var menuFiltrado = {};
        menuFiltrado.gastos = menuJSON.gastos.filter((e) => e.id !== eliminar);
        fs.writeFile("gastos.json", JSON.stringify(menuFiltrado), (err) => {
          if (err) {
            res.statusCode = 500;
            res.end();
          } else {
            res.end(calcularGastos());
          }
        });
      });
    };
    quitarGasto(id[1]);
  } catch (error) {
    res.statusCode = 500;
    res.end();
  }
});

app.listen(port, () => {
  console.log(`server funcionaaa de panaa en el puerto: ${port}`);
});