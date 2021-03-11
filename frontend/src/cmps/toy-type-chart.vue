

<script>
import { Bar } from "vue-chartjs";

export default {
  props: ['toysPrices'],
  extends: Bar,
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: Object.keys(this.toysPrices),
      datasets: [
        {
          label: "Average Price by Toy Type",
          backgroundColor: ["#00C9C8", "#BFFCF9", "#47817F"],
          data: Object.values(this.toysPrices),
        },
      ],
    });
  }
};
</script>