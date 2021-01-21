<template>
  <div class="container p-3 m-auto w-full flex">
    <div class="w-2/3 m-auto h-48">
      <h4 class="title m-4 text-4xl text-primary font-bold">
        <i class="fas fa-chart-line"></i>
        Statistiques {{electionName}}
      </h4>

      <div  class="flex mt-5 px-3 py-2 h-12"
            v-for="medianAndAverageNote of medianAndAverageNotes"
            :key="medianAndAverageNote.address"
            :class="winner.averageNote === medianAndAverageNote.averageNote ? 'bg-green-400 rounded-full' : ''">
        <span class="m-left text-left w-1/4 font-bold">
         {{ `${medianAndAverageNote.name} ${medianAndAverageNote.firstName}`}}
        </span>
        <i class="fas fa-arrow-right fa-1x m-auto "></i>
        <div class="h-full m-right  flex">
           <span class="my-auto font-bold">
           {{ `${medianAndAverageNote.level} (${medianAndAverageNote.averageNote})` }}
         </span>
        </div>

      </div>
      <div class="m-6">
        <line-chart :chart-data="chartDataMedian"
                    div-chart="chartDataMedian"/>
      </div>

    </div>
  </div>
</template>

<script lang="ts">

import {computed, defineComponent, ref} from 'vue';
import {IElection, IMedianAndAverageNote, Level, medianNoteToLevel} from '@/definitions';
import {pollService} from '@/services';
import {useRouter} from 'vue-router';
import LineChart from "@/components/charts/LineChart.vue";

export default defineComponent({
    name: 'Stats',
    components: {
      LineChart
    },
    setup() {
      const election = ref<IElection | undefined>(undefined);
      const medianAndAverageNotes = ref<IMedianAndAverageNote[]>([]);
      const router = useRouter();
      const electionId = computed<number>( () => parseInt(router.currentRoute.value.params.id as string, 10));

      const winner = computed<IMedianAndAverageNote>(() => {
        if (equalsCandidates.value.length === 1) return equalsCandidates.value[0];

        return equalsCandidates.value.reduce((accumulator: IMedianAndAverageNote, currentValue: IMedianAndAverageNote) => {
          if (currentValue.averageNote > accumulator.averageNote) {
            return currentValue as IMedianAndAverageNote;
          }
          return accumulator;
        }, {medianNote: -1, averageNote: -1, name: '', firstName: '', address: ''} as IMedianAndAverageNote);
      });

      const chartDataMedian = computed<{x: string, y: number, label_text: string}[]>(() => {
        return medianAndAverageNotes.value.map( medianAndAverageNote => {
          return {
            x: `${medianAndAverageNote.firstName} ${medianAndAverageNote.name}`,
            y: medianAndAverageNote.level,
            label_text: medianAndAverageNote.averageNote.toString()
          } as {x: string, y: number, label_text: string};
        });
      });

      const chartDataAverageNote = computed<{x: string, y: number}[]>(() => {
        return  equalsCandidates.value.map( medianAndAverageNote => {

          return {
            x: `${medianAndAverageNote.firstName} ${medianAndAverageNote.name}`,
            y:  medianAndAverageNote.averageNote
          } as {x: string, y: number};
        });
      });


      const equalsCandidates = computed<IMedianAndAverageNote[]>(() => {
        if (medianAndAverageNotes.value.length === 0) return [];
        const sortedMedianAndAverageNotes =  medianAndAverageNotes.value.sort((a, b) => {
          if (a.medianNote < b.medianNote) return 1;
          else if (a.medianNote > b.medianNote) return -1;
          return 0;
        });
        const maxMedian = sortedMedianAndAverageNotes[0];
        return sortedMedianAndAverageNotes.filter(medianAndAverageNote => medianAndAverageNote.level === maxMedian.level);
      });

      const isMedianEqual = computed<boolean>(() => equalsCandidates.value.length > 1);

      const electionName = computed<string>(() => election.value ? election.value.name : '');

      const fetchAllData = async () => {
        election.value = await pollService.fetchElectionById(electionId.value);
        const medianAndAverageNotesFetched = await pollService.fetchMedianAndAverageNotesByElectionId(electionId.value);

        medianAndAverageNotes.value = medianAndAverageNotesFetched.map(medianAndAverageNote => {
          return {...medianAndAverageNote, level: medianNoteToLevel(medianAndAverageNote.medianNote) } as IMedianAndAverageNote;
        });
      }

      fetchAllData();

      return {
        electionId,
        medianAndAverageNotes,
        chartDataMedian,
        winner,
        chartDataAverageNote,
        isMedianEqual,
        electionName
      };
    }
  })

</script>

<style scoped>

</style>
