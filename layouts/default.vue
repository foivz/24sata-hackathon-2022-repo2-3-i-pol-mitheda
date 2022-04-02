<template>
  <v-app class="wrapper">
      <amplify-authenticator>
        <div class="flex bg-gray-100 relative min-h-screen">
          <div class="bg-green-400 absolute w-full h-64" />
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
    this.$store.commit('user/set', resultData)
    this.$store.commit('user/setToken', resultData.accessToken?.jwtToken)
    console.log(resultData)
  }
}
</script>
