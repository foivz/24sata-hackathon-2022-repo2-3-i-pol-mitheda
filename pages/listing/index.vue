<template>
  <div class="h-full w-full m-8 z-50 grid md:grid-cols-5">
    <div class="md:col-span-5">
      <div class="m-8 flex items-center">
        <p
          class="font-extrabold text-4xl mr-4 text-white"
          style="margin-bottom: 0px"
        >
          Add listing
        </p>
        <v-icon color="#ffffff" class="absolute">mdi-paperclip</v-icon>
      </div>
      <div class="grid gap-4">
        <v-card elevation="2" class="p-8">
          <p class="text-xl" style="margin-bottom: 0px">
            You can list your product here and we are going to recommend it to
            users while they are creating their shopping list.
          </p>
        </v-card>
        <v-card elevation="2" class="p-8">
          <p class="text-xl" style="margin-bottom: 0px">
            Your listing will be confirmed once we receive a deposit.
          </p>
        </v-card>
        <v-card elevation="2" class="p-8">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="10"
              label="Name"
              outlined
              required
            ></v-text-field>

            <v-textarea
              v-model="description"
              :rules="descriptionRules"
              label="Description"
              outlined
              required
            >
            </v-textarea>

            <v-text-field
              v-model="address"
              :rules="descriptionRules"
              label="Address"
              outlined
              required
            ></v-text-field>

            <v-text-field
              v-model="weburl"
              :rules="descriptionRules"
              label="Website URL"
              outlined
              required
            ></v-text-field>

            <v-checkbox
              v-model="freeDelivery"
              label="Free delivery"
            ></v-checkbox>

            <div>
              <p class="my-2" style="margin-bottom: 0px">
                Payment Info: {{ paymentInfo }}
              </p>
              <v-divider></v-divider>
              <p class="my-2" style="margin-bottom: 0px">
                SWIFT/BIC: {{ nekiBrojIdkLol }}
              </p>
              <v-divider></v-divider>
              <p class="my-2" style="margin-bottom: 0px">IBAN: {{ iban }}</p>
            </div>

            <v-snackbar v-model="snackbar">
              {{ text }}

              <template v-slot:action="{ attrs }">
                <v-btn
                  color="pink"
                  text
                  v-bind="attrs"
                  @click="snackbar = false"
                >
                  Close
                </v-btn>
              </template>
            </v-snackbar>

            <v-btn color="success" class="mr-4 mt-4" @click="validate">
              Send
            </v-btn>
          </v-form>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: "",

    description: "",
    descriptionRules: [(v) => !!v || "Description is required"],
    address: "",
    weburl: "",
    freeDelivery: false,
    paymentInfo: "Payment from blekso",
    nekiBrojIdkLol: "123123",
    iban: "HR1210010051863000160",
    snackbar: false,
    text: `Success`,
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
      setTimeout(() => {
        if (this.valid) {
          this.snackbar = true;
        }
      }, 1000);
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style></style>
