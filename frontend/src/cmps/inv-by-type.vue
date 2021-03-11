

<script>
import { Doughnut } from "vue-chartjs";

export default {
  props: ["typesSum"],
  extends: Doughnut,
  mounted() {
    this.renderChart({
      labels: Object.keys(this.typesSum),
      datasets: [
        {
          label: "Inventory By Type",
          backgroundColor: ["#00C9C8", "#BFFCF9", "#47817F"],
          data: Object.values(this.typesSum),
        },
      ],
    });
  },
};
</script>