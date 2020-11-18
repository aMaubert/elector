<template>
  <header class="w-full flex items-center bg-white py-2 px-6 hidden sm:flex">
    <div class="w-1/2"></div>
    <div class="relative w-1/2 flex justify-end">
      <button @click="isOpen = !isOpen"
              class="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
        {{menuLabel}}
      </button>
      <button v-if="isOpen" @click="isOpen = false" class="h-full w-full fixed inset-0 cursor-default"></button>
      <div v-if="isOpen" class="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
        <a href="#" class="block px-4 py-2 account-link hover:text-white">Account</a>
        <a href="#" class="block px-4 py-2 account-link hover:text-white">Support</a>
      </div>
    </div>
  </header>
</template>

<script lang="ts">

import {defineComponent, ref} from 'vue';
import {pollService} from '@/services';

export default defineComponent({
  name: 'Header',
  setup () {
    const isOpen = ref(false);
    const menuLabel = ref('AM');

    const connectWeb3 = async () => {
      try {
        const result = await pollService.pingTest();
        console.log({result});
      } catch (e) {
        console.log({error: e});
      }
    }

    connectWeb3();


    return {
      isOpen,
      menuLabel
    }
  }
})
</script>

<style scoped>

</style>
