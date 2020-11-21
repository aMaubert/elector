<template>
  <div class="w-full p-3">
    <div class="flex">
      <div class="w-2/6">
        <h4 class="m-4 text-4xl text-primary  font-bold">
          <i class="fas fa-box"></i>
          Liste des Elections
        </h4>
      </div>
      <div class="w-3/6" />
      <div class="h-1/2 m-auto ml-max w-1/6">
        <button class="bg-primary rounded-md font-bold py-2 px-4 text-gray-100 hover:bg-gray-200 hover:text-primary ">
          <router-link :to="{name : 'election-create'}">
            Créer une Election
          </router-link>

        </button>
      </div>
    </div>

    <Table class="my-8">
      <template #table-header>
        <TableHeaderItem v-for="column in columns">
          {{column}}
        </TableHeaderItem>
        <TableHeaderItem>

        </TableHeaderItem>
      </template>
      <template #table-body>
        <tr v-for="election of elections"
            class=" divide-x-2 divide-primary border-b border-gray-400">
          <TableBodyItem v-for="column of columns">
            {{election[column]}}
          </TableBodyItem>
          <TableBodyItem>
            <button class="px-2 text-primary bg-white rounded-full mx-2 hover:bg-primary hover:text-white"
                    v-if="isApplicationState(election)">
              <i class="fas fa-user-plus"></i>
            </button>
            <button class="px-2 text-primary bg-white rounded-full mx-2 hover:bg-primary hover:text-white"
                    v-if="isVoteState(election)">
              <i class="fas fa-person-booth"></i>
            </button>
            <button class="px-2 text-primary bg-white rounded-full mx-2 hover:bg-primary hover:text-white"
                    v-if="isFinishedState(election) || connectedUserHasVoted">
              <i class="fas fa-chart-line"></i>
            </button>
          </TableBodyItem>
        </tr>
      </template>
    </Table>

  </div>
</template>

<script lang="ts">

import {defineComponent, ref, computed} from 'vue';
import {ElectionState, IElection} from "@/definitions";
import {pollService} from "@/services";
import Table from "@/components/table/Table.vue";
import TableHeaderItem from "@/components/table/TableHeaderItem.vue";
import TableBodyItem from "@/components/table/TableBodyItem.vue";

export default defineComponent({
    name: 'Election-list',
    components: {
      Table,
      TableHeaderItem,
      TableBodyItem
    },
    setup() {
      const elections = ref<IElection[]>([]);
      const columns = ref<string[]>([
        'name',
        'state'
      ]);

      const isApplicationState = (election: IElection): boolean => election.state === ElectionState.Applications ;
      const isVoteState = (election: IElection): boolean => election.state === ElectionState.Vote ;
      const isFinishedState = (election: IElection): boolean => election.state === ElectionState.Finished ;
      const connectedUserHasVoted = computed<boolean>( () => false);


      const fetAllElections = async () => {
        elections.value = await pollService.fetchAllElections();
      };

      fetAllElections();

      return {
        elections,
        columns,
        isApplicationState,
        isVoteState,
        connectedUserHasVoted,
        isFinishedState
      };
    }
  })
</script>

<style scoped>

</style>
