/**
 * Controlador de motos
 */

//Importar servicio de postgres
const ServicioPg = require('../services/postgres');
/**
 * Validar la información de la moto
 * @param {*} moto json de la aplicación
 */
let validarMoto = (moto) => {
  if (!moto) {
    throw {
      ok: false,
      mensaje: "La información de la moto es obligatoria"
    };
  };
 
}

/**
 * Guardar moto en la base de datos
 * @param {*} moto 
 */
let guardarMoto = async moto => {

  try {
    let servicio = new ServicioPg();
    let sql = `INSERT INTO public.motos(
        placa,estado,clase,marca,modelo,color,cilindraje,id_propietario,
        nro_soat,vencimiento_soat, nro_tecnomecanica, vencimiento_tecnomecanica)
        VALUES (
            '${moto.placa}', 
            '${moto.estado}', 
            '${moto.clase}', 
            '${moto.marca}',
            '${moto.modelo}',
            '${moto.color}',
            '${moto.cilindraje}',
            '${moto.id_propietario}',
            '${moto.nro_soat}',
            '${moto.vencimiento_soat}',
            '${moto.nro_tecnomecanica}',
            '${moto.vencimiento_tecnomecanica}')`;
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
let consultarMotos = async (filtros) => {

  let servicio = new ServicioPg();
  //filtro 
  let _where = "";
  let llaves = Object.keys(filtros);
  if (llaves.length < 1) {

    let sql = `SELECT * FROM public.motos`
    let respuesta = await servicio.ejecutarSql(sql)
    return respuesta;
  } else {

    llaves.forEach((x, i) => {
      _where += `${x} = '${filtros[x]}'`;

      if (i < llaves.length - 1) _where += "AND";
    });

    let sql = `SELECT * FROM public.motos WHERE ${_where}`
    let respuesta = await servicio.ejecutarSql(sql)
    return respuesta;
  }

};

/**
 * Consultar moto según Placa
 * @param {*} placa
 */
let consultarMoto = async (placa) => {

    let servicio = new ServicioPg();
    let sql = `SELECT * FROM public.motos WHERE placa = '${placa}'`
    let respuesta = await servicio.ejecutarSql(sql)
    return respuesta;
  };

/**
 * Eliminar moto según la placa
 * @param {*} placa
 */
let eliminarMoto = async (placa) => {

  let servicio = new ServicioPg();
  let sql = `DELETE FROM public.motos WHERE placa ='${placa}' `
  let respuesta = await servicio.ejecutarSql(sql)
  return respuesta;
};

/**
 * Método para modificar una moto
 * @param {*} moto
 * @param {*} placa 
 */
let modificarMoto = async (moto, placa) => {

  if (moto.placa != placa) {
    throw {
      ok: false,
      mensaje: "La placa de la moto no corresponde al enviado",
    }
  }
  let servicio = new ServicioPg();
  let sql = `UPDATE public.motos SET estado='${moto.estado}', 
   clase='${moto.clase}', 
   marca='${moto.marca}', 
   modelo='${moto.modelo}',
   color='${moto.color}', 
   cilindraje = '${moto.cilindraje}',
   id_propietario='${moto.color}',
   nro_soat='${moto.nro_soat}',
   vencimiento_soat='${moto.vencimiento_soat}',
   nro_tecnomecanica='${moto.nro_tecnomecanica}',
   vencimiento_tecnomecanica='${moto.vencimiento_tecnomecanica}'
   WHERE placa='${moto.placa}'; `;
  let respuesta = await servicio.ejecutarSql(sql)
  return respuesta;
}


module.exports = {
    validarMoto,   
    guardarMoto,
    consultarMotos,
    eliminarMoto,
    consultarMoto,
    modificarMoto 
};
  