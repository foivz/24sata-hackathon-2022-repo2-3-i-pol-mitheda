<template>
  <v-app class="wrapper">
    <amplify-authenticator>
      <div class="flex bg-gray-100">
        <Sidebar />
        <Nuxt />
      </div>
    </amplify-authenticator>
  </v-app>
</template>
<script>
import { Auth } from "aws-amplify";

export default {
  data() {
    return {};
  },
  async mounted() {
    const userObj = sessionStorage.getItem("userObj");
    if (!userObj) {
      var resultData = await Auth.currentSession();
      sessionStorage.setItem("userObj", JSON.stringify(resultData));
    } else {
      var resultData = JSON.parse(userObj);
    }
    this.$store.commit("user/set", resultData);
  },
};
</script>
