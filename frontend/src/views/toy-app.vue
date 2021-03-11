<template>
  <section class="toy-app flex column">
    <toy-filter />
    <toy-list v-if="toysToShow" @remove="removeToy" :toys="toysToShow" />
    <div class="pagination">
      <el-pagination background @current-change="setPage" layout="prev, pager, next" :total="50"> </el-pagination>
    </div>
  </section>
</template>

<script>
import toyList from "@/cmps/toy-list.vue";
import toyFilter from "@/cmps/toy-filter.vue";

export default {
  computed: {
    toysToShow() {
      return this.$store.getters.toysForDisplay;
    },
  },
  methods: {
    removeToy(toyId) {
      this.$store.dispatch({ type: "removeToy", toyId });
    },
    setPage(page) {
      this.$store.commit({ type: 'setPage', pageIdx: page - 1 });
    },
  },
  components: {
    toyList,
    toyFilter,
  },
};
</script>