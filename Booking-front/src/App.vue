<script setup>
import { ref } from 'vue';
import axios, { formToJSON } from 'axios';

const searchDocNumber = ref('');
const formData = ref({
  "fullname": "",
  "checkin_date": "2024-06-01",
  "checkout_date": "2024-06-10",
  "price": 0,
  "document_number": ""
});
const booking = ref(null);
const register = ref(null);
const isValid = ref(false);
const isLoading = ref(false);
const message = ref('');
const response = ref(null);
const validateInput = () => {
  const docNumberPattern = /^\d{10}$/;
  isValid.value = docNumberPattern.test(searchDocNumber.value);
};
const searchBooking = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/bookings/${searchDocNumber.value}`);
    booking.value = response.data;
  } catch (error) {
    
    console.error('Error al obtener la reserva:', error);
    booking.value = null;
  } finally {
      isLoading.value = false;
  }
};


const handleSubmit = async () => {
  try {
    const respons = await axios.post(`http://127.0.0.1:5000/generate`,{"message": message },{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(respons)
    response.value = respons.data.message._value;

  } catch (error) {
    console.error('Error al crear la reserva:', error);
  }
};
const submitForm = async () => {
  try {
    const response = await axios.post(`http://localhost:5000/book`,formData.value,{
      headers: {
        'Content-Type': 'application/json'
      }
      });
    register.value = response.data;
  } catch (error) {
    
    console.error('Error al crear la reserva:', error);
    register.value = null;
  }
};


</script>
<template>
<h1>Hotel Booking</h1>


    <form @submit.prevent="submitForm" >
        <label for="fullname">Full Name:</label>
        <input  v-model="formData.fullname" type="text" id="fullname" name="fullname" required>
        <br>
        <label for="checkin_date">Check-in Date:</label>
        <input v-model="formData.checkin_date" type="date" id="checkin_date" name="checkin_date" required>
        <br>
        <label for="checkout_date">Check-out Date:</label>
        <input v-model="formData.checkout_date"type="date" id="checkout_date" name="checkout_date" required>
        <br>
        <label for="price">Price:</label>
        <input v-model="formData.price"type="number" id="price" name="price" required step="0.01">
        <br>
        <label for="document_number">Document Number:</label>
        <input v-model="formData.document_number" type="text" id="document_number" name="document_number" required>
        <br>
        <button  type="submit">Book Now</button>
    </form>
    <form @submit.prevent="searchBooking">
      <label for="documentNumber">Document Number:</label>
      <input type="text" v-model="searchDocNumber" id="documentNumber" @input="validateInput" />
      <button type="submit" :disabled="!isValid">Search</button>
      <p v-if="!isValid && searchDocNumber.length > 0" style="color: red;">Document number must be exactly 10 digits.</p>
    </form>
    <div v-if="register"><h3>REGISTRO EXITOSO</h3></div>
    <div v-if="booking"  class="booking-details">
      <h2>Booking Details</h2>
      <p><strong>Fullname:</strong> {{ booking[1] }}</p>
      <p><strong>Check-in Date:</strong> {{ booking[2]}} </p>
      <p><strong>Check-out Date:</strong> {{ booking[3] }} </p>
      <p><strong>Price:</strong> {{ booking[4] }}</p>
      <p><strong>Document Number:</strong> {{ booking[5] }}</p>
    </div>
    <p v-if="!booking && searchDocNumber && !isLoading">Booking not found.</p>
    <div>
    <form @submit.prevent="handleSubmit">
      <label for="message">Mensaje:</label>
      <input type="text" id="message" v-model="message" required>
      <button type="submit">Enviar</button>
    </form>

    <div v-if="response" class="Responses">
      <p>Respuesta:</p>
      <p>{{ response }}</p>
    </div>
  </div>

</template>
<style scoped>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
}

h1 {
    color: #333;
}

form {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: auto;
    color:#000000;
}

form.label {
    color:#333;
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #000000;
    border-radius: 4px;
}

button {
    background-color: #007bff;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
.booking-details {
  color: white;

} 
.Responses{
  color: white;
}
</style>
