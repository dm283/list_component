<script setup>
// import router from '@/router';
import {onMounted, reactive} from 'vue';
import { useRoute, RouterLink, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
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


const deleteItem = async () => {
  try {
    const confirm = window.confirm('Are you sure you want to delete this item?');
    if (confirm) {
      await axios.delete(`http://localhost:5000/cities/${itemId}`);
    //   toast.success('Book Deleted Successfully');
      router.push('/');
    }
  } catch (error) {
    console.error('Error deleting book', error);
    // toast.error('Job Not Deleted');

  }
}


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

const formLabelStyle = "mx-1 text-xs font-bold text-gray-400";
const formInputStyle = "text-base font-medium w-full py-1 px-1 mb-2 focus:outline-none focus:border-indigo-300";

const formLabelCheckboxStyle = "ml-3 text-base font-semibold text-gray-400 "
const formInputCheckboxStyle = "ml-1 w-4 h-4"

</script>

<template>
  
  <section class="bg-white">
  <div class="container m-auto max-w-sm py-5">
  <div class="bg-white drop-shadow-lg rounded-lg overflow-hidden md:m-0">

    <header class="py-2 bg-lime-500 text-white text-base font-semibold text-center">
      Item info
      <div class="absolute top-2 left-4">
        <RouterLink
          to="/"
          class="hover:text-indigo-500">
          <i class="pi pi-arrow-circle-left"></i>
        </RouterLink>
      </div>
    </header>
    
    <section class="m-5">
      <table class="table-auto">
        <tr class="h-8" v-for="(value, key) in state.item">
          <td class="text-base font-semibold w-60 capitalize">{{ key }}</td>
          <td class="text-base">
            <div v-if="typeof(value)=='boolean' & value==true"><i class="pi pi-check-square"></i></div>
            <div v-else-if="typeof(value)=='boolean' & value==false"><i class="pi pi-stop"></i></div>
        
            <!-- this is nail for render date type field !!!! -->
            <div v-else-if="key=='established'">
              {{ value.slice(8, 10) }}/{{ value.slice(5, 7) }}/{{ value.slice(0, 4) }}
            </div>

            <div v-else>{{ value }}</div>
          </td>
        </tr>
      </table>
    </section>

      <!-- <div class="flex justify-center space-x-2 border"> -->
      
      <div class="border-t bg-gray-50 py-3 text-center space-x-5">
        <RouterLink :to="`/items/edit/${state.item.id}`">
          <button
            class="inline-block bg-indigo-400 text-white rounded-full px-3 py-2 w-1/3
              drop-shadow-md hover:shadow-lg hover:bg-indigo-500"
          >
          Edit
          </button>
        </RouterLink>
        <button
          class="inline-block bg-red-400 text-white rounded-full px-3 py-2 w-1/3
              drop-shadow-md hover:shadow-lg hover:bg-red-500"
          @click="deleteItem"
        >
        Delete
        </button>
      </div>
    <!-- </form> -->
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
