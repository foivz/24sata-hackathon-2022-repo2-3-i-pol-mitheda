<template>
  <div>
    <v-dialog
        ref="dialog"
        v-model="date_modal"
        :return-value.sync="date_value"
        persistent
        width="290px">

      <template v-slot:activator="{ on, attrs }">
        <div class="relative flex">
          <v-icon color="#5b9fd1" class="absolute mr-2">mdi-calendar-range</v-icon>
          <input
              class="w-full appearance-none focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Choose date"
              readonly
              v-model="getShowDate"
              v-bind="attrs"
              v-on="on">
        </div>
      </template>

      <v-date-picker
          v-model="date_value"
          no-title
          scrollable 
          range>

        <v-btn
            text
            color="color__primary"
            @click="date_modal = false">
          Cancel
        </v-btn>

        <v-btn
            text
            color="color__primary"
            @click="$refs.dialog.save(date_value)">
          Ok
        </v-btn>
      </v-date-picker>
    </v-dialog>
  </div>
</template>
<script>

export default {
  name: 'DatePicker',

  watch: {
    date_value: {
      handler(value) {
        this.$emit('input', value)
      }
    }
  },

  data() {
    return {
      date_modal: null,
      date_value: null,
    }
  },

  computed:{
    getShowDate(){
      if(Array.isArray(this.date_value) && this.date_value.length == 2){
        return this.date_value[0] + '-' + this.date_value[1] 
      }
      return this.date_value
    }
  }
}
</script>
