<script setup>
import router from '@/router';
import {onMounted, reactive} from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const itemId = route.params.id;

const form = reactive({
  id: '',
  name: '',
  country: '',
  established: '',
  area: '',
  population: '',
  isCapital: false,
})

const state = reactive({
  item: {},
  isLoading: true,
})

const handleSubmit = async () => {
  const updatedItem = {
    id: form.id,
    name: form.name,
    country: form.country,
    established: form.established,
    area: form.area,
    population: form.population,
    isCapital: form.isCapital,
  };

  try {
    const response = await axios.put(`http://localhost:5000/cities/${itemId}`, updatedItem);
    router.push(`/items/${response.data.id}`);
  } catch (error) {
    console.error('Error updating item', error);
  };
};


onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:5000/cities/${itemId}`);
    state.item = response.data;
    form.id = state.item.id;
    form.name = state.item.name;
    form.country = state.item.country;
    form.established = state.item.established;
    form.area = state.item.area;
    form.population = state.item.population;
    form.isCapital = state.item.isCapital;
  } catch (error) {
    console.error('Error fetching item', error);
  } finally {
    state.isLoading = false;
  }
})

const formLabelStyle = "mx-1 block text-xs font-bold text-gray-400";
const formInputStyle = "border-b-2 text-base font-medium w-full py-1 px-1 mb-2 focus:outline-none focus:border-indigo-300 cursor-pointer";

const formLabelCheckboxStyle = "ml-3 text-base font-semibold text-gray-400 cursor-pointer"
const formInputCheckboxStyle = "ml-1 w-4 h-4 cursor-pointer"

</script>

<template>
  
  <section class="bg-white">
  <div class="container m-auto max-w-sm py-5">
  <div class="bg-white drop-shadow-lg rounded-lg overflow-hidden md:m-0">

    <header class="py-2 bg-lime-500 text-white text-base font-semibold text-center">
      Edit item
      <div class="absolute top-2 left-4">
        <RouterLink
          :to="`/items/${state.item.id}`"
          class="hover:text-indigo-500">
          <i class="pi pi-arrow-circle-left"></i>
        </RouterLink>
      </div>
    </header>
    
    <form @submit.prevent="handleSubmit" class="mx-0 mt-3">
      
      <div class="mx-5 mb-2">
        <label :class=formLabelStyle>Id</label>
        <input
          type="text"
          v-model="form.id"
          id="id"
          name="id"
          :class=formInputStyle
          placeholder=""
          required
        />
      </div>

      <div class="mx-5 mb-2">
        <label :class=formLabelStyle>Name</label>
        <input
          type="text"
          v-model="form.name"
          id="name"
          name="name"
          :class=formInputStyle
          placeholder=""
          required
        />
      </div>

      <div class="mx-5 mb-2">
        <label :class=formLabelStyle>Country</label>
        <input
          type="text"
          v-model="form.country"
          id="country"
          name="country"
          :class=formInputStyle
          placeholder=""
          required
        />
      </div>

      <div class="mx-5 mb-2">
        <label :class=formLabelStyle>Established</label>
        <input
          type="date"
          v-model="form.established"
          id="established"
          name="established"
          :class=formInputStyle
          placeholder=""
          required
        />
      </div>

      <div class="mx-5 mb-2">
        <label :class=formLabelStyle>Area</label>
        <input
          type="number"
          step="0.01"
          v-model="form.area"
          id="area"
          name="area"
          :class=formInputStyle
          placeholder=""
          required
        />
      </div>

      <div class="mx-5 mb-2">
        <label :class=formLabelStyle>Population</label>
        <input
          type="number"
          v-model="form.population"
          id="population"
          name="population"
          :class=formInputStyle
          placeholder=""
          required
        />
      </div>

      <div class="mx-5 mb-4">
        <input
          type="checkbox"
          v-model='form.isCapital'
          id="isCapital"
          name="isCapital"
          :class=formInputCheckboxStyle
        />
        <label :class=formLabelCheckboxStyle 
          @click="form.isCapital=(form.isCapital==true) ? false : true ;">Capital</label>
      </div>

      <!-- <div class="flex justify-center space-x-2 border"> -->
      <div class="border-t bg-gray-50 py-3 text-center">
        <button
          class="bg-indigo-400 text-white rounded-full px-3 py-2 w-60
            drop-shadow-md hover:shadow-lg hover:bg-indigo-500"
          type="submit"
        >
        Update
        </button>
        <!-- <button
          class="bg-red-600 hover:bg-red-500 hover:text-white text-white 
            rounded-md px-3 py-2 w-1/2"
          type=""
          @click="router.push('/')"
        >
        Cancel
        </button> -->
      </div>
    </form>
  </div>
  </div>
  </section>

</template>


<style scope>
/* number formtype without arrows  -   Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* number formtype without arrows  -   Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
