
<template>
<div class="toy-list flex common-width align-center justify-center">
  <section class="toy-list-container">
    <toy-preview
      @remove="remove"
      v-for="(toy, idx) in toys"
      :key="idx"
      :toy="toy"
    />
  </section>
</div>
</template>


<script>
import toyPreview from "./toy-preview.vue";

export default {
  props: ["toys"],
  methods: {
    remove(toyId) {
      this.$emit('remove', toyId);
    },
  },
  components: {
    toyPreview,
  },
}
</script>