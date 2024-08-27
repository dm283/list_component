<script setup>
import { defineProps, ref, reactive, onMounted } from 'vue';
import 'primeicons/primeicons.css';
import axios from 'axios';

// const props = defineProps({
//   data: Object,
// });

const state = reactive({
  data: [],
  tableFields: [],
  localData: [],
})

const loadAPIData = () => {
  //
  onMounted(async () => {
    try {
      const response = await axios.get('http://localhost:5000/cities');
      state.data = response.data;
      state.tableFields = Object.keys(state.data[0]);

      for (let xobj of state.data) {
        let clonedObj = {...xobj};
        state.localData.push(clonedObj);
      };

    } catch (error) {
      console.error('Error fetching books', error);
    }
  });
}

loadAPIData();



const isDropSearchShow = ref(false);
const searchBy = ref('all');
const mouseOverSearchDropdown = ref(false);
const searchFieldsList = ['name', 'country', 'established', 'area', 'population'];

const isDropSortShow = ref(false);
const sortBy = ref('default');
const sortDirection = ref('asc');
const sortingDataType = ref();
const mouseOverSortDropdown = ref(false);
const sortIcon = ref('pi pi-sort-alt');
const sortFieldsList = ['name', 'country', 'established', 'area', 'population'];

const btnStyle = "bg-gray-100 rounded-full w-24 h-8 backdrop-filter backdrop-grayscale drop-shadow-lg hover:shadow-lg";  
const dropdownLiStyle = "h-8 pl-3 py-1.5 capitalize cursor-pointer hover:bg-gray-100";



const loadLocalData = () => {
  // clone data [array of objects] into localData [array of objects]
  state.localData = [];

  for (let xobj of state.data) {
    let clonedObj = {...xobj};
    state.localData.push(clonedObj);
  };
};

// loadLocalData();

const sortNumbers = (direction, field) => {
  // sort numbers
  let x = (direction == 'asc') ? 
    state.localData.sort((a, b) => a[field] - b[field]) : 
    state.localData.sort((a, b) => b[field] - a[field]);
};


const sortStrings = (direction, field) => {
  // sort strings
  state.localData.sort((a, b) => {
    const nameA = a[field].toUpperCase(); // ignore upper and lowercase
    const nameB = b[field].toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      let x = (direction == 'asc') ? -1 : 1;
      return x;
    }
    if (nameA > nameB) {
      let x = (direction == 'asc') ? 1 : -1;
      return x;
    }

    // names must be equal
    return 0;
  });
};


const clickSortArrow = () => {
  //
  if (sortBy.value == 'default') { return };

  if (sortDirection.value == 'asc') {
    sortDirection.value = 'desc';
    sortIcon.value = 'pi pi-arrow-down';
  }
  else if (sortDirection.value == 'desc') {
    sortDirection.value = 'asc';
    sortIcon.value = 'pi pi-arrow-up';
  }

  sortTable(sortingDataType.value);
};


const clickSortField = (field) => {
  //
  sortBy.value = field;
  sortDirection.value = 'asc';
  sortIcon.value = 'pi pi-arrow-up';

  if (typeof(state.localData[0][field]) == 'number') {
    sortingDataType.value = 'number';
  }
  else if (typeof(state.localData[0][field]) == 'string') {
    sortingDataType.value = 'string';
  }
  sortTable(sortingDataType.value);
}


const sortTable = () => {
  // sort table by certain field
  if (sortBy.value == 'default') { 
    loadLocalData();
    sortIcon.value = 'pi pi-sort-alt';
    return;
  };

  if (sortingDataType.value == 'string') {
    sortStrings(sortDirection.value, sortBy.value);
  }
  else if (sortingDataType.value == 'number') {
    sortNumbers(sortDirection.value, sortBy.value);
  }
  else {
    return;
  }
};


const toggleDropdown = (dropdownId) => {
  //
  if (dropdownId == 'search') {
    isDropSearchShow.value = (isDropSearchShow.value == true) ? false : true;
  }
  else if (dropdownId == 'sort') {
    isDropSortShow.value = (isDropSortShow.value == true) ? false : true;
  }
};


const searchRecord = () => {
  //   searchBy
  let newLocalData = [];
  let searchFieldsList = [];
  let pushedIds = [];
  let filter = document.getElementById("searchInput").value.toString().toUpperCase();

  if (searchBy.value == 'all') {
    searchFieldsList = state.tableFields;
  } else {
    searchFieldsList.push(searchBy.value);
  }

  for (let rec of state.data) {
    for (let field of searchFieldsList) {
      if ( rec[field].toString().toUpperCase().indexOf(filter) > -1 ) {
        if (!pushedIds.includes(rec.id)) {
          newLocalData.push(rec)
        };
        pushedIds.push(rec.id);
      }
    }
  };

  if (newLocalData.length > 0) {
    state.localData = newLocalData;
  } else {
    loadLocalData();
  };

};
  

const checkState = () => {
  //
  if (isDropSearchShow.value == true & !mouseOverSearchDropdown.value) {
    isDropSearchShow.value = false;
  }
  else if (isDropSortShow.value == true & !mouseOverSortDropdown.value) {
    isDropSortShow.value = false;
  };
};

</script>



<template>

<div @click="checkState()" class="max-w-max m-5 p-5 border border-gray-200 rounded-lg backdrop-filter backdrop-grayscale drop-shadow-lg">

<section class="">
  <div class="text-2xl font-semibold">Cities & towns</div>
</section>



<!-- *******************************  NAV AREA  ************************* --> 
<nav class="mt-5 text-sm font-semibold border-dashed border-green-500">

<!-- search area ************************* --> 
<div class="inline-block">
<div id="searchArea" class="flex mr-5 w-80 border border-gray-100 rounded-full shadow-md hover:shadow-lg">
   <!-- w-80 border border-gray-100 rounded-full backdrop-filter 
    backdrop-grayscale drop-shadow-lg hover:shadow-lg"> -->

  <div class="dropdown flex-0 bg-gray-100 h-8 rounded-l-full" @mouseover="mouseOverSearchDropdown=true" @mouseleave="mouseOverSearchDropdown=false">
    <button id="btn-6" @click="toggleDropdown('search')" class="dropbtn border-l rounded-l-full px-3 h-8 capitalize">
      {{ searchBy }}
      <i class="pi pi-angle-down" style="font-size: 0.7rem"></i>
    </button>
    <div v-show="isDropSearchShow" class="absolute z-10 bg-white text-sm font-semibold mt-1 ml-1 w-40 
       border-gray-500 rounded-md overflow-hidden backdrop-filter backdrop-grayscale drop-shadow-lg">
      <ul @click="toggleDropdown('search')">
        <li class="border-b border-gray-300 pl-3 py-1.5 cursor-pointer hover:bg-gray-100" @click="searchBy='all'">All</li>
        <li :class=dropdownLiStyle @click="searchBy=elem" v-for="elem in searchFieldsList">{{ elem }}</li>
      </ul>
    </div>
  </div>

  <div class="mt-1.5 flex-0 pl-2 text-gray-600"><i class="pi pi-search"></i></div>
  <input class="flex-1 h-8 pl-3 border-r rounded-r-full focus:outline-none" type="text" id="searchInput" @keyup="searchRecord()" 
    placeholder="Search" title="Type in a name">

</div>
</div>

<!-- sort area ************************* --> 
<div class="inline-block">
<div id="sortArea" class="flex mr-5">

  <div class="flex-0" @mouseover="mouseOverSortDropdown=true" @mouseleave="mouseOverSortDropdown=false">
    <button id="btn-4" @click="toggleDropdown('sort')" class="bg-gray-100 rounded-full px-3 mr-1 h-8
      backdrop-filter backdrop-grayscale drop-shadow-lg hover:shadow-lg">
      <div class="inline-block mr-1" v-if="sortBy=='default'">Sort by</div>
      <div class="inline-block mr-1 capitalize" v-else>{{ sortBy }}</div>
      <i class="pi pi-angle-down" style="font-size: 0.7rem"></i>
    </button>
    <div v-show="isDropSortShow" class="absolute z-10 bg-white text-sm font-semibold mt-1 ml-1 w-40 
       border-gray-500 rounded-md overflow-hidden backdrop-filter backdrop-grayscale drop-shadow-lg">
      <ul @click="toggleDropdown('sort')">
        <li class="border-b border-gray-300 pl-3 py-1.5 cursor-pointer hover:bg-gray-100" @click="clickSortField('default')">Default</li>
        <li :class=dropdownLiStyle @click="clickSortField(field)" v-for="field in sortFieldsList">{{ field }}</li>
      </ul>
    </div>
  </div>  

  <button id="btn-5" class="flex-1 bg-gray-100 rounded-full w-8 h-8 backdrop-filter backdrop-grayscale drop-shadow-lg hover:shadow-lg" 
    @click="clickSortArrow()">
    <i :class=sortIcon style="font-size: 0.8rem; color: orange"></i>
  </button>
</div>
</div>

<!-- filters area ************************* --> 
<div id="filtersArea" class="inline-block mr-5">
  <button id='btn-1' :class=btnStyle>
    <i class="pi pi-filter" style="font-size: 0.8rem; color: blue"></i>
    <span class="ml-2">Filter</span>
  </button>
</div>

<!-- refresh area ************************* --> 
<div id="refreshArea" class="inline-block mr-5">
  <button id='btn-2' :class=btnStyle>
    <i class="pi pi-refresh" style="font-size: 0.8rem; color: magenta"></i>
    <span class="ml-2">Refresh</span>
  </button>
</div>

<!-- add element area ************************* --> 
<div id="addElementArea" class="inline-block mr-5">
  <RouterLink to="/items/add">
    <button id='btn-3' :class=btnStyle @click="console.log('add element')">
      <i class="pi pi-plus" style="font-size: 0.8rem; color: green"></i>
      <span class="ml-2">Add</span>
    </button>
  </RouterLink>
</div>

</nav>




<!-- table area ************************* --> 
<section class="mt-5 rounded-lg overflow-x-auto drop-shadow-lg">
<table class="">
  <thead>
    <tr class="h-10 bg-lime-500 text-base text-white font-semibold text-center">
      <td class="capitalize px-10" v-for="(field, index) in state.tableFields">
        {{ field }}
      </td>
    </tr>
  </thead>
  <tbody>
    <tr class="h-10 even:bg-gray-100 odd:bg-white text-base text-center 
      cursor-pointer hover:hover:drop-shadow-md hover:text-gray-500" @click="" v-for="item in state.localData">
      <td v-for="field in state.tableFields">
        <div v-if="typeof(item[field])=='boolean' & item[field]==true"><i class="pi pi-check-square"></i></div>
        <div v-else-if="typeof(item[field])=='boolean' & item[field]==false"><i class="pi pi-stop"></i></div>
        
        <!-- this is nail for render date type field !!!! -->
        <div v-else-if="field=='established'">
          {{ item[field].slice(8, 10) }}/{{ item[field].slice(5, 7) }}/{{ item[field].slice(0, 4) }}
        </div>

        <div v-else>{{ item[field] }}</div>
      </td>
    </tr>
  </tbody>
</table>
</section>

</div>


</template>


<style scope>
#btn-1:hover, #btn-2:hover, #btn-3:hover,
#btn-4:hover, #btn-5:hover, #btn-6:hover {
  background-color: #E4E4E7;
  color: #18181B;
}
</style>