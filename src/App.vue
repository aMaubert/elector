<template>
  <div class="flex">
    <Menu/>
    <div class="w-full flex flex-col h-screen overflow-y-auto">
      <Header/>
      <div class="main-content flex-1 mt-12 md:mt-2 pb-24 md:pb-5">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import Menu from '@/components/main/Menu.vue'
import Header from '@/components/main/Header.vue'

export default defineComponent({
  name: 'App',
  components: {
    Menu,
    Header
  }
})

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
