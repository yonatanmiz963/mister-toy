<template>
  <section class="toy-preview flex align-center column">
    <h3 class="toy-name">{{ toy.name }}</h3>
    <h3>{{ price }}</h3>
    <h3>{{ toy.type }}</h3>
    <h3>{{ inStock }}</h3>
    <div class="preview-btns flex align-center">
      <el-button
        v-if="admin"
        @click="editToy"
        type="primary"
        icon="el-icon-edit"
      ></el-button>
      <el-button
        @click="showDetails"
        type="primary"
        icon="el-icon-info"
      ></el-button>
      <el-button
        v-if="admin"
        @click="remove"
        type="primary"
        icon="el-icon-delete"
      ></el-button>
    </div>
  </section>
</template>



<script>
export default {
  props: ["toy"],
  methods: {
    async remove() {
      this.$confirm(
        "Sure you want to delete this toy?",
        "Warning",
        {
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          type: "warning",
        }
      )
        .then(() => {
          this.$emit("remove", this.toy._id);
          this.$message({
            type: "success",
            message: "Delete completed.",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled.",
          });
        });
    },
    editToy() {
      this.$router.push(`/toy/edit/${this.toy._id}`);
    },
    showDetails() {
      this.$router.push(`/toy/${this.toy._id}`);
    },
  },
  computed: {
    inStock() {
      return this.toy.inStock ? "In stock" : "Out of stock";
    },
    price() {
      return new Intl.NumberFormat("il-IL", {
        style: "currency",
        currency: "ILS",
      }).format(this.toy.price);
    },
    admin() {
      return this.$store.getters.admin;
    },
  },
};
</script>