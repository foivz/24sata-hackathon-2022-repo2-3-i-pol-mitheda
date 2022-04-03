<template>
  <div class="relative">
    <canvas ref="myChart" width="400" height="400"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
import dayjs from "dayjs";

export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  watch: {
    data: {
      handler() {
        this.refresh();
      },
      deep: true,
    },
  },
  mounted() {
    this.refresh();
  },
  methods: {
    refresh() {
      const perDay = {};
      for (let i = 1; i < 32; i++) {
        perDay[i] = 0;
      }

      this.data.forEach((el) => {
        const date = new Date(el.date);
        if (date.getMonth() === new Date().getMonth()) {
          perDay[date.getDate() + 1] += el.expense_item.reduce(
            (prev, next) => prev + next.amount * next.price,
            0
          );
        }
      });

      this.$nextTick(() => {
        const ctx = this.$refs.myChart.getContext("2d");
        new Chart(ctx, {
          type: "line",
          data: {
            labels: Object.keys(perDay),
            datasets: [
              {
                label: "Monthly breakdown",
                data: Object.values(perDay),
                backgroundColor: "#fff",
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
