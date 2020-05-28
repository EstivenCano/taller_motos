export default {
  beforeMount() {
    //Carga las motos antes de ser llamadas por la página.
    this.cargarLista();
  },
  data() {
    return {

      /*Determina si la moto se encuentra en estado de edición*/
      enEdicion: false,

      item: {},

      form: {
        placa: '',
        estado: '',
        clase: '',
        marca: '',
        modelo: '',
        color: '',
        cilindraje: '',
        id_propietario: '',
        nro_soat: '',
        vencimiento_soat: '',
        nro_tecnomecanica: '',
        vencimiento_tecnomecanica: ''
      },
      moto: {
        placa: '',
        estado: '',
        clase: '',
        marca: '',
        modelo: '',
        color: '',
        cilindraje: '',
        id_propietario: '',
        nro_soat: '',
        vencimiento_soat: '',
        nro_tecnomecanica: '',
        vencimiento_tecnomecanica: '',
      },
      motos: [],
      fields: ["placa", "estado", "clase", "marca", "modelo", "color", "cilindraje", "acciones"],
      show: true,
    }
  },
  methods: {

    //Carga la lista de las motos desde la base de datos
    async cargarLista() {
      let url = 'http://localhost:3001/moto';
      this.loading = true;
      //Trae todos los marcadores desde la base de datos.
      this.$axios
        .get(url)
        .then(response => {
          //Asigna los marcadores al array de marcadores global para ser enlistados.
          this.motos = response.data.info;
        })
        .catch(error => {
          console.log(error);
        });

    },

    //Toma los datos del formulario.
    datosFormulario() {

      this.form = {

        placa: document.getElementById('placa').value,
        estado: document.getElementById('estado').value,
        clase: document.getElementById('clase').value,
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value,
        color: document.getElementById('color').value,
        cilindraje: document.getElementById('cilindraje').value,
        id_propietario: document.getElementById('id_propietario').value,
        nro_soat: document.getElementById('nro_soat').value,
        vencimiento_soat: document.getElementById('vencimiento_soat').value,
        nro_tecnomecanica: document.getElementById('nro_tecnomecanica').value,
        vencimiento_tecnomecanica: document.getElementById('vencimiento_tecnomecanica').value
      }

      return this.form;
    },


    modificarMoto({
      item
    }) {
      this.form.placa = item.placa;
      this.form.estado = item.estado;
      this.form.clase = item.clase;
      this.form.marca = item.marca;
      this.form.modelo = item.modelo;
      this.form.color = item.color;
      this.form.cilindraje = item.cilindraje;
      this.form.id_propietario = item.id_propietario;
      this.form.nro_soat = item.nro_soat;
      this.form.vencimiento_soat = item.vencimiento_soat;
      this.form.nro_tecnomecanica = item.nro_tecnomecanica;
      this.form.vencimiento_tecnomecanica = item.vencimiento_tecnomecanica;
      this.enEdicion = true;
      this.item = item
    },

    actualizarMoto() {
      //Elemento que será el body enviado en el put
      let actualizado = {
        placa: this.item.placa,
        estado: document.getElementById('estado').value,
        clase: document.getElementById('clase').value,
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value,
        color: document.getElementById('color').value,
        cilindraje: document.getElementById('cilindraje').value,
        id_propietario: document.getElementById('id_propietario').value,
        nro_soat: document.getElementById('nro_soat').value,
        vencimiento_soat: document.getElementById('vencimiento_soat').value,
        nro_tecnomecanica: document.getElementById('nro_tecnomecanica').value,
        vencimiento_tecnomecanica: document.getElementById('vencimiento_tecnomecanica').value

      }
      //Actualiza el elemento con la placa ingresado en la url.
      let url = `http://localhost:3001/moto/${this.item.placa}`
      this.$axios.put(url, actualizado).then(respuesta => {
        //Alerta de éxito.
        this.$swal.fire({
          title: 'Actualizada!',
          text: 'La moto ha sido actualizada correctamente.',
          type: 'success',
          timer: 3000
        })
        //Reestablece el objeto.
        //this.item = {};
        //Cambia el estado de edición, y con ello la visibilidad del botón. 
        this.enEdicion = false;
        this.cargarLista();
        //this.cancelarEdicion();
      }).catch(error => {
        //Alerta de error.
        this.$swal.fire({
          title: 'Error',
          text: 'No pudo actualizarse la aplicación',
          type: 'error',
          timer: 3000
        })
        console.log(error);

        this.item = {};
        this.enEdicion = false;
      });
    },

    eliminarMoto({
      item
    }) {
      let url = `http://localhost:3001/moto/${item.placa}`

      this.$swal.fire({
        title: "Precaución",
        text: "¿Desea eliminar la MOTO?",
        showCancelButton: true,
        confirmButtonText: 'Si, Eliminar',
        cancelButtonText: 'No, Cancelar',
        reverseButtons: true
      }).then(r => {
        if (r.value) {
          this.$axios.delete(url, this.datosFormulario()).then(respuesta => {
            this.cargarLista();
          }).catch(error => {});
          this.$swal.fire({
            title: 'Eliminada!',
            text: 'La moto ha sido eliminada correctamente.',
            type: 'success',
            timer: 3000
          })
        } else {
          this.$swal.fire({
            title: 'Cancelada',
            text: 'La operación ha sido cancelada',
            type: 'error',
            timer: 3000
          })
        }
      });
    },

    asignarMantenimiento() {
        this.$router.push('mantenimientos');
    },

    guardarMoto() {
      let url = 'http://localhost:3001/moto'
      this.$axios.post(url, this.datosFormulario()).then(respuesta => {
        //Recarga los marcadores de la base de datos.
        this.$swal.fire({
          title: "Moto guardada",
          text: "La moto fue guardada con éxito",
          type: "success",
          timer: 3000
        }).then(r => {

        });
        this.cargarLista();

      });
    },

    //Cancela la edición de la aplicación.
    cancelarEdicion() {

      this.limpiarLista();
      this.enEdicion = false

    },
    limpiarLista() {
      this.form.placa = "",
        this.form.estado = "",
        this.form.clase = "",
        this.form.marca = "",
        this.form.modelo = "",
        this.form.color = "",
        this.form.cilindraje = "",
        this.form.id_propietario = "",
        this.form.nro_soat = "",
        this.form.vencimiento_soat = "",
        this.form.nro_tecnomecanica = "",
        this.form.vencimiento_tecnomecanica = ""
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    onSubmit(evt) {
      evt.preventDefault()
      this.guardarMoto()
      //alert(JSON.stringify(this.form))
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      // Trick to reset/clear native browser form validation state
      this.limpiarLista();
    }
  }
}
