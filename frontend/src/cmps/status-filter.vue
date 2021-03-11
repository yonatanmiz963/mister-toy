<template>
  <el-select @change="setStatus" v-model="value">
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
          value: "All",
          label: "All",
        },
        {
          value: "In stock",
          label: "In stock",
        },
        {
          value: "Out of stock",
          label: "Out of stock",
        },
      ],
      value: "All",
    };
  },
  methods: {
    setStatus() {
      this.$emit('setStatus', this.value)
    }
  }
};
</script>