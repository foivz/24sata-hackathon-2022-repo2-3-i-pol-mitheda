<template>
  <div class="h-full w-full z-50">
    <div class="mb-16 flex items-center">

    </div>
    <div class="m-8 flex items-center">
      <p
        class="font-extrabold text-2xl mr-4 text-white"
        style="margin-bottom: 0px"
      >
        Finanko
      </p>
      <v-icon color="#ffffff" class="absolute">mdi-home</v-icon>
    </div>

    <div
      class="m-8 grid gap-8"
      :class="{ 'grid-cols-8': gridView, 'grid-cols-1': !gridView }"
    >
      <v-card elevation="2" class="col-span-3">
      <div
        class="m-8 px-4 py-2 gap-8 bg-white rounded-3xl w-64"
        style="box-shadow: 0 0 2rem 0 rgb(136 152 170 / 15%)"
      >
        <DatePicker @input="(e) => (selectedDate = e)" class="col-span-2" />
      </div>
        <DoughnutChart
          class="bg-white rounded-lg m-4"
          :total="total"
          :numbers="sparklineNumbers"
        />
      </v-card>
      <v-card
        elevation="2"
        class="col-span-5 p-8"
      >
        <LineChart
          class="bg-white rounded-lg m-4"
          :data="expenses"
        />
      </v-card>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export default {
  data() {
    return {
      selectedDate: [],
      showMenu: false,
      gridView: true,
      expenses: [],
      checking: false,
      dates: [],
      sparklineNumbers: {},
    };
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format("YYYY-MM-DD");
    },
    updateChartData() {
      let breakdown = {}
      this.dates.forEach((el) => {
        breakdown[el.category] = 0
        el.expense_item.forEach((ex_el) => {
          breakdown[el.category] += ex_el.price * ex_el.amount;
        });
        if (breakdown[el.category] === 0) {
          delete breakdown[el.category]
        }
      });
      this.sparklineNumbers = breakdown;
    },
    isDateBetween(date) {
      if (this.selectedDate.length == 1) {
        return date == this.selectedDate;
      } else {
        if (date >= this.selectedDate[0] && date <= this.selectedDate[1]) {
          return true;  
        } else {
          return false;
        }
        /* return dayjs(date).isBetween(
          this.selectedDate[0],
          this.selectedDate[1],
          null,
          "[)"
        ); */
      }
    },
  },
  computed: {
    getSelectedDates() {
      if (this.selectedDate.length == 1) {
        return "Expenses on" + this.selectedDate[0];
      } else {
        return (
          "Expenses between: " +
          this.selectedDate[1] +
          "-" +
          this.selectedDate[0]
        );
      }
    },
    total() {
      let sum = 0;
      Object.keys(this.sparklineNumbers).forEach(key => {
        sum += this.sparklineNumbers[key] 
      })
      return sum
    },
  },
  watch: {
    selectedDate: {
      handler() {
        let newDates = [];
        this.expenses.forEach((el) => {
          if (this.isDateBetween(el.date)) {
            newDates.push(el);
          }
        });
        this.dates = newDates;
        this.updateChartData();
      },
      deep: true,
    },
  },
  async mounted() {
    this.$nextTick(async () => {
      const expensesx = await this.$axios.$get("/api/expenses/user", {
        params: {
          token: this.$store.state.user.token,
        },
      });
      this.expenses = expensesx.map((el) => {
        el.date = this.formatDate(el.date);
        el.created_at = this.formatDate(el.created_at);
        return el;
      });

      let newDates = [];
      this.expenses.forEach((el) => {
        if (this.isDateBetween(el.date)) {
          newDates.push(el);
        }
      });
      this.dates = newDates;
      this.updateChartData();
    });
  },
};
</script>

<style></style>
