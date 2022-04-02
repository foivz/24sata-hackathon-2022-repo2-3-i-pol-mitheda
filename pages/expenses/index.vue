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
      </v-data-table>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Open Dialog
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">User Profile</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Title"
                      required
                      v-model="newExpense.title"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Merchant"
                      v-model="newExpense.merchant"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <p v-if="newExpense.expense_items.length > 0">Items</p>
                <v-row v-for="item in newExpense.expense_items" :key="item.id">
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Title"
                      required
                      v-model="item.title"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Amount"
                      v-model="item.amount"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Price"
                      v-model="item.price"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-btn color="blue darken-1" text @click="addNewItem">
                    New item
                  </v-btn>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
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
      expenses: [],
      selectedExpenses: [],
      dialog: false,
      newExpense: {
        newId: 0,
        title: "",
        merchant: "",
        expense_items: [],
      },
    };
  },
  async mounted() {
    this.$nextTick(async () => {
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
    addNewItem() {
      this.newExpense.expense_items.push({ title: "", amount: "", price: "" });
    },
  },
};
</script>
