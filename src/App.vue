<script setup>
import { reactive, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import axios from 'axios';
import List from './components/List.vue';
import Navbar from './components/Navbar.vue';

// const state = reactive({
//   data: [],
// });

// import data from './cities.json';
// state.data = data['cities']


// onMounted(async () => {
//   try {
//     const response = await axios.get('http://localhost:5000/cities');
//     state.data = response.data;
//     // state.dataFields = Object.keys(state.data[0]);
//     console.log('data = ', state.data)
//     // console.log('dataAPIFields = ', state.dataFields.length, state.dataFields)
//   } catch (error) {
//     console.error('Error fetching books', error);
//   }
// });

</script>

<template>
  <Navbar />
  <RouterView />
  <!-- <List /> -->
  <!-- <List :data="state.data"/> -->
</template>
