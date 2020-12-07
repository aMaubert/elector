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
  import {EthereumAddress, ICandidateState, IElection} from '@/definitions';
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
      const router = useRouter();
      const electionName = computed<EthereumAddress>( () => router.currentRoute.value.params.name as EthereumAddress);

      const electionState = computed<ICandidateState[]>(() =>  {
        if(!election.value) return [];
        let states = election.value.candidates.map(candidate => {return  { candidate, votes: [] } as  ICandidateState });
        for(const vote of election.value.votes) {
          for(const note of vote.Note) {
            const index = states.findIndex(state => state.candidate.address === note.candidate.address );
            states[index].votes.push(note.value);
          }
        }
        return states;
      });

      const chartData = computed<{x: string, y: number}[]>(() => electionState.value.map((candidateState: ICandidateState) => {return { x: `${candidateState.candidate.firstName} ${candidateState.candidate.lastName}` , y: computeAverage(candidateState.votes)} }) );

      const computeAverage = (numbers: number[]): number => {
        if(numbers.length === 0 ) return 0;
        return numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / numbers.length ;
      };

      const fetchElectionByName = async () => {
        election.value = await pollService.fetchElectionByName(electionName.value);
        if(!election.value) {
          console.error('Error to handle');
          return;
        }
      }

      fetchElectionByName();


      return {
        electionName,
        electionState,
        computeAverage,
        chartData
      };
    }
  })

</script>

<style scoped>

</style>
