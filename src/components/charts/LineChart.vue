<template>
  <div v-if="computeChartData"
       class="w-full h-full"
       :ref="divChart" />
</template>
<script >

  import {chart} from  'jscharting';

  export default {
    name: 'LineChart',
    props: {
      chartData: {
        type: Array,
        required: true
      },
      title: {
        type: String,
        default: () => ''
      },
      divChart: {
        type: String,
        required: true
      }
    },
    computed: {
      computeChartData() {
        if(this.chartData.length > 0) {
          chart(this.$refs[this.divChart], {
            defaultCultureName: 'fr-FR',
            title: { label: { text: this.title } },
            type: 'column Overflow', //https://jscharting.com/documentation/#node=Home.API.json.Enums.chartType
            series: [
              {
                points: this.chartData,
                animation: true,
                palette: ["#0085f4", "#fE4C14", "#DBCB18", "#15AC20", "#327fa8", "#4832a8", "#8b32a8", "#a83279"]//"autumn"
              }
            ],
          });
        }
        return this.chartData;
      }
    }
  }
</script>

<style scoped>

</style>
