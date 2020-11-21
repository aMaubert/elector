<template >
  <td class="px-6 text-sm py-2" >
    <slot />
  </td>
</template>

<script lang="ts">

  import {defineComponent} from 'vue';

  export default defineComponent({
    name: 'TableBodyItem'
  })
</script>

<style scoped>

</style>
