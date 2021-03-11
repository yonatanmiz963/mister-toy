<template>
  <div id="app">
    <header>
      <div class="header-container common-width flex align-center space-between"> 
        <h1 class="header-logo">misterToy</h1>
        <nav class="">
          <router-link to="/toy/edit">Add Toy</router-link> |
          <router-link to="/toy">Toys</router-link> |
          <router-link to="/dashboard">Dashboard</router-link> |
          <router-link to="/">Home</router-link> 
        </nav>
      </div>
    </header>
    <router-view />
    <footer class="flex align-center justify-center">
      <h5>©copyrights</h5>
    </footer>
  </div>
</template>


<script>
export default {
  created() {
    this.$store.dispatch({ type: "loadToys" });
  },
};
</script>

