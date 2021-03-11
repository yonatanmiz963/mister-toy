<template>
  <el-select @change="setType" v-model="value">
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
          value: "Funny",
          label: "Funny",
        },
        {
          value: "Adult",
          label: "Adult",
        },
        {
          value: "Educational",
          label: "Educational",
        },
      ],
      value: "All",
    };
  },
  methods: {
    setType() {
      this.$emit('setType', this.value)
    }
  }
};
</script>