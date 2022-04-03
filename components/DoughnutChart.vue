<template>
  <div class="relative">
    <div
      class="absolute w-full h-full flex flex-col items-center justify-center"
    >
      <p class="text-2xl" style="margin-bottom: 0px">Total:</p>
      <p class="text-3xl font-bold" style="margin-bottom: 0px">
        {{
          new Intl.NumberFormat("hr-HR", {
            style: "currency",
            currency: "HRK",
          }).format(total)
        }}
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
    numbers: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  watch: {
    numbers: {
      handler() {
        this.refresh();
      },
      deep: true,
    },
  },
  methods: {
    refresh() {
      this.$nextTick(() => {
        const ctx = this.$refs.myChart.getContext("2d");
        new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: Object.keys(this.numbers),
            datasets: [
              {
                label: "My First Dataset",
                data: Object.values(this.numbers),
                backgroundColor: Object.values(this.numbers).map((v, i) => {
                  var letters = "0123456789ABCDEF";
                  var color = "#";
                  for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                  }
                  return color;
                }),
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
  },
};
</script>
<style></style>
