<template>
  <div class="container p-3 mx-auto">
    <Card >
      <template #title>
        <h4 class="mx-4 text-2xl text-white  font-bold">
          Creation d'une election
        </h4>
      </template>
      <div class="grid grid-cols-4 gap-4 bg-gray-200">
        <div class="col-span-1" />
        <div class="col-span-2 flex">
          <label class="block text-gray-700 text-sm font-bold m-3"
                  for="name">
            Name
          </label>
          <input class="h-8 m-auto shadow appearance-none border rounded w-full h-min-full text-gray-700 leading-tight focus:outline-none focus:shadow-outlineshadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 type="text"
                 id="name"
                  v-model="name"/>
        </div>
      </div>
      <template #footer>
        <div class="w-full bg-gray-200 flex p-2">
          <div class="w-3/4 " />
          <button class="w-1/4 bg-green-500 rounded-md font-bold py-2 px-4 text-gray-100 hover:bg-white hover:text-primary "
                  @click="createElection">
            Creer
          </button>
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">

import {defineComponent, ref} from 'vue';
import Card from "@/components/Card.vue";
import {pollService} from "@/services";
import {ElectionState, IElection} from "@/definitions";
import {useRouter} from "vue-router";

export default defineComponent({
    name: 'election-create',
    components: {
      Card
    },
    setup() {
      const router = useRouter();
      const name = ref<string>('');

      const createElection = async () => {
        const electionCreated = await pollService.createElection(name.value);
        if(electionCreated) {
          router.push({name: 'home'});
        }
      };

      return {
        name,
        createElection
      };
    }
  })
</script>

<style scoped>

</style>
