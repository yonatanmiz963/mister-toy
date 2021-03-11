<template>
  <section v-if="toy" class="toy-details flex justify-center column">
    <div class="details-container">
      <h2> {{ toy.name }}</h2>
      <h3>Type: {{ toy.type }}</h3>
      <h3>Price: {{ price }}</h3>
      <h3>Status: {{ inStock }}</h3>
      <h3>Created: {{ createdAt }}</h3>
    </div>
    <router-link class="back-btn" to="/toy">Back</router-link>
  </section>
</template>


<script>
import moment from "moment";

export default {
  data() {
    return {
      toy: null,
    };
  },
  methods: {
    getToy(toyId) {
      this.$store
        .dispatch({ type: "getToy", toyId })
        .then((toy) => (this.toy = toy));
    },
  },
  computed: {
    createdAt() {
      return moment(this.toy.createdAt).fromNow();
    },
    price() {
      return new Intl.NumberFormat("il-IL", {
        style: "currency",
        currency: "ILS",
      }).format(this.toy.price);
    },
    inStock() {
      return this.toy.inStock ? "In stock" : "Out of stock";
    },
  },
  created() {
    const toyId = this.$route.params.toyId;
    // console.log('toyId:', toyId)
    this.getToy(toyId);
  },
};
</script>