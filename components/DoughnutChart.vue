<template>
  <div class="relative">
    <div
      class="absolute w-full h-full flex flex-col items-center justify-center"
    >
      <p class="text-2xl font-bold" style="margin-bottom: 0px">Total:</p>
      <p class="text-5xl font-bold" style="margin-bottom: 0px">
        {{ total }}
      </p>
    </div>
    <canvas ref="myChart" width="400" height="400"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  props: {
    total: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    this.$nextTick(() => {
      const ctx = this.$refs.myChart.getContext("2d");
      console.log(this.$refs.myChart);
      const myChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Red", "Blue", "Yellow"],
          datasets: [
            {
              label: "My First Dataset",
              data: [300, 50, 100],
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
              ],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });
  },
  computed: {
    calculateChange() {
      return true;
    },
  },
};
</script>
<style></style>
