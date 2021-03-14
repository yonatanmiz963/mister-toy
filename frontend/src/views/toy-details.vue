<template>
  <section v-if="toy" class="toy-details flex">
    <div class="details-container">
      <h2>{{ toy.name }}</h2>
      <h3>Type: {{ toy.type }}</h3>
      <h3>Price: {{ price }}</h3>
      <h3>Status: {{ inStock }}</h3>
      <h3>Created: {{ createdAt }}</h3>
    </div>

    <div v-if="toyReviews" class="reviews-container">
      <div v-if="loggedUser" class="add-review">
        <h1>Add review</h1>
        <form @submit.prevent="addReview">
          <el-input
            type="text"
            placeholder="Your review.."
            v-model="newReview.txt"
          ></el-input>
        </form>
      </div>

      <div v-if="toyReviews" class="reviews-list">
        <h1>Reviews</h1>
        <review-card
          class="review-card flex"
          v-for="review in toy.reviews"
          :key="review._id"
          :review="review"
        ></review-card>
      </div>
    </div>

    <router-link class="back-btn" to="/toy">Back</router-link>
  </section>
</template>


<script>
import moment from "moment";
import ReviewCard from "../cmps/review-card.vue";

export default {
  data() {
    return {
      toy: null,
      newReview: {
        txt: "",
        createdAt: null,
      },
    };
  },
  methods: {
    getToy(toyId) {
      this.$store
        .dispatch({ type: "getToy", toyId })
        .then((toy) => (this.toy = toy));
    },
    async addReview() {
      try {
        const reviewedToy = await this.$store.dispatch({
          type: "addReview",
          review: this.newReview,
          toyId: this.toy._id,
        });
        this.newReview.txt = "";
        this.toy = reviewedToy;
         this.$message({
          message: "Review was added successfully.",
          type: "success",
        });
      } catch (err) {
        console.log(err);
        this.$message.error("Couldn't add review, please try again.");
      }
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
    toyReviews() {
      if (this.toy.reviews.length) return this.toy.reviews;
    },
    loggedUser() {
      return this.$store.getters.loggedUser;
    },
  },
  created() {
    const toyId = this.$route.params.toyId;
    this.getToy(toyId);
  },
  components: {
      ReviewCard
  }
};
</script>