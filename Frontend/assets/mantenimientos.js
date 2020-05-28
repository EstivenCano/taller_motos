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
          id_mecanico: '',
          placa: '',
          fecha: '',
          trabajos_realizados: '',
          horas_invertidas: ''
        },

        mantenimiento: {
            id_mecanico: '',
            placa: '',
            fecha: '',
            trabajos_realizados: '',
            horas_invertidas: ''
        },
        mantenimientos: [],

        fields: ["id_mecanico", "placa", "fecha", "trabajos_realizados", "horas_invertidas","acciones"],

        show: true,
      }
    },
    methods: {
  
      //Carga la lista de las motos desde la base de datos
      async cargarLista() {
        let url = 'http://localhost:3001/mantenimiento';
        this.loading = true;
        //Trae todos los marcadores desde la base de datos.
        this.$axios
          .get(url)
          .then(response => {
            //Asigna los marcadores al array de marcadores global para ser enlistados.
            this.mantenimientos = response.data.info;
          })
          .catch(error => {
            console.log(error);
          });
  
      },

      modificarMantenimiento({item}){
        this.form.id_mecanico = item.id_mecanico;
        this.form.placa = item.placa;
        this.form.fecha = item.fecha;
        this.form.trabajos_realizados = item.trabajos_realizados;
        this.form.horas_invertidas = item.horas_invertidas;
        this.item = item;
        this.enEdicion = true;
      },

      actualizarMantenimiento(){
        let actualizado = {
            id_mecanico: this.item.id_mecanico,
            placa: this.item.placa,
            fecha: this.item.fecha,
            trabajos_realizados: document.getElementById('trabajos_realizados').value,
            horas_invertidas: document.getElementById('horas_invertidas').value,
          }
          //Actualiza el elemento.
          let url = `http://localhost:3001/mantenimiento`
          this.$axios.put(url,actualizado).then(respuesta => {
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
  