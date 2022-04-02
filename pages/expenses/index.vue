<template>
  <div class="h-full w-full m-8 grid grid-cols-8 z-50">
    <div class="col-span-8">
      <v-data-table
        :headers="headers"
        :items="expenses"
        item-key="id"
        class="elevation-1 cursor-pointer"
        :search="search"
        :custom-filter="filterOnlyCapsText"
        show-expand
        @click:row="(item, slot) => slot.expand(!slot.isExpanded)"
      >
        <template v-slot:expanded-item="{ item, headers }">
          <td :colspan="headers.length" style="padding: 0px">
            <p>{{ item }}</p>
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
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
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
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Date"
                      v-model="newExpense.date"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      calories: "",
      expenses: [],
      dialog: false,
      newExpense: {
        newId: 0,
        title: "",
        merchant: "",
        date: "",
        expense_items: [],
      },
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
      this.expenses = expensesx;
    });
  },
  computed: {
    headers() {
      return [
        {
          text: "title",
          align: "start",
          sortable: false,
          value: "title",
        },
        {
          text: "date",
          value: "date",
          filter: (value) => {
            if (!this.date) return true;

            return value < this.calories;
          },
        },
        { text: "merchant", value: "merchant" },
        { text: "createdat", value: "created_at" },
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
    addNewItem() {
      this.newExpense.expense_items.push({ title: "", amount: "", price: "" });
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
  },
};
</script>

<style></style>
