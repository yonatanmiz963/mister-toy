<template>
  <section class="toy-edit flex column justify-center">
    <form
      class="edit-form flex column"
      v-if="toyToEdit"
      @submit.prevent="setToy"
    >
      <h2>{{ editTitle }}</h2>
      <ValidationProvider rules="alpha" v-slot="{ errors }">
        <el-input
          type="text"
          ref="nameInput"
          placeholder="Toy Name"
          v-model="toyToEdit.name"
        ></el-input>
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
      <el-input
        type="number"
        placeholder="Price"
        v-model="toyToEdit.price"
      ></el-input>
      <el-input
        type="text"
        placeholder="Type"
        v-model="toyToEdit.type"
      ></el-input>
      <button>Save</button>
    </form>
    <router-link class="back-btn" to="/toy">Back</router-link>
  </section>
</template>

<script>
import { toyService } from "../services/toy.service.js";
import { extend } from "vee-validate";
import { ValidationProvider } from "vee-validate";
import { required, alpha } from "vee-validate/dist/rules";

extend("alpha", alpha);
extend("required", required);

export default {
  data() {
    return {
      toyToEdit: null,
    };
  },
  created() {
    this.getToy();
  },
  methods: {
    async getToy() {
      try {
        const toyId = this.$route.params.toyId;
        if (toyId) {
          const toy = await toyService.getById(toyId);
          this.toyToEdit = toy;
        } else {
          const toy = await toyService.getEmptytoy();
          this.toyToEdit = toy;
        }
      } catch (err) {
        console.log("err:", err);
        this.$message.error("Couldn't load toy, please try again.");
      }
    },
    async setToy() {
      try {
        if (!this.toyToEdit._id) this.toyToEdit.createdAt = Date.now();
        await this.$store.dispatch({
          type: "setToy",
          savedToy: JSON.parse(JSON.stringify(this.toyToEdit)),
        });
        this.$router.push("/toy");
        this.$message({
          message: "Toy was editted/added successfully.",
          type: "success",
        });
      } catch (err) {
        console.log("err:", err);
        this.$message.error("Toy wasn't editted/added, please try again.");
      }
    },
  },
  computed: {
    editTitle() {
      return this.toyToEdit._id ? "Edit toy" : "Add toy";
    },
  },
  mounted() {},
  components: {
    ValidationProvider,
  },
};
</script>