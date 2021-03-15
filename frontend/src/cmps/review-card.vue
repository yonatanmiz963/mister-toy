<template>
  <div class="review-card align-center">
    <h4 class="review-time">{{ reviewTime }}</h4>
    <h3>{{ review.content }}</h3>
    <h4> by: {{ owner }}</h4>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  props: ['review'],
    computed: {
        reviewTime() {
            return moment(this.review.createdAt).fromNow()
        },
        owner() {
          return this.review.user.nickname
        }
    }
};
</script>

<style>
</style>