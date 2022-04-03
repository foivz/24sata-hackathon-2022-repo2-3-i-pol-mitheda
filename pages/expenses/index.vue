<template>
  <div class="h-full w-full m-8 z-50">
    <div class="m-8 flex items-center">
      <p
        class="font-extrabold text-4xl mr-4 text-white"
        style="margin-bottom: 0px"
      >
        All Expenses
      </p>
      <v-icon color="#ffffff" class="absolute">mdi-image</v-icon>
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
            label="Search"
            class="mx-4"
          ></v-text-field>
        </template>
      </v-data-table>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 m-8">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn depressed color="primary" dark v-bind="attrs" v-on="on">
            Add expense
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Add expense</span>
          </v-card-title>

          <v-card-title>
            <form @change="upload">
              <input
                type="file"
                ref="getFile"
                style="display: none"
                name="thefile"
              />
            </form>
            <v-btn color="blue darken-1" text @click="$refs.getFile.click()">
              Pre-fill from invoice
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Category"
                    required
                    v-model="newExpense.category"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Merchant"
                    v-model="newExpense.merchant"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Date"
                    v-model="newExpense.date"
                  ></v-text-field>
                </v-col>
              </v-row>
              <p v-if="newExpense.expense_items.length > 0">Items</p>
              <v-row
                v-for="(item, index) in newExpense.expense_items"
                :key="index"
              >
                <v-col cols="12" sm="6" md="5">
                  <v-text-field
                    label="Title"
                    required
                    v-model="item.title"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Amount"
                    v-model="item.amount"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Price"
                    v-model="item.price"
                  ></v-text-field>
                </v-col>

                <div class="flex justify-center items-center">
                  <v-icon @click="deleteItem(index)" class="cursor-pointer"
                    >mdi-delete</v-icon
                  >
                </div>
              </v-row>
              <v-row>
                <v-btn color="blue darken-1" text @click="addNewItem">
                  New item
                </v-btn>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="
                dialog = false;
                saveExpense();
              "
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

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
        category: "",
        merchant: "",
        date: "",
        expense_items: [],
      },
    };
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
        el.total = el.expense_item.reduce((accumulator, val) => {
          return accumulator + val.price;
        }, 0);
        el.expense_item = el.expense_item.map((itm) => {
          itm.priceHRK = itm.price + " HRK";
          return itm;
        });
        el.totalHRK = el.total + " HRK";
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
          text: "Category",
          value: "category",
        },
        {
          text: "Date",
          value: "date",
        },
        {
          text: "Total",
          value: "totalHRK",
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
          value: "priceHRK",
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
    deleteItem(index) {
      this.newExpense.expense_items.splice(index, 1);
    },
    async upload(event) {
      event.preventDefault();
      let formData = new FormData();
      console.log(this.$refs.getFile.files[0]);
      formData.append("thefile", this.$refs.getFile.files[0]);

      const { data: response } = await this.$axios.post("/api/scan", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      this.newExpense.date = response.date || this.newExpense.date;
      this.newExpense.merchant = response.merchant || this.newExpense.merchant;
      this.newExpense.expense_items = response.items;
    },
    async saveExpense() {
      const { data: response } = await this.$axios.post("/api/expenses", {
        token: this.$store.state.user.token,
        merchant: this.newExpense.merchant,
        date: this.newExpense.date,
        category: this.newExpense.category,
        items: this.newExpense.expense_items,
        isShoppingList: 0,
      });

      console.log(response);
    },
  },
};
</script>

<style></style>
