
<template>
  <div class="review-list flex common-width align-center justify-center">
    <section v-if="reviews" class="review-list-container">
        <div class="flex space-between" v-for="review in reviews" :key="review._id">
            <h1> {{review.content}}  </h1>
            <h2 @click="showUser(review.user._id)"> by: {{review.user.nickname}} </h2>
        </div>
      <!-- <review-preview
        @remove="remove"
        v-for="(review, idx) in reviews"
        :key="idx"
        :review="review"
      /> -->
    </section>
  </div>
</template>


<script>
// import reviewPreview from "./review-preview.vue";

export default {
  methods: {
    remove(reviewId) {
      this.$emit("remove", reviewId);
    },
    showUser(userId) {
        this.$router.push(`/user/${userId}`)
    }
  },
  computed: {
      reviews() {
          return this.$store.getters.reviewsForDisplay
      }
  },
  created() {
      this.$store.dispatch({ type: 'loadReviews'})
  },
  components: {
    // reviewPreview,
  },
};
</script>