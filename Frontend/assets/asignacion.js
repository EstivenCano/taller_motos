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
  
        datosFormulario(){
            this.form = {

                id_mecanico: document.getElementById('id_mecanico').value,
                placa: document.getElementById('placa').value,
                fecha: document.getElementById('fecha').value,
                trabajos_realizados: document.getElementById('trabajos_realizados').value,
                horas_invertidas: 0,
              }
        
              return this.form;
        },

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

      guardarAsignacion(){
        let url = 'http://localhost:3001/mantenimiento'
        this.$axios.post(url, this.datosFormulario()).then(respuesta => {
          //Recarga los marcadores de la base de datos.
          this.$swal.fire({
            title: "Asignación guardada",
            text: "La asignación fue guardada con éxito",
            type: "success",
            timer: 3000
          }).then(r => {
  
          });
          this.cargarLista();
  
        });
      },

      eliminarAsignacion({item}){
        let eliminar ={
            id_mecanico: item.id_mecanico,
            placa: item.placa,
            fecha: item.fecha
        }
        let url = `http://localhost:3001/mantenimiento`
      
        this.$swal.fire({
          title: "Precaución",
          text: "¿Desea eliminar la asignación?",
          showCancelButton: true,
          confirmButtonText: 'Si, Eliminar',
          cancelButtonText: 'No, Cancelar',
          reverseButtons: true
        }).then(r => {
          if (r.value) {
            this.$axios.delete(url, { data: eliminar  }).then(respuesta => {
              this.cargarLista();
            }).catch(error => {});
            this.$swal.fire({
              title: 'Eliminada!',
              text: 'La asignación ha sido eliminada correctamente.',
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
      limpiarLista(){
        this.form.id_mecanico = '';
        this.form.placa = '';
        this.form.fecha = '';
        this.form.trabajos_realizados = '';
        this.form.horas_invertidas = '';

        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },

      onSubmit(evt) {
        evt.preventDefault()
        this.guardarAsignacion();
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        // Trick to reset/clear native browser form validation state
        this.limpiarLista();
      }
    }
  }
  