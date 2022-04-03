<template>
  <div class="h-full w-full z-50">
    <div class="mb-16 flex items-center">
      <div
        class="m-8 px-4 py-2 gap-8 bg-white rounded-3xl w-64"
        style="box-shadow: 0 0 2rem 0 rgb(136 152 170 / 15%)"
      >
        <DatePicker @input="(e) => (selectedDate = e)" class="col-span-2" />
      </div>
      <v-btn class="mx-2" fab dark color="teal" @click="gridView = !gridView">
        <v-icon dark> mdi-format-list-bulleted-square </v-icon>
      </v-btn>
    </div>
    <div class="m-8 flex items-center">
      <p
        class="font-extrabold text-2xl mr-4 text-white"
        style="margin-bottom: 0px"
      >
        Dashboard
      </p>
      <v-icon color="#ffffff" class="absolute">mdi-home</v-icon>
    </div>
    <div
      class="m-8 grid gap-8"
      :class="{ 'grid-cols-8': gridView, 'grid-cols-1': !gridView }"
    >
      <v-card elevation="2" class="col-span-3">
        <DoughnutChart
          class="bg-white rounded-lg m-4"
          :total="total"
          :numbers="sparklineNumbers"
        />
      </v-card>
      <v-card
        v-show="sparklineNumbers.length > 0"
        elevation="2"
        class="col-span-5 p-8"
      >
        <v-card-title>
          <v-icon
            :color="checking ? 'red lighten-2' : 'indigo'"
            class="mr-12"
            size="64"
          >
            mdi-currency-usd
          </v-icon>
          <v-row align="start">
            <div class="text-caption grey--text text-uppercase">
              Total expense
            </div>
            <div>
              <span
                v-if="total"
                class="text-h3 font-weight-black"
                v-text="total"
              ></span>
              <!-- <strong v-if="total">BPM</strong> -->
            </div>
          </v-row>

          <v-spacer></v-spacer>

          <v-btn icon class="align-self-start" size="28">
            <v-icon>mdi-arrow-right-thick</v-icon>
          </v-btn>
        </v-card-title>

        <v-sheet color="transparent">
          <v-sparkline
            :smooth="16"
            :gradient="['#f72047', '#ffd200', '#1feaea']"
            :line-width="3"
            :value="sparklineNumbers"
            auto-draw
            stroke-linecap="round"
          >
            <template v-slot:label="item"> ${{ item.value }} </template>
          </v-sparkline>
        </v-sheet>
        <div class="flex justify-center items-center w-full h-32">
          <div class="text-h4 font-weight-thin">
            Expenses {{ selectedDate }}
          </div>
        </div>
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
      sparklineNumbers: [],
    };
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format("YYYY-MM-DD");
    },
    getSparklineNumbers() {
      let numbers = [];
      let sum;
      this.dates.forEach((el) => {
        sum = 0;
        el.expense_item.forEach((ex_el) => {
          sum += ex_el.price;
        });
        numbers.push(sum);
      });
      this.sparklineNumbers = numbers;
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
      this.sparklineNumbers.forEach((el) => (sum += el));
      return Math.round(sum);
    },
  },
  watch: {
    selectedDate: {
      handler() {
        console.log("yo");

        let newDates = [];
        this.expenses.forEach((el) => {
          console.log(el.date);
          console.log(this.isDateBetween(el.date));
          if (this.isDateBetween(el.date)) {
            newDates.push(el);
          }
        });
        this.dates = newDates;
        this.getSparklineNumbers();
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
        console.log(el.date);
        console.log(this.isDateBetween(el.date));
        if (this.isDateBetween(el.date)) {
          newDates.push(el);
        }
      });
      this.dates = newDates;
      this.getSparklineNumbers();
    });
  },
};
</script>

<style></style>
