<template>
  <div>
    <center>
      <h2 id="subtitle">
        Gestión de motos
      </h2>
    </center>
    <div>
      <b-card
        bg-variant="light"
        text-variant="dark"
        title="Ingresar moto"
        class="card"
      >
        <b-card-text>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="input-group-1" label="Placa:" label-for="input-1" v-if="!enEdicion">
              <b-form-input
                id="placa"
                v-model="form.placa"
                v-if="!enEdicion"
                required
                placeholder="Ingresa la placa"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Estado:"
              label-for="input-2"
            >
              <b-form-input
                id="estado"
                v-model="form.estado"
                required
                placeholder="Ingresa el estado de la moto"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Clase:" label-for="input-3">
              <b-form-input
                id="clase"
                v-model="form.clase"
                required
                placeholder="Ingresa la clase de la moto"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Marca:" label-for="input-4">
              <b-form-input
                id="marca"
                v-model="form.marca"
                required
                placeholder="Ingresa la marca de la moto"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-5"
              label="Modelo:"
              label-for="input-5"
            >
              <b-form-input
                id="modelo"
                v-model="form.modelo"
                required
                placeholder="Ingresa el modelo de la moto"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-6" label="Color:" label-for="input-6">
              <b-form-input
                id="color"
                v-model="form.color"
                required
                placeholder="Ingresa el color de la moto"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-7"
              label="Cilindraje:"
              label-for="input-7"
            >
              <b-form-input
                id="cilindraje"
                v-model="form.cilindraje"
                required
                placeholder="Ingresa el cilindraje de la moto"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-8"
              label="Documento del propietario:"
              label-for="input-8"
              v-if="!enEdicion"
            >
              <b-form-input
                id="id_propietario"
                v-model="form.id_propietario"
                v-if="!enEdicion"
                required
                placeholder="Ingresa el documento del propietario de la moto"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-9"
              label="Número de SOAT:"
              label-for="input-9"
            >
              <b-form-input
                id="nro_soat"
                v-model="form.nro_soat"
                required
                placeholder="Ingresa el número del SOAT de la moto"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-10"
              label="Vencimiento SOAT:"
              label-for="input-10"
            >
              <b-form-input
                id="vencimiento_soat"
                v-model="form.vencimiento_soat"
                required
                placeholder="Ingresa la fecha de vencimiento del SOAT de la moto"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-11"
              label="Número de tecnomecánica:"
              label-for="input-11"
            >
              <b-form-input
                id="nro_tecnomecanica"
                v-model="form.nro_tecnomecanica"
                required
                placeholder="Ingresa el número de tecnomecánica de la moto"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-12"
              label="Vencimiento tecnomecánica:"
              label-for="input-12"
            >
              <b-form-input
                id="vencimiento_tecnomecanica"
                v-model="form.vencimiento_tecnomecanica"
                required
                placeholder="Ingresa la fecha de vencimiento de la tecnomecánica de la moto"
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
              >Cancelar</b-button
            >
          </b-form>
        </b-card-text>
        <div>
          <b-table dark striped hover :items="motos" :fields="fields">
            <template v-slot:cell(acciones)="row">
              <!-- Botones para editar y eliminar aplicaciones de la lista -->
              <b-button
                size="sm"
                @click="modificarMoto(row)"
                class="mr-2"
                variant="warning"
                >Modificar</b-button
              >
              <b-button
                size="sm"
                @click="eliminarMoto(row)"
                class="mr-2"
                variant="danger"
                >Eliminar</b-button
              >
              <b-button
                size="sm"
                @click="asignarMantenimiento(row)"
                class="mr-2"
                variant="success"
                >Mantenimiento</b-button
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

<script src="@/assets/motos.js" />
