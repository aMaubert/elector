<template>
  <div class="flex"
       v-if="connectedUser">
    <Menu/>
    <div class="w-full flex flex-col h-screen overflow-y-auto">
      <Header
              :user="connectedUser"/>
      <div class="main-content flex-1 mt-12 md:mt-2 pb-24 md:pb-5">
        <router-view/>
      </div>
    </div>
  </div>
  <NotConnected v-else/>
</template>

<script lang="ts">

import {computed, defineComponent} from 'vue'
import Menu from '@/components/main/Menu.vue'
import Header from '@/components/main/Header.vue'
import NotConnected from '@/views/401.vue';
import {useStore} from "vuex";
import {ActionType, GetterType} from "@/store";
import {IAccount} from "@/definitions/models/account.model";
import {useRouter} from "vue-router";

export default defineComponent({
  name: 'App',
  components: {
    Menu,
    Header,
    NotConnected
  },
  setup() {
    const {getters, dispatch} = useStore();
    const connectedUser = computed<IAccount>( () => getters[GetterType.GET_USER] as IAccount);
    dispatch(ActionType.FETCH_CONNECTED_USER)
      .then(()  => {
        if(Object.keys(connectedUser.value).length === 0) {
          console.error('USER NOT CONNECTED !!!');
        }
      });


    return {
      connectedUser
    };

  }
})

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
