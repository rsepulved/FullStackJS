const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres123",
  database: "skatepark",
  port: 5432,
  //   max: 20, // set pool max size to 20
  //   idleTimeoutMillis: 5000, // close idle clients after 5 second
  //   connectionTimeoutMillis: 2000, // return an error after 2 second if connection could not be established
});

newUser = async (
  email,
  nombre,
  password,
  experiencia,
  especialidad,
  file_name
) => {
  const client = await pool.connect();
  try {
    const res = await client.query(`INSERT INTO public.skaters(
                    email,nombre,password,anos_experiencia,especialidad,foto,estado )
                    VALUES ('${email}','${nombre}', '${password}', ${experiencia},'${especialidad}', '${file_name}', 'false');`);
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
      `SELECT * FROM public.skaters
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

selectOne = async (email) => {
  // console.log(email);
  let response;
  const client = await pool.connect();
  try {
    const res = await client.query(
      `SELECT * FROM public.skaters where email='${email}';`
    );
    response = res.rows;
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.release();
  }
  return response;
};

editUser = async (id, estado) => {
  console.log(estado);
  const client = await pool.connect();
  try {
    const res = await client.query(
      `UPDATE public.skaters SET estado='${!estado}' WHERE id=${id}`
    );
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.release();
  }
};

editUserCompleto = async (usuario) => {
  // console.log(estado);
  const client = await pool.connect();
  try {
    const res = await client.query(
      `UPDATE public.skaters SET nombre='${usuario.nombre}',anos_experiencia='${usuario.experiencia}', password='${usuario.password}',especialidad='${usuario.especialidad}' WHERE email='${usuario.email}'`
    );
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.release();
  }
};

deleteUser = async (email) => {
  const client = await pool.connect();
  try {
    const res = await client.query(
      `DELETE FROM public.skaters
      WHERE email='${email}';`
    );
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.release();
  }
};

autentificar = async (email, password) => {
  let response;
  const client = await pool.connect();
  try {
    const res = await client.query(
      `SELECT * FROM public.skaters
                  where email='${email}' and password='${password}' ORDER BY id ASC;`
    );
    //   console.log(res.rows);
    response = res.rows;
    // console.log(response);
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
  autentificar,
  selectOne,
  editUserCompleto,
  deleteUser,
};
