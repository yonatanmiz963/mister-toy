<template>
  <section class="toy-edit flex column justify-center">
    <form class="edit-form flex column" v-if="toyToEdit" @submit.prevent="setToy">
          
      <ValidationProvider rules="alpha" v-slot="{ errors }">
          <el-input type="text"  ref="input" placeholder="Toy Name" v-model="toyToEdit.name"></el-input>
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
       <el-input type="number" placeholder="Price" v-model="toyToEdit.price"></el-input>
       <el-input type="text" placeholder="Type" v-model="toyToEdit.type"></el-input>
      <button>Save</button>
    </form>
    <router-link class="back-btn" to="/toy">Back</router-link>
  </section>
</template>

<script>
import { toyService } from "../services/toy.service.js";
import { extend } from "vee-validate";
import { ValidationProvider } from "vee-validate";
import { required, alpha } from 'vee-validate/dist/rules';

extend('alpha', alpha);
extend('required', required)

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
    getToy() {
      const toyId = this.$route.params.toyId;
      if (toyId) {
        toyService
          .getById(toyId)
          .then((toy) => {
            this.toyToEdit = toy;
          })
          .then(() => this.$refs.input.focus());
      } else {
        toyService
          .getEmptytoy()
          .then((toy) => {
            this.toyToEdit = toy;
          })
          .then(() => this.$refs.input.focus());
      }
    },
    setToy() {
      if (!this.toyToEdit._id) this.toyToEdit.createdAt = Date.now();
      this.$store
        .dispatch({
          type: "setToy",
          savedToy: JSON.parse(JSON.stringify(this.toyToEdit)),
        })
        .then((savedToy) => {
          // console.log('savedtoy:', savedToy)
          // showMsg('Saved toy successfully')
          this.$router.push("/toy");
        })
        .catch((err) => {
          console.log("err:", err);
          // showMsg('Cannot save toy', 'danger')
        });
    },
  },
  computed: {},
  mounted() {},
  components: {
    ValidationProvider,
  },
};
</script>