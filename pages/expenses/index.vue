<template>
  <div class="h-full w-full m-8 grid grid-cols-8">
    <div class="col-span-8">
     <v-data-table
        :headers="headers"
        :items="expenses"
        item-key="name"
        class="elevation-1"
        :search="search"
        :custom-filter="filterOnlyCapsText"
      >
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      expenses: {}
    }
  },
  async mounted() {
    this.$nextTick(async () => {
      console.log("TOKEN:"+this.$store.state.user.token)
      console.log()
      const expensesx = await this.$axios.$get('/api/expenses', {
        params: {
          token: this.$store.state.user.token
        }
      })
      this.expenses = expensesx
    })
  },
  computed: {
    headers () {
      return [
        {
          text: 'title',
          align: 'start',
          sortable: false,
          value: 'title',
        },
        {
          text: 'date',
          value: 'date',
          filter: value => {
            if (!this.date) return true

            return value < this.calories
          },
        },
        { text: 'merchant', value: 'merchant' },
        { text: 'createdat', value: 'created_at' },
        
      ]
    },
  },
  methods: {
    filterOnlyCapsText (value, search, item) {
      return value != null &&
        search != null &&
        typeof value === 'string' &&
        value.toString().toLocaleUpperCase().indexOf(search) !== -1
    },
  },
}
</script>

<style>

</style>