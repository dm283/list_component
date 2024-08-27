<script setup>
import { RouterLink, useRoute } from 'vue-router';
import logo from '@/assets/img/logo.png';
</script>

<template>
<nav class="bg-orange-400">
  <div class="border mx-auto sm:px-6 lg:px-8">
    <div class="flex h-20 items-center justify-between">
      <div class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
    <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
      <img class="h-14 w-auto" :src="logo" alt="diy vuejs example" />
      <span class="hidden md:block text-white text-2xl font-bold ml-5">
        diy vuejs example
      </span>
    </RouterLink>
      </div>
    </div>
  </div>
</nav>
</template>
