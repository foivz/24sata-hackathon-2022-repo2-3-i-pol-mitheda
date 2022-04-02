<template>
  <v-app class="wrapper">
      <amplify-authenticator>
        <div class="flex bg-gray-100 relative min-h-screen" @click="chatOpen = false">
          <div class="bg-green-400 absolute w-full h-64" />
          <Sidebar />
          <Nuxt />
          <div class="bot-float">
            <div :class="{chatBot: true, open: chatOpen}" @click.stop>
              <amplify-chatbot
                  bot-name="BookTrip_dev"
                  bot-title="Chat"
                  welcome-message="Hello, how can I help you?"
                />
            </div>
            <div @click.stop="chatOpen = !chatOpen" class="chat-button" v-if="!chatOpen">
              <v-icon class="mr-1" color="#ccc">mdi-chat</v-icon> <span>Open chat</span>
            </div>
          </div>
        </div>
      </amplify-authenticator>
  </v-app>
</template>
<script>
import { Auth } from "aws-amplify";

export default {
  data() {
    return {
      chatOpen: false
    };
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
<style lang="scss">
  .chatBot {
    visibility: hidden;
    opacity: 0;
    width: 0;
    transition: opacity .2s linear;
    &.open {
      visibility: visible;
      opacity: 1;
      width: auto;
    }
  }
  .bot-float {
    position: fixed;
    right: 10px;
    bottom: 0;
    display: inline-block;
    z-index: 60;
  }
  .chat-button {
    background: #fff;
    font-weight: 700;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
  } 
</style>