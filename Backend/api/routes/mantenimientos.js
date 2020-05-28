const express = require("express");
const router = express.Router();

const {
    validarMantenimiento,   
    guardarMantenimiento,
    consultarMantenimientos,
    eliminarMantenimiento,
    consultarMantenimiento,
    modificarMantenimiento
} = require("../controllers/mantenimientos");


/**
 * Obtener todos los mantenimientos
 */
router.get("/mantenimiento", (req, res) => {

    let filtros = req.query;
  
    consultarMantenimientos(filtros).then(respuestaDB => {
      let registros = respuestaDB.rows;
      res.send({
        ok: true,
        info: registros,
        mensaje: 'Mantenimientos consultados.'
      });
    }).catch(error => {
        console.log(error);
        
      res.send(error);
    });
  });

  router.post("/mantenimiento", (req, res) => {

    try {
      //Capturar el body desde la solicitud
      let info_mantenimiento = req.body;
      //Validar la informacion, si hay un error se envia al catch
      console.log(info_mantenimiento);
      //validarMantenimiento(info_mantenimiento);
  
      //Guardar la aplicación en base de datos
      guardarMantenimiento(info_mantenimiento).then(respuestaDB => {
        res.send({
          ok: true,
          mensaje: "Mantenimiento guardado.",
          info: info_mantenimiento
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
 * Eliminar un mantenimiento según su placa y id_mecanico
 */
router.delete("/mantenimiento", (req, res) => {
  console.log(req.body);
  
  let mantenimiento = req.body;
   
  eliminarMantenimiento(mantenimiento).then(respuestaDB => {
    res.send({
      ok: true,
      info: {},
      mensaje: 'Mantenimiento eliminado.'
    });
  }).catch(error => {
    res.send(error);
  });
});

/**
 * Consultar mantenimiento específico por id_mecanico
 */
router.get("/mantenimiento/:id_mecanico", (req, res) => {
  let id_mecanico = req.params.id_mecanico;
  consultarMantenimiento(id_mecanico).then(respuestaDB => {
    let registros = respuestaDB.rows;
    let mensaje = registros.length > 0 ? 'Mantenimiento consultado.' : 'Sin registro.';
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
 * Modificar mantenimientos según su placa y id_mecanico
 */
router.put("/mantenimiento",(req,res) =>{
  //Capturar el parámetro de la ruta
  let mantenimiento = req.body;
  modificarMantenimiento(mantenimiento).then(respuestaDB => {
    res.send({ok:true , mensaje: "Mantenimiento modificado", info: respuestaDB})
  }).catch(error => {
    res.send({ok:false , mensaje: "No se pudo modificar el mantenimiento", info: error})
  })
});


module.exports = router;