<template>
  <section class="dashboard flex">
    <toy-type-chart v-if="pricesAvgs" :toysPrices="pricesAvgs" class="toy-type-chart" />
    <inv-by-type v-if="typesSum" :typesSum="typesSum" class="inv-by-type-chart" />
  </section>
</template>

<script>
import InvByType from '../cmps/inv-by-type.vue';
import toyTypeChart from "../cmps/toy-type-chart.vue";

export default {
  components: {
    toyTypeChart,
    InvByType,
  },
  computed: {
    typesSum() {
      return this.$store.getters.sumToysByType;
    },
    pricesAvgs() {
      return this.$store.getters.getToysAvgPrice;
    },
  },
  created() {
  }
};
</script>
