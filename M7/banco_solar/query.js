const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres123",
  database: "bancosolar",
  port: 5432,
  //   max: 20, // set pool max size to 20
  //   idleTimeoutMillis: 5000, // close idle clients after 5 second
  //   connectionTimeoutMillis: 2000, // return an error after 2 second if connection could not be established
});

newUser = async (nombre, balance) => {
  const client = await pool.connect();
  try {
    const res = await client.query(`INSERT INTO public.usuarios(
                    nombre, balance)
                    VALUES ('${nombre}', ${balance});`);
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.release();
  }
};

selectAll = async () => {
  let response;
  const client = await pool.connect();
  try {
    const res = await client.query(
      `SELECT * FROM public.usuarios
                ORDER BY id ASC;`
    );
    //   console.log(res.rows);
    response = res.rows;
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.release();
  }
  return response;
};
//   console.log(resultado);
//   return resultado;

editUser = async (id, name, balance) => {
  const client = await pool.connect();
  try {
    const res = await client.query(
      `UPDATE public.usuarios SET nombre='${name}', balance=${balance} WHERE id=${id}`
    );
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.release();
  }
};

deleteUser = async (id) => {
  const client = await pool.connect();
  try {
    const eliminar_transacciones = await client.query(
      `DELETE FROM public.transferencias
      WHERE emisor=${id} or receptor=${id};`
    );

    const res = await client.query(
      `DELETE FROM public.usuarios
      WHERE id=${id};`
    );
    await client.query("commit");
  } catch (err) {
    await client.query("rollback");
    console.log(err.stack);
  } finally {
    client.release();
  }
};

realizarTransaccion = async (emisor, receptor, monto) => {
  const fecha = new Date();
  const hoy = `${fecha.getDate()}-${
    fecha.getMonth() + 1
  }-${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
  const client = await pool.connect();
  try {
    const emisor_data = await client.query(
      `select id from public.usuarios where nombre = '${emisor}' `
    );
    const emisor_id = emisor_data.rows[0].id;
    const receptor_data = await client.query(
      `select id from public.usuarios where nombre = '${receptor}' `
    );
    const receptor_id = receptor_data.rows[0].id;
    const descontar = await client.query(
      `update public.usuarios set balance = balance - ${monto} where nombre = '${emisor}';`
    );

    const acreditar = client.query(
      `update public.usuarios set balance = balance + ${monto} where nombre = '${receptor}';`
    );
    const transferencia = client.query(`INSERT INTO public.transferencias(
        emisor, receptor, monto, fecha)
        VALUES (${emisor_id}, ${receptor_id}, ${monto}, '${hoy}');`);
    await client.query("commit");
  } catch (error) {
    await client.query("rollback");
    console.log("Error de codigo: " + error.code);
    console.log("Detalle del error: " + error.detail);
    console.log("Tabla originaria del error: " + error.table);
    console.log("Restriccion violada en el campo: " + error.constrain);
  } finally {
    client.release();
  }
};

historialTransferencias = async () => {
  let response;
  const client = await pool.connect();
  try {
    const res = await client.query(
      `SELECT u.nombre emisor,j.nombre receptor, t.monto, t.fecha
      FROM public.transferencias t
      LEFT JOIN public.usuarios u ON u.id = t.emisor
      LEFT JOIN public.usuarios j ON j.id = t.receptor;`
    );
    response = res.rows;
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.release();
  }

  return response;
};

module.exports = {
  newUser,
  selectAll,
  editUser,
  realizarTransaccion,
  historialTransferencias,
};
