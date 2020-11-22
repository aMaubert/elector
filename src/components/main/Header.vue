<template>
  <header class="w-full flex items-center bg-gray-200 py-2 px-6 hidden sm:flex">
    <div class="w-1/2"></div>
    <div class="relative w-1/2 flex justify-end">
      <button @click="isOpen = !isOpen"
              class="relative z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-primary hover:border-white focus:border-gray-300 focus:outline-none" >
        {{ userLabel }}
      </button>
      <button v-if="isOpen" @click="isOpen = false" class="h-full w-full fixed inset-0 cursor-default"></button>
      <div v-if="isOpen" class="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
        <router-link :to="`/account/${user.address}`"
                     class="block px-4 py-2 account-link hover:bg-primary hover:text-white"
                      @click="isOpen = false">
          Account
        </router-link>
      </div>
    </div>
  </header>
</template>

<script lang="ts">

  import {defineComponent, ref, computed} from 'vue';
  import {useStore} from 'vuex';
  import {GetterType} from "@/store";
  import {IAccount} from "@/definitions/models/account.model";

  export default defineComponent({
    name: 'Header',
    setup () {
      const store = useStore();
      const isOpen = ref(false);


      const user = computed<IAccount>( () => store.getters[GetterType.GET_USER] as IAccount);
      const userLabel = computed<string>( () => user.value.address.slice(0,4));
      return {
        isOpen,
        user,
        userLabel
      }
    }
  })
</script>

<style scoped>

</style>
