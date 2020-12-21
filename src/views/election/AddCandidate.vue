<template>
  <div class="container p-3 m-auto">
    <card v-if="election">
      <template #title>
        Se présenter pour : <strong>{{election.name}}</strong>
      </template>
      <div class="grid grid-cols-4 gap-4 ">
        <div class="col-span-2 h-20 p-2 bg-gray-200 rounded-full">
          <label  class="block w-2/3 m-auto text-left font-bold"
                  for="firstName">
            Prénom
          </label>
          <input
              class="w-2/3 h-8 m-auto rounded border border-gray-400 shadow-mg focus:outline-none focus:shadow-outline p-2 font-bold text-primary"
              type="text"
              id="firstName"
              v-model="firstName"/>
        </div>
        <div class="col-span-2 h-20 p-2 bg-gray-200 rounded-full">
          <label  class="block w-2/3 m-auto text-left font-bold"
                  for="lastName">
            Nom
          </label>
          <input
            class="w-2/3 h-8 m-auto rounded border border-gray-400 shadow-mg focus:outline-none focus:shadow-outline p-2 font-bold text-primary"
            type="text"
            id="lastName"
            v-model="lastName"/>
        </div>
      </div>
      <template #footer>
        <div class="w-full bg-gray-200 flex p-2">
          <div class="w-3/4 " />
          <button class="w-1/4 bg-green-500 rounded-md font-bold py-2 px-4 text-gray-100 hover:bg-white hover:text-primary"
                  @click="createCandidate">
            Confirmer
          </button>
        </div>
      </template>
    </card>
  </div>
</template>

<script lang="ts">

  import {defineComponent, computed, ref} from 'vue';
  import Card from "../../components/Card.vue";
  import {useRouter} from "vue-router";
  import {EthereumAddress} from "@/definitions";
  import {IElection} from "@/definitions/models/election.model";
  import {pollService} from "@/services";

  export default defineComponent({
    name: 'AddCandidate',
    components: {
      Card
    },
    setup() {

      const router = useRouter();
      const electionId = computed<number>( () => parseInt(router.currentRoute.value.params.id as string, 10) as number);
      const election = ref<IElection | undefined>(undefined) ;

      //Form vars
      const firstName = ref<string>('');
      const lastName = ref<string>('');

      const fetchElectionById = async () => {
        const elections = await pollService.fetchAllElections();
        election.value = elections.find(election => election.id === electionId.value);
      }

      const createCandidate = async () => {
        const isCreated = await pollService.createCandidate( electionId.value, firstName.value, lastName.value );
        if(!isCreated) {
          //TODO handle Error with a Toast
          console.error('Error ajout du candidat');
          return;
        }
        router.push({name: 'election-list'});
      }

      fetchElectionById();

      return {
        election,
        firstName,
        lastName,

        createCandidate
      };
    }

  })
</script>

<style scoped>

</style>
