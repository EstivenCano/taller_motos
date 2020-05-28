/**
 * CONTROLADOR DE USUARIO
 *
 */

//Importar servicio de postgres
const ServicioPg = require("../services/postgres");

/**
 * Validar la información de la usuario
 * @param {*} usuario Json de la usuario
 */
let validarUsuario = (usuario) => {
  if (!usuario) {
    throw {
      ok: false,
      mensaje: "La información de la usuario es obligatoria.",
    };
  }

  if (!usuario.documento) {
    throw { ok: false, mensaje: "El documento del usuario es obligatorio." };
  }
  if (!usuario.clave) {
    throw { ok: false, mensaje: "La clave del usuario es obligatoria." };
  }
};

/**
 * Guardar en base de datos una usuario
 * @param {*} usuario
 */
let guardarUsuario = async (usuario) => {
  let _servicio = new ServicioPg();
  let sql = `INSERT INTO public.usuarios(
              tipo_documento, documento, nombre, celular, correo, clave)
              VALUES ($1,$2,$3,$4,$5,md5($6));`;
  let valores = [
    usuario.tipo_documento,
    usuario.documento,
    usuario.nombre,
    usuario.apellidos,
    usuario.celular,
    usuario.correo,
    usuario.rol,
    usuario.clave,
  ];
  let respuesta = await _servicio.ejecutarSql(sql, valores);
  return respuesta;
};

/**
 * Consultar usuarios
 * @param {*} filtros
 */
let consultarUsuarios = async (filtros) => {
  let _servicio = new ServicioPg();
  // { tipo_documento: 'CC' }
  let _where = "";
  let llaves = Object.keys(filtros);
  llaves.forEach((x, i) => {
    _where += `${x}='${filtros[x]}'`;
    // _where += x + "=" + filtros[x];
    if (i < llaves.length - 1) _where += " AND ";
  });
  if (_where.length > 0) {
    _where = "WHERE " + _where;
  }

  let sql = `SELECT * FROM public.usuarios  ${_where}`;
  console.log(sql);

  let respuesta = await _servicio.ejecutarSql(sql);
  let resultado = respuesta.rows;

  eliminarInformacionSencible(resultado);
  return resultado;
};

/**
 * Eliminar datos que no necesita el cliente y que se necesitan consultar desde la base de datos
 * @param {*} usuarios
 */
let eliminarInformacionSencible = (usuarios) => {
  for (let index = 0; index < usuarios.length; index++) {
    const element = usuarios[index];
    delete element.clave;
  }
};

let consultarUsuario = async (usuario) => {
  let _servicio = new ServicioPg();
  let sql = `SELECT tipo_documento, documento, nombre, correo, celular 
  FROM public.usuarios WHERE documento= '${usuario.documento}' AND 
  clave = '${usuario.clave}';`;
  console.log("Hola");
  
  let respuesta = await _servicio.ejecutarSql(sql, [usuario.documento]);
  return respuesta;
};

let modificarUsuario = async (usuario, id) => {
  if (usuario.documento != id) {
    throw {
      ok: false,
      mensaje: "El documento de la usuario no correspende al enviado.",
    };
  }
  let _servicio = new ServicioPg();
  let sql = `UPDATE public.usuarios
  SET tipo_documento=$1,  nombre=$2, 
  celular=$3, correo=$4
  WHERE documento=$5;`;
  let valores = [
    usuario.tipo_documento,
    usuario.nombre,
    usuario.celular,
    usuario.correo,
    usuario.documento,
  ];
  let respuesta = await _servicio.ejecutarSql(sql, valores);
  return respuesta;
};

let eliminarUsuario = async (id) => {
  let _servicio = new ServicioPg();
  let sql = `DELETE FROM usuarios WHERE documento=$1`;
  let valores = [id];
  let respuesta = await _servicio.ejecutarSql(sql, valores);
  return respuesta;
};

module.exports = {
  validarUsuario,
  guardarUsuario,
  consultarUsuarios,
  eliminarUsuario,
  consultarUsuario,
  modificarUsuario,
};