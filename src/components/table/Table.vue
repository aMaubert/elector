<template>
  <div class="flex flex-col">
    <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div class="align-middle inline-block min-w-full shadow overflow-x-scroll sm:rounded-t-lg border-b border-gray-200">
        <table class="min-w-full" >
          <thead class="bg-primary text-white">
            <tr class="divide-x-2 divide-gray-200">
              <slot name="table-header"/>
            </tr>
          </thead>
          <tbody class="bg-gray-200" >
            <slot name="table-body"/>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "Table"
  })

</script>

<style scoped>

</style>
