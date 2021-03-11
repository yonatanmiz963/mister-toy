
<template>
  <section class="toy-filter flex justify-center align-center">
    <el-input debounce=5000 type="text"  @input="setFilter" ref="filterInput" placeholder="Search a toy" v-model="filterBy.searchStr"></el-input>
    <label>Status: </label>
    <status-filter @setStatus="setStatus" />
    
    <label>Type: </label>
    <type-filter @setType="setType" />

    <label>Sort by: </label>
    <sort-filter @setSort="setSort" />
  </section>
</template>



<script>
// import { toyService } from '../services/toy.service.js'
import statusFilter from "../cmps/status-filter.vue";
import typeFilter from "../cmps/type-filter.vue";
import sortFilter from "../cmps/sort-filter.vue";
// import StatusFilter from '../assets/style/cmps/status-filter.vue'

export default {
  data() {
    return {
      filterBy: {
        searchStr: "",
        status: "All",
        type: "All",
        sortBy: "Name",
      },
    };
  },
  created() {
    // this.setFilter = toyService.debounce(this.setFilter, 1000)
  },
  methods: {
    setFilter() {
      this.$store.commit({
        type: "setFilter",
        filterBy: JSON.parse(JSON.stringify(this.filterBy)),
      });
      this.$store.dispatch({ type: "loadToys" }); // add catch
    },
    setStatus(value) {
      this.filterBy.status = value;
      this.setFilter();
    },
    setType(value) {
      this.filterBy.type = value;
      this.setFilter();
    },
    setSort(value) {
      this.filterBy.sortBy = value;
      this.setFilter();
    },
  },
  computed: {},
  mounted() {
    this.$refs.filterInput.focus();
  },
  components: {
    statusFilter,
    typeFilter,
    sortFilter
  },
}
</script>