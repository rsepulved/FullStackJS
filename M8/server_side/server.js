const express = require("express");
const app = express();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const puerto = 3001;
const {
  newUser,
  selectAll,
  editUser,
  autentificar,
  selectOne,
  editUserCompleto,
  deleteUser,
} = require("./query");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const secretKey = "Llave Secreta";

app.use(express.json());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(
  fileUpload({
    defCharset: "utf-8",
    defParamCharset: "utf-8",
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: "El tamaño es mayor que el máximo de 5MB",
  })
);

app.use(cors());

app.get("/css/", (req, res) => {
  try {
    res.sendFile(__dirname + "/estilos.css");
  } catch (error) {
    console.log("Algo salio mal");
  }
});

app.get("/", (req, res) => {
  try {
    res.setHeader("Content-Type", "text/html");
    res.status(200).end(fs.readFileSync("index.html"));
  } catch (error) {
    console.log("Algo salio mal");
  }
});

app.get("/admin", (req, res) => {
  try {
    res.setHeader("Content-Type", "text/html");
    res.status(200).end(fs.readFileSync("Admin.html"));
  } catch (error) {
    console.log("Algo salio mal");
  }
});

app.get("/registro", (req, res) => {
  try {
    res.setHeader("Content-Type", "text/html");
    res.status(200).end(fs.readFileSync("Registro.html"));
  } catch (error) {
    console.log("Algo salio mal");
  }
});

app.post("/participante", async (req, res) => {
  res.setHeader("Content-Type", "text/html", "charset=utf-8");
  const file = req.files.foto;
  const file_name = req.files.foto.name;
  const allowedExtension = [".png", ".jpg", ".jpeg"];
  try {
    let {
      email,
      nombre,
      password,
      passwordrepeat,
      experiencia,
      especialidad,
      foto,
    } = req.body;

    if (password == passwordrepeat) {
      req.files.foto.mv(`./imgs/${file_name}`, (err) => {
        if (err) {
          console.log(err);
          res.status(500);
        } else {
          console.log("Imagen cargada correctamente");
        }
      });
      await newUser(
        email,
        nombre,
        password,
        experiencia,
        especialidad,
        file_name
      );
      res.status(200).redirect(`http://localhost:3000`);
    } else {
      console.log("Las contraseñas no coinciden");
      res.send("Las contraseñas no coinciden");
    }
  } catch (error) {
    console.log("Algo salio mal");
    console.log(error);
  }
});

app.get("/participantes", async (req, res) => {
  try {
    let response = await selectAll();
    res.status(200).send(response);
  } catch (error) {
    res.status(400);
    res.end();
  }
});

app.get("/imgs/:imagenes", (req, res) => {
  try {
    let fileName = req.params.imagenes;
    let file = __dirname + `/imgs/${fileName}`;
    if (fs.existsSync(file)) {
      res.sendFile(`${file}`);
    } else {
      res.end();
    }
  } catch (error) {
    console.log("Algo salio mal get");
  }
});

app.put("/participante", async (req, res) => {
  try {
    let { id, aceptado } = await req.body;
    // console.log(aceptado);
    if (aceptado) {
      console.log("El participante paso a estar en revision");
    } else {
      console.log("El participante ha sido aceptado");
    }
    await editUser(id, aceptado);
    res.status(200).end();
    // await editUser(id, aceptado);
    // res.end();
  } catch (error) {
    res.status(400);
    res.end();
  }
});

app.get("/login", (req, res) => {
  try {
    res.setHeader("Content-Type", "text/html");
    res.status(200).end(fs.readFileSync("login.html"));
  } catch (error) {
    console.log("Algo salio mal");
  }
});

app.post("/aut/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    let response = await autentificar(email, password);
    if (response.length > 0) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 120,
          data: `${email}`,
        },
        secretKey
      );
      // console.log(token);
      res.status(200).json({ mytoken: token });
    } else {
      res.status(200).send("usuario o contraseña incorrectos");
    }
  } catch (error) {
    res.status(400);
    res.end();
  }
});

app.put("/aut/edit", async (req, res) => {
  try {
    let data = req.body;
    console.log(data);
    let response = await editUserCompleto(data);

    res.send(200).end();
  } catch (error) {
    console.log(error);
    res.status(400);
    res.end();
  }
});

app.delete("/aut/delete", async (req, res) => {
  try {
    let data = req.body;
    console.log(data);
    let response = await deleteUser(data.email);
    res.send(200).end();
  } catch (error) {
    console.log(error);
    res.status(400);
    res.end();
  }
});

app.get("/datos/:usuario", async (req, res) => {
  try {
    let usuario = req.params.usuario;

    let response = await selectOne(usuario);
    res.send(response);
  } catch (error) {
    console.log("Algo salio mal get");
  }
});

app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
