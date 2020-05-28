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
  