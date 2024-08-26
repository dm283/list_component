<script setup>
import router from '@/router';
import {reactive} from 'vue';
import axios from 'axios';

const form = reactive({
  id: '',
  name: '',
  country: '',
  established: '',
  area: '',
  population: '',
  isCapital: '',
})

const handleSubmit = async () => {
  const newItem = {
    id: form.id,
    name: form.name,
    country: form.country,
    established: form.established,
    area: form.area,
    population: form.population,
    isCapital: form.isCapital,

  };

  try {
    const response = await axios.post('http://localhost:5000/cities', newItem);
    router.push('/');
  } catch (error) {
    console.error('Error adding item', error);
  };
};

const formLabelStyle = "mx-1 block text-xs font-bold text-gray-400";
const formInputStyle = "border-b-2 text-base font-medium w-full py-1 px-1 mb-2 focus:outline-none focus:border-indigo-300";

</script>

<template>
  
  <section class="bg-white">
  <div class="container m-auto max-w-sm py-5">
  <div class="bg-white drop-shadow-lg rounded-lg overflow-hidden md:m-0">

    <header class="py-2 bg-lime-500 text-white text-base font-semibold text-center">
      Add item
      <div class="absolute top-2 right-3">
        <RouterLink
          to="/"
          class="hover:text-indigo-500">
          <i class="pi pi-times"></i>
        </RouterLink>
      </div>
    </header>
    
    <form @submit.prevent="handleSubmit" class="mx-5 my-5">
      
      <div class="mb-2">
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

      <div class="mb-2">
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

      <div class="mb-2">
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

      <div class="mb-2">
        <label :class=formLabelStyle>Established</label>
        <input
          type="text"
          v-model="form.established"
          id="established"
          name="established"
          :class=formInputStyle
          placeholder=""
          required
        />
      </div>

      <div class="mb-2">
        <label :class=formLabelStyle>Area</label>
        <input
          type="text"
          v-model="form.area"
          id="area"
          name="area"
          :class=formInputStyle
          placeholder=""
          required
        />
      </div>

      <div class="mb-2">
        <label :class=formLabelStyle>Population</label>
        <input
          type="text"
          v-model="form.population"
          id="population"
          name="population"
          :class=formInputStyle
          placeholder=""
          required
        />
      </div>

      <div class="mb-2">
        <label :class=formLabelStyle>isCapital</label>
        <input
          type="text"
          v-model="form.isCapital"
          id="isCapital"
          name="isCapital"
          :class=formInputStyle
          placeholder=""
          required
        />
      </div>

      <div class="flex justify-center space-x-2">
        <button
          class="bg-indigo-400 text-white rounded-full px-3 py-2 w-60
            drop-shadow-md hover:shadow-lg hover:bg-indigo-500"
          type="submit"
        >
        Add
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
