<template>
    <div>
      <h2>Enviar Mensaje</h2>
      <form @submit.prevent="submitMessage">
        <label for="message">Mensaje:</label>
        <input type="text" id="message" v-model="message" required>
        <button type="submit">Enviar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        message: ''
      };
    },
    methods: {
      submitMessage() {
        // Aquí puedes enviar la solicitud POST al backend con Axios u otra librería
        console.log('Mensaje enviado:', this.message);
        // Puedes resetear el formulario después de enviar el mensaje si es necesario
        this.message = '';
      }
    }
  };
  </script>
  