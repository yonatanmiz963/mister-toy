<template>
  <div class="review-card align-center">
    <h4 class="review-time">{{ reviewTime }}</h4>
    <h3>{{ review.txt }}</h3>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  props: ['review'],
    computed: {
        reviewTime() {
            return moment(this.review.createdAt).fromNow()
        }
    }
};
</script>

<style>
</style>