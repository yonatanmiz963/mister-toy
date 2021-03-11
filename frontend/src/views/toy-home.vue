<template>
<div class="home-container flex column justify-center align-center">
    <h1>Find the most amazing toys in the world!</h1>
    <button @click="showToys">Start Shopping</button>
</div>
</template>


<script>
export default {
    methods: {
        showToys() {
            this.$router.push('/toy');
        }
    }
}
</script>