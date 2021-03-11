<template>
  <el-select @change="setSort" v-model="value">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "Name",
          label: "Name",
        },
        {
          value: "Price",
          label: "Price",
        }
      ],
      value: "Name",
    };
  },
  methods: {
    setSort() {
      this.$emit('setSort', this.value)
    }
  }
};
</script>