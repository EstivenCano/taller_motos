<template>
  <div>
    <center>
      <h2 id="subtitle">
        Asignación de mantenimientos
      </h2>
    </center>
    <div>
      <b-card
        bg-variant="light"
        text-variant="dark"
        title="Asignación"
        class="card"
      >
        <b-card-text>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="input-group-1" label="Documento mecánico:" label-for="input-1">
              <b-form-input
                id="id_mecanico"
                v-model="form.id_mecanico"
                required
                placeholder="Ingresa documento"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Placa:"
              label-for="input-2"
            >
              <b-form-input
                id="placa"
                v-model="form.placa"
                required
                placeholder="Ingresa la placa de la moto"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Fecha:" label-for="input-3">
              <b-form-input
                id="fecha"
                v-model="form.fecha"
                required
                placeholder="Ingresa la fecha del mantenimiento"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Trabajo realizado:" label-for="input-4">
              <b-form-input
                id="trabajos_realizados"
                v-model="form.trabajos_realizados"
                required
                placeholder="Describe el trabajo realizado"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-5"
              label="Horas invertidas:"
              label-for="input-5"
            >
              <b-form-input
                id="horas_invertidas"
                v-model="form.horas_invertidas"
                required
                placeholder="Ingresa las horas invertidas en el mantenimiento"
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary" v-if="!enEdicion"
              >Agregar</b-button
            >
            <b-button type="reset" variant="danger" v-if="!enEdicion"
              >Limpiar</b-button
            >
            <b-button
              @click="actualizarMoto()"
              variant="primary"
              v-if="enEdicion"
              >Actualizar</b-button
            >
            <b-button
              @click="cancelarEdicion()"
              variant="danger"
              v-if="enEdicion"
              >Cencelar</b-button
            >
          </b-form>
        </b-card-text>
        <div>
          <b-table dark striped hover :items="mantenimientos" :fields="fields">
            <template v-slot:cell(acciones)="">
              <!-- Botones para editar y eliminar aplicaciones de la lista -->
              <b-button
                size="sm"
                class="mr-2"
                variant="warning"
                >Modificar</b-button
              >
              <b-button
                size="sm"
                class="mr-2"
                variant="danger"
                >Eliminar</b-button
              >
            </template>
          </b-table>
        </div>
      </b-card>
    </div>
  </div>
</template>

<style>
.card {
  margin-left: 50px;
  margin-right: 50px;
}

#subtitle {
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 70px;
  color: #526488;
  word-spacing: 5px;
}
</style>

<script src="@/assets/asignacion.js" />
