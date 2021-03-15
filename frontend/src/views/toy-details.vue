<template>
  <section v-if="toy" class="toy-details flex">
    <div class="details-container">
      <h2>{{ toy.name }}</h2>
      <h3>Type: {{ toy.type }}</h3>
      <h3>Price: {{ price }}</h3>
      <h3>Status: {{ inStock }}</h3>
      <h3>Created: {{ createdAt }}</h3>
    </div>

    <div class="reviews-container">
      <div v-if="loggedUser" class="add-review">
        <h1>Add review</h1>
        <form @submit.prevent="addReview">
          <el-input
            type="text"
            placeholder="Your review.."
            v-model="newReview.content"
          ></el-input>
        </form>
      </div>

      <div v-if="reviews" class="reviews-list">
        <h1>Reviews</h1>
        <review-card
          class="review-card flex"
          v-for="review in reviews"
          :key="review._id"
          :review="review"
        ></review-card>
      </div>
    </div>
    <chat @saveMsg="saveMsg" :toyId="toy._id" @closeChat="isChatOpen=false" v-if="isChatOpen && loggedUser" />
    <router-link class="back-btn" to="/toy">Back</router-link>
    <button @click="toggleChat" class="open-chat-btn">Chat</button>
  </section>
</template>


<script>
import moment from "moment";
import reviewCard from "../cmps/review-card.vue";
import chat from "../cmps/chat.vue";

export default {
  data() {
    return {
      reviews: null,
      toy: null,
      newReview: {
        content: '',
        createdAt: null,
        toyId: this.$route.params.toyId,
      },
      isChatOpen: false
    };
  },
  methods: {
    saveMsg(msg) {
      this.$store.dispatch({ type: 'saveMsg', toyId: this.toy._id, msg})
    },
    toggleChat() {
      this.isChatOpen = !this.isChatOpen
    },
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
        });
        this.newReview.content = "";
        this.loadReviews();
        this.$message({
          message: "Review was added successfully.",
          type: "success",
        });
      } catch (err) {
        console.log(err);
        this.$message.error("Couldn't add review, please try again.");
      }
    },
    async loadReviews() {
      try {
        const toyId = this.$route.params.toyId;
        const loadedReviews = await this.$store.dispatch({
          type: "loadReviews",
          filterBy: { toyId, userId: "", searchStr: "" },
        });
        this.reviews = loadedReviews;
      } catch (err) {
        console.log("err:", err);
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
    loggedUser() {
      return this.$store.getters.loggedUser;
    },
  },
  created() {
    const toyId = this.$route.params.toyId;
    this.getToy(toyId);
    this.loadReviews();
  },
  components: {
    reviewCard,
    chat,
  },
};
</script>