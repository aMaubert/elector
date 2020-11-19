<template>
  <div class="container p-3 mx-auto ">
    <div class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">

      <card>
        <template #title >
          Compte {{accountAddress}}
        </template>
        <div class="w-full p-2">
          <div>
            Balance : {{balance}} ETH
          </div>
          <div>
            Transaction count : {{transactionCount}} transaction(s)
          </div>
        </div>
      </card>
    </div>
  </div>
</template>

<script lang="ts">

  import { defineComponent, computed, ref } from 'vue';
  import {useRouter} from 'vue-router';
  import Card from '@/components/Card.vue';
  import {pollService} from '@/services';

  export default defineComponent({
    name: 'Account',
    components: {
      Card
    },
    setup() {
      const router = useRouter();
      const accountAddress = computed<string>( () => router.currentRoute.value.params.id as string);
      const balance = ref<string>('');
      const transactionCount = ref<number>(0);
      const fetchAccountData = async function(): Promise<void> {
        balance.value = await pollService.getBalance(accountAddress.value);
        transactionCount.value = await pollService.getTransactionCount(accountAddress.value);
      };

      fetchAccountData();
      return {
        accountAddress,
        balance,
        transactionCount
      };
    }
  })
</script>

<style scoped>

</style>
