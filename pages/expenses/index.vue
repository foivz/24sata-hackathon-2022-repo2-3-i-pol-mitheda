<template>
  <div class="h-full w-full m-8 z-50">
    <div class="m-8 flex items-center">
      <p
        class="font-extrabold text-2xl mr-4 text-white"
        style="margin-bottom: 0px"
      >
        All Expenses
      </p>
      <v-icon color="#ffffff" class="absolute">mdi-home</v-icon>
    </div>
    <div>
      <v-data-table
        :headers="tableHeaders"
        :items="expenses"
        v-model="selectedExpenses"
        item-key="id"
        class="elevation-1 cursor-pointer"
        :search="search"
        :custom-filter="filterOnlyCapsText"
        show-select
        show-expand
        @click:row="(item, slot) => slot.expand(!slot.isExpanded)"
      >
        <template v-slot:expanded-item="{ item, headers }">
          <td :colspan="headers.length" style="padding: 0px">
            <v-data-table
              hide-default-footer
              :headers="tableExpansionHeaders"
              :items="item.expense_item"
              class="elevation-1 w-full"
            ></v-data-table>
          </td>
        </template>
        <template v-slot:top>
          <v-text-field
            v-model="search"
            label="Search (UPPER CASE ONLY)"
            class="mx-4"
          ></v-text-field>
        </template>
        <template v-slot:body.append>
          <tr>
            <td></td>
            <td>
              <v-text-field
                v-model="calories"
                type="number"
                label="Less than"
              ></v-text-field>
            </td>
            <td colspan="4"></td>
          </tr>
        </template>
      </v-data-table>
    </div>
    <div class="grid grid-cols-6 gap-8 m-8">
      <v-btn depressed color="primary" :disabled="selectedExpenses.length == 0">
        Update
      </v-btn>
      <v-btn depressed color="error" :disabled="selectedExpenses.length == 0">
        Delete
      </v-btn>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      search: "",
      calories: "",
      expenses: [],
      selectedExpenses: [],
    };
  },
  async mounted() {
    this.$nextTick(async () => {
      console.log("TOKEN:" + this.$store.state.user.token);
      console.log();
      const expensesx = await this.$axios.$get("/api/expenses", {
        params: {
          token: this.$store.state.user.token,
        },
      });
      this.expenses = expensesx.map((el) => {
        el.date = this.formatDate(el.date);
        el.created_at = this.formatDate(el.created_at);
        return el;
      });
    });
  },
  computed: {
    tableHeaders() {
      return [
        {
          text: "Merchant",
          value: "merchant",
          align: "start",
          sortable: false,
        },
        {
          text: "Title",
          value: "title",
        },
        {
          text: "Date",
          value: "date",
        },
        { text: "Created At", value: "created_at" },
      ];
    },
    tableExpansionHeaders() {
      return [
        {
          text: "Title",
          align: "start",
          sortable: false,
          value: "title",
        },
        {
          text: "Price",
          value: "price",
        },
        { text: "Amount", value: "amount" },
        { text: "Expense ID", value: "expense_id" },
      ];
    },
  },
  methods: {
    filterOnlyCapsText(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLocaleUpperCase().indexOf(search) !== -1
      );
    },
    formatDate(date) {
      return dayjs(date).format("DD/MM/YYYY");
    },
  },
};
</script>
