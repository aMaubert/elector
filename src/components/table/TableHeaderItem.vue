<template>
  <th class="px-3 py-1 text-xs leading-4 uppercase tracking-wider" >
    <div>
      <slot />
    </div>
  </th>
</template>

<script lang="ts" >

  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'TableHeaderItem'
  })

</script>

<style scoped>

</style>
