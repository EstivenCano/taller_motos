/**
 * Controlador de motos
 */

//Importar servicio de postgres
const ServicioPg = require('../services/postgres');
/**
 * Validar la información de la moto
 * @param {*} moto json de la aplicación
 */
let validarMantenimiento = (mantenimiento) => {
    if (!mantenimiento) {
        throw {
          ok: false,
          mensaje: "La información del mantenimiento es obligatoria.",
        };
      }
    
      if (!mantenimiento.id_mecanico) {
        throw { ok: false, mensaje: "El id del mecánico es obligatoria." };
      }
      if (!mantenimiento.placa) {
        throw { ok: false, mensaje: "La placa es obligatorio." };
      }
      if (!mantenimiento.fecha) {
        throw { ok: false, mensaje: "La fecha es obligatoria." };
      }
      if (!mantenimiento.trabajos_realizados) {
        throw { ok: false, mensaje: "Los trabajos realizados son obligatorios." };
      }
      if (!mantenimiento.horas_invertidas) {
        throw { ok: false, mensaje: "Las horas invertidas son obligatorias." };
      }
}

/**
 * Guardar un mantenimiento en la base de datos
 * @param {*} mantenimiento
 */
let guardarMantenimiento = async mantenimiento => {

  try {
    let servicio = new ServicioPg();
    let sql = `INSERT INTO public.mantenimientos(
        id_mecanico,placa,fecha ,trabajos_realizados,
        horas_invertidas)
        VALUES (
            '${mantenimiento.id_mecanico}',
            '${mantenimiento.placa}', 
            '${mantenimiento.fecha}', 
            '${mantenimiento.trabajos_realizados}', 
            '${mantenimiento.horas_invertidas}')`;
    let respuesta = await servicio.ejecutarSql(sql);
    return respuesta;
  } catch (error) {
    console.log("Error: ");

    console.log(error);
    throw {
      ok: false
    };

  }
};

/**
 * Método para consultar motos desde la base de datos
 */
let consultarMantenimientos = async (filtros) => {

  let servicio = new ServicioPg();
  //filtro 
  let _where = "";
  let llaves = Object.keys(filtros);
  if (llaves.length < 1) {

    let sql = `SELECT * FROM public.mantenimientos`
    let respuesta = await servicio.ejecutarSql(sql)
    return respuesta;
  } else {

    llaves.forEach((x, i) => {
      _where += `${x} = '${filtros[x]}'`;

      if (i < llaves.length - 1) _where += "AND";
    });

    let sql = `SELECT * FROM public.mantenimientos WHERE ${_where}`
    let respuesta = await servicio.ejecutarSql(sql)
    return respuesta;
  }

};

/**
 * Consultar moto según mecánico
 * @param {*} id_mecanico
 */
let consultarMantenimiento = async (id_mecanico) => {

    let servicio = new ServicioPg();
    let sql = `SELECT * FROM public.mantenimientos WHERE id_mecanico = '${id_mecanico}'`
    let respuesta = await servicio.ejecutarSql(sql)
    return respuesta;
  };

/**
 * Eliminar moto según el id_mecánico y placa
 * @param {*} id_mecanico 
 * @param {*} placa
 * 
 */
let eliminarMantenimiento = async (mantenimiento) => {
  
  let servicio = new ServicioPg();
  let sql = 'DELETE FROM mantenimientos WHERE placa = $1 AND id_mecanico = $2 AND fecha = $3;';
  let values = [mantenimiento.placa, mantenimiento.id_mecanico, mantenimiento.fecha];
  let respuesta = await servicio.ejecutarSql(sql, values)
  return respuesta;
};

/**
 * Método para modificar un mantenimiento
 * @param {*} id_mecanico
 * @param {*} placa 
 */
let modificarMantenimiento = async (mantenimiento) => {

  let servicio = new ServicioPg();
  let sql = `UPDATE  mantenimientos SET id_mecanico=$1, placa=$2, 
  fecha=$3, trabajos_realizados=$4, horas_invertidas=$5 WHERE placa = $6 AND 
  fecha = $7 AND id_mecanico =$8;`;
  let values = [
      mantenimiento.id_mecanico,
      mantenimiento.placa,
      mantenimiento.fecha,
      mantenimiento.trabajos_realizados,
      mantenimiento.horas_invertidas,
      mantenimiento.placaAnterior,
      mantenimiento.fechaAnterior,
      mantenimiento.id_mecanicoAnterior,
  ];
  let respuesta = await servicio.ejecutarSql(sql,values)
  return respuesta;
}


module.exports = {
    validarMantenimiento,   
    guardarMantenimiento,
    consultarMantenimientos,
    eliminarMantenimiento,
    consultarMantenimiento,
    modificarMantenimiento
};
  