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
          <router-link :to="{name : 'election-create'}" >
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
        <tr class=" divide-x-2 divide-primary border-b border-gray-400"
            v-for="election of computedElections"
            :key="election.id" >
          <TableBodyItem v-for="column of columns">
            <div class="flex">
              <span class="m-auto">
                {{election[column]}}
              </span>
              <template v-if="column === 'state'">
                <template v-if="election.state === ElectionStateEnum.Applications || election.state === ElectionStateEnum.Vote">
                  <button class=" ml-auto px-2 text-primary bg-white rounded-full mx-2 hover:bg-primary hover:text-white"
                          @click="electionNextStep(election.id)">
                    <i class="fas fa-arrow-up"></i>
                  </button>
                </template>
              </template>
            </div>
          </TableBodyItem>
          <TableBodyItem>
            <router-link class="px-2 text-primary bg-white rounded-full mx-2 hover:bg-primary hover:text-white"
                         v-if="ElectionStateEnum.Applications === election.state && userIsNotAlreadyCandidate(election)"
                         :to="`/elections/${election.id}/candidate/create`">
              <i class="fas fa-user-plus"></i>
            </router-link>
            <router-link class="px-2 text-primary bg-white rounded-full mx-2 hover:bg-primary hover:text-white"
                         v-if="ElectionStateEnum.Vote === election.state && !userHasAlreadyVoted(election)"
                          :to="`/elections/${election.id}/vote`">
              <i class="fas fa-person-booth"></i>
            </router-link>
            <router-link class="px-2 text-primary bg-white rounded-full mx-2 hover:bg-primary hover:text-white"
                         v-if="election.state === ElectionStateEnum.Finished"
                         :to="`/elections/${election.id}/stats`">
              <i class="fas fa-chart-line"></i>
            </router-link>
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
import {IAccount} from "@/definitions/models/account.model";
import {GetterType} from "@/store";
import {useStore} from "vuex";

export default defineComponent({
    name: 'Election-list',
    components: {
      Table,
      TableHeaderItem,
      TableBodyItem
    },
    setup() {
      const elections = ref<IElection[]>([]);
      const electionUserHasAlreadyVoted = ref<IElection[]>([]);
      const {getters} = useStore();

      const columns = ref<string[]>([
        'name',
        'state'
      ]);

      const connectedUser = computed<IAccount>( () => getters[GetterType.GET_USER] as IAccount);

      const computedElections = computed<IElection[]>(() => elections.value);
      const ElectionStateEnum = ref<{ [key in ElectionState]: ElectionState }>( Object.freeze(ElectionState) );

      const connectedUserHasVoted = computed<boolean>( () => false);

      const electionNextStep = async (electionId: number) => {
        try{
          const success = await pollService.nextStep(electionId);
          if(success) {
            fetchAllElections();
          }
        } catch (error) {
          console.error({error});
        }
      };

      const userIsNotAlreadyCandidate = (election: IElection): boolean => {
        return !election.candidates.some(candidate => candidate.address === connectedUser.value.address);
      }

      const fetchAllElections = async () => {
        elections.value = await pollService.fetchAllElections();
        for(let i = 0; i < elections.value.length; i++) {
          elections.value[i].candidates = await pollService.fetchAllCandidates(elections.value[i].id);
        }

        electionUserHasAlreadyVoted.value = await pollService.fetchElectionMsgSenderHasVoted();
      };

      fetchAllElections();

      const userHasAlreadyVoted = (election: IElection): boolean => {
        return electionUserHasAlreadyVoted.value.some(eachElectionAlreadyVoted => eachElectionAlreadyVoted.id === election.id );
      }

      return {
        computedElections,
        columns,
        connectedUserHasVoted,
        electionNextStep,
        ElectionStateEnum,
        userIsNotAlreadyCandidate,
        userHasAlreadyVoted
      };
    }
  })
</script>

<style scoped>

</style>
