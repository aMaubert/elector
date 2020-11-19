<template>
  <div :class="containerClass">
    <div class=" bg-white rounded-lg shadow-md ">
      <h4 class="rounded-t-lg pl-4 py-1 text-lg text-white bg-primary font-semibold">
        <slot name="title" />
      </h4>
      <p class="px-4 py-3 mb-8 text-sm text-gray-600 dark:text-gray-400">
        <slot />
      </p>
    </div>
  </div>
</template>

<script lang="ts">

  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'card',
    props: {
      containerClass: {
        type:String,
        default: ''
      }
    }
  })

</script>

<style scoped>

</style>
