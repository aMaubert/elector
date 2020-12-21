<template>
  <div class="w-full p-3">
    <card>
      <template #title>
        Mon vote pour : {{electionName}}
      </template>
      <div class="grid grid-cols-5 gap-4 ">
        <template v-for="note  of notes"
                  :key="note">
          <div class="col-span-2 h-20 p-2 bg-gray-200 rounded-full">
            <label  class="block w-2/3 m-auto text-left font-bold"
                    for="name">
              Candidat
            </label>
            <input
              class="w-2/3 h-8 m-auto rounded border border-gray-400 shadow-mg bg-white p-2 font-bold text-primary"
              type="text"
              id="name"
              :value="`${note.candidate.lastName} ${note.candidate.firstName}`"
              disabled/>
          </div>
          <div class="col-span-1 flex" >
            <i class="fas fa-arrow-right fa-2x m-auto"></i>
          </div>
          <div class="col-span-2 h-20 p-2 bg-gray-200  rounded-full">
            <label  class="block w-2/3 m-auto text-left font-bold"
                    for="note">
              Note
            </label>
            <input
              class="w-2/3 h-8 m-auto rounded border border-gray-400 shadow-mg bg-white p-2 font-bold text-primary"
              type="number"
              id="note"
              min="0"
              max="20"
              v-model.number="note.value"/>
          </div>
        </template>
      </div>
      <template #footer>
        <div class="w-full bg-gray-200 flex p-2">
          <div class="w-3/4 " />
          <button class="w-1/4 bg-green-500 rounded-md font-bold py-2 px-4 text-gray-100 hover:bg-white hover:text-primary"
                  @click="addVote">
            Valider
          </button>
        </div>
      </template>
    </card>
  </div>
</template>

<script lang="ts">

  import {computed, defineComponent, ref} from 'vue';
  import Card from '../../components/Card.vue';
  import {pollService} from '@/services';
  import {EthereumAddress, ICandidate, IElection, INote, IVote} from '@/definitions';
  import router from '@/router';
  import {useStore} from "vuex";
  import {IAccount} from "@/definitions/models/account.model";
  import {GetterType} from "@/store";
  import {useRouter} from "vue-router";

  export default defineComponent({
    name: 'Vote',
    components: {
      Card,
    },
    setup() {
      const election = ref<IElection | undefined>(undefined) ;
      const notes = ref<INote[]>([]);
      const router = useRouter();
      const {getters} = useStore();

      const user = computed<IAccount>( () => getters[GetterType.GET_USER] as IAccount);

      const electionId = computed<number>( () => parseInt(router.currentRoute.value.params.id as string) as number);

      const mapCandidateToNote = (candidate: ICandidate) => { return {candidate, value: 10} as INote } ;

      const electionName = computed<string>(() => election.value !== undefined ? election.value.name : '');

      const fetchElectionById = async () => {
        const elections = await pollService.fetchAllElections();
        election.value = elections.find(election => election.id === electionId.value);
        const candidates = await pollService.fetchAllCandidates(electionId.value);
        if(!election.value) {
          console.error('error');
          return;
        }
        notes.value = candidates.map(mapCandidateToNote);
      };

      fetchElectionById();

      const addVote = async () => {
        const vote = {voter: user.value.address, ballot: notes.value } as IVote;
        const response = await pollService.vote(electionId.value, vote);
        if(response) {
          router.push({name: 'election-list'});
        }
      }

      return {
        electionName,
        notes,
        addVote
      };
    }
  })
</script>

<style scoped>

</style>
