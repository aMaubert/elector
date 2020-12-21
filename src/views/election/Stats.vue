<template>
  <div class="container p-3 m-auto w-full flex">
    <div class="w-2/3 m-auto">
      <h4 class="title m-4 text-4xl text-primary font-bold">
        <i class="fas fa-chart-line"></i>
        Statistiques {{electionName}}
      </h4>
      <div  class="flex mt-5"
            v-for="candidateState of electionState"
            :key="candidateState.candidate.address">
        <span class="m-left text-left w-1/4">
         {{ `${candidateState.candidate.lastName} ${candidateState.candidate.firstName}`}}
       </span>
        <i class="fas fa-arrow-right fa-2x m-auto"></i>
       <span class="m-right">
         {{ computeAverage(candidateState.votes) }}
       </span>
      </div>
      <line-chart class="m-6"
                  :chart-data="chartData" />
    </div>
  </div>
</template>

<script lang="ts">

  import {computed, defineComponent, ref} from 'vue';
  import {EthereumAddress, ICandidate, ICandidateState, IElection, IVote} from '@/definitions';
  import {pollService} from '@/services';
  import {useRouter} from 'vue-router';
  import LineChart from "@/components/charts/LineChart.vue";



  export default defineComponent({
    name: 'Stats',
    components: {
      LineChart
    },
    setup() {
      const election = ref<IElection | undefined>(undefined) ;
      const votes = ref<IVote[]>([]);
      const candidates = ref<ICandidate[]>([]);
      const router = useRouter();
      const electionId = computed<number>( () => parseInt(router.currentRoute.value.params.id as string, 10));
      const electionName = computed<string>(() => election.value ? election.value.name : '');


      const electionState = computed<ICandidateState[]>(() =>  {
        if(!election.value || candidates.value.length === 0 ) return [];
        let states = candidates.value.map(candidate => {return  { candidate, votes: [] } as  ICandidateState });

        for(const vote of votes.value) {
          for(const note of vote.ballot) {
            const index = states.findIndex(state => state.candidate.address === note.candidate );
            states[index].votes.push(note.value);
          }
        }
        // return states;
        return states;
      });

      const chartData = computed<{x: string, y: number}[]>(() => electionState.value.map((candidateState: ICandidateState) => {return { x: `${candidateState.candidate.firstName} ${candidateState.candidate.lastName}` , y: computeAverage(candidateState.votes)} }) );

      const computeAverage = (numbers: number[]): number => {
        if(numbers.length === 0 ) return 0;
        return numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / numbers.length ;
      };

      const fetchElectionById = async () => {
        const elections = await pollService.fetchAllElections();
        election.value = elections.find(election => election.id === electionId.value);
        candidates.value = await pollService.fetchAllCandidates(electionId.value);
        votes.value = await pollService.fetchAllVotes(electionId.value);
        if(!election.value) {
          console.error('Error to handle');
          return;
        }
      }

      fetchElectionById();

      return {
        electionName,
        electionId,
        electionState,
        computeAverage,
        chartData
      };
    }
  })

</script>

<style scoped>

</style>
