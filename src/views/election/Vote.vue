<template>
  <div class="container p-3 m-auto">
    <card>
      <template #title>
        Mon vote pour : "Election name"
      </template>
      <div class="grid grid-span-4 flex">
        Formulaire
      </div>
      <template #footer>
        <div class="w-full bg-gray-200 flex p-2">
          <div class="w-3/4 " />
          <button class="w-1/4 bg-green-500 rounded-md font-bold py-2 px-4 text-gray-100 hover:bg-white hover:text-primary">
            Valider
          </button>
        </div>
      </template>
    </card>
  </div>
</template>

<script lang="ts">

  import {defineComponent} from 'vue';
  import Card from "../../components/Card.vue";

  export default defineComponent({
    name: 'Vote',
    components: {
      Card
    },
    setup() {

    }
  })
</script>

<style scoped>

</style>
