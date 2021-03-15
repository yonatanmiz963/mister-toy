<template>
  <section class="user-details">
    <div v-if="user">
      <h1>{{ user.fullname }}</h1>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  methods: {
    async loadUser() {
      try {
        const userId = this.$route.params.userId;
        const requestedUser = await this.$store.dispatch({ type: 'getUser', userId})
        this.user = requestedUser
      } catch (err) {
        console.log("err:", err);
      }
    },
  },
  created() {
    this.loadUser();
  },
};
</script>
