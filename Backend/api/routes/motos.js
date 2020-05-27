const express = require("express");
const router = express.Router();

const {
    validarMoto,   
    guardarMoto,
    consultarMotos,
    eliminarMoto,
    consultarMoto,
    modificarMoto 
} = require("../controllers/motos");


/**
 * Obtener todos las aplicaciones
 */
router.get("/moto", (req, res) => {

    let filtros = req.query;
  
    consultarMotos(filtros).then(respuestaDB => {
      let registros = respuestaDB.rows;
      res.send({
        ok: true,
        info: registros,
        mensaje: 'Motos consultadas.'
      });
    }).catch(error => {
        console.log(error);
        
      res.send(error);
    });
  });

  router.post("/moto", (req, res) => {

    try {
      //Capturar el body desde la solicitud
      let info_moto = req.body;
      //Validar la informacion, si hay un error se envia al catch
      console.log(info_moto);
      validarMoto(info_moto);
  
      //Guardar la aplicación en base de datos
      guardarMoto(info_moto).then(respuestaDB => {
        res.send({
          ok: true,
          mensaje: "Moto guardada.",
          info: info_moto
        });
      }).catch(error => {
        res.send(error);
      })
  
      //Responder 
  
    } catch (error) {
      res.send(error);
    }
  
  });

/**
 * Eliminar una moto según su placa
 */
router.delete("/moto/:placa", (req, res) => {
  
  let placa = req.params.placa;
  eliminarMoto(placa).then(respuestaDB => {
    res.send({
      ok: true,
      info: {},
      mensaje: 'Moto eliminada.'
    });
  }).catch(error => {
    res.send(error);
  });
});

/**
 * Consultar moto específica por placa
 */
router.get("/moto/:placa", (req, res) => {
  let placa = req.params.placa;
  consultarMoto(placa).then(respuestaDB => {
    let registros = respuestaDB.rows;
    let mensaje = registros.length > 0 ? 'Moto consultada.' : 'Sin registro.';
    res.send({
      ok: true,
      info: registros, 
      mensaje: mensaje
    });
  }).catch(error => {
    res.send(error);
  });
});

/**
 * Modificar moto según su placa
 */
router.put("/moto/:placa",(req,res) =>{
  //Capturar el parámetro de la ruta
  let placa = req.params.placa;

  let moto = req.body;
  
  modificarMoto(moto,placa).then(respuestaDB => {
    res.send({ok:true , mensaje: "Moto modificada", info: respuestaDB})
  }).catch(error => {
    res.send({ok:false , mensaje: "No se pudo modificar la moto", info: error})
  })
});


module.exports = router;