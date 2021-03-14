<template>
  <section class="login flex column align-center">
    <form
      v-if="!loggedUser"
      class="login-form flex column"
      @submit.prevent="login"
    >
      <h1>Login</h1>
      <el-input
        type="text"
        placeholder="username"
        v-model="userToLogin.username"
      ></el-input>
      <el-input
        type="password"
        placeholder="password"
        v-model="userToLogin.password"
      ></el-input>
      <button class="login-btn">Login</button>
    </form>
    <form
      v-if="!loggedUser"
      class="signup-form flex column"
      @submit.prevent="signup"
    >
      <h1>Sign up</h1>
      <el-input
        type="text"
        placeholder="username"
        v-model="newUser.username"
      ></el-input>
      <el-input
        type="text"
        placeholder="full name"
        v-model="newUser.fullname"
      ></el-input>
      <el-input
        type="password"
        placeholder="password"
        v-model="newUser.password"
      ></el-input>
      <button class="signup-btn">Sign Up</button>
    </form>
    <div class="welcome-user" v-if="loggedUser">
      <h2>Hi {{ loggedUser.fullname }}!</h2>
    </div>
    <router-link class="back-btn" to="/toy">Back</router-link>
  </section>
</template>

<script>
import { extend } from "vee-validate";
import { ValidationProvider } from "vee-validate";
import { required, alpha } from "vee-validate/dist/rules";

extend("alpha", alpha);
extend("required", required);

export default {
  data() {
    return {
      userToLogin: {
        username: "",
        password: "",
      },
      newUser: {
        username: "",
        password: "",
        fullname: "",
      },
    };
  },
  created() {},
  methods: {
    async login() {
      await this.$store.dispatch({
        type: "login",
        userToLogin: this.userToLogin,
      });
      this.$router.push("/toy");
      this.$message({
        message: "You have logged in successfully.",
        type: "success",
      });
    },
    signup() {
      this.$store.dispatch({ type: "signup", newUser: this.newUser });
    },
  },
  computed: {
    loggedUser() {
      return this.$store.getters.loggedUser;
    },
  },
  mounted() {},
  components: {
    ValidationProvider,
  },
};
</script>