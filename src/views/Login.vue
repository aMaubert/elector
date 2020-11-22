<template>

</template>

<script lang="ts">

  import {defineComponent, onMounted} from 'vue';
  import {useStore} from 'vuex';
  import {useRouter} from "vue-router";
  import {ActionType} from "@/store";

  export default defineComponent({
    name: 'Login',
    setup() {
      const {dispatch, getters} = useStore();
      const router =  useRouter();
      console.log('Login.vue')
      onMounted(async () => {
        await dispatch(ActionType.FETCH_CONNECTED_USER);
        router.push({name: 'election-list'});
      });

    }
  })
</script>

<style scoped>

</style>
