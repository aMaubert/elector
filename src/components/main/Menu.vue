<template>
  <aside class="relative bg-primary h-screen w-64 hidden sm:block shadow-xl" >
    <div class="p-6">
      <label class="text-white text-2xl font-semibold uppercase hover:text-gray-300">
        Menu
      </label>
    </div>
    <nav class="text-white text-base font-semibold pt-3">
      <router-link :to="'/undefined-route'">
        Elections
      </router-link>
    </nav>
  </aside>
</template>

<script lang="ts">

  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Menu'
  })
</script>

<style scoped>

</style>
