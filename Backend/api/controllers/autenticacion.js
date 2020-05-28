//Importar servicio de postgres
const ServicioPg = require("../services/postgres");

// Importar jwt
const jwt = require("jsonwebtoken");
const SECRET_KEY =
  "0d1e64c507cade6ea0308c6bc80fd2cb0c7055625fe819876ef010b042d88ece5be757470e5ecae70902aad064ce0d0cf00bf23de0c052035965f6776349167f";
/**
 * Realizar autenticación de usuario en el sistema
 * @param {*} usuario Json del usuario
 */
let validarLogin = (usuario) => {
  if (!usuario) {
    throw {
      ok: false,
      mensaje: "La información del usuario es obligatoria.",
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
 * Consultar el usuario en el sistema con documento y clave
 * @param {*} usuario
 */
let consultarUsuario = async (usuario) => {
    let _servicio = new ServicioPg();
    let sql = `SELECT * FROM public.usuarios WHERE documento=$1 AND clave=($2)`;
    let valores = [usuario.documento, usuario.clave];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
    
    return respuesta;
  };

let generarToken = (usuario) => {
  delete usuario.clave;
  let token = jwt.sign(usuario, SECRET_KEY, { expiresIn: "8h" });
  return token;
};

let verificarToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = {
  validarLogin,
  consultarUsuario,
  generarToken,
  verificarToken,
};