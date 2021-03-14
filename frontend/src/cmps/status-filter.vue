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
          value: undefined,
          label: "All",
        },
        {
          value: true,
          label: "In stock",
        },
        {
          value: false,
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