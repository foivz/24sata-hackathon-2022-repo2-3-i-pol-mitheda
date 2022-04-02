<!-- custom made input field with Vuetify Datepicker modal
https://vuetifyjs.com/en/components/date-pickers/ -->

<template>
  <div class="date-picker">
    <v-dialog
        ref="dialog"
        v-model="date_modal"
        :return-value.sync="date_value"
        persistent
        width="290px">

      <template v-slot:activator="{ on, attrs }">
        <div class="input-container">
          <input
              type="text"
              :placeholder="$t('form.placeholder.date')"
              readonly
              v-model="date_value"
              v-bind="attrs"
              v-on="on">
        </div>
      </template>

      <v-date-picker
          v-model="date_value"
          color="#000000"
          scrollable>

        <v-spacer></v-spacer>

        <v-btn
            text
            color="color__primary"
            @click="date_modal = false">
          {{ $t('general.button.cancel') }}
        </v-btn>

        <v-btn
            text
            color="color__primary"
            @click="$refs.dialog.save(date_value)">
          {{ $t('general.button.ok') }}
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
  }
}
</script>
