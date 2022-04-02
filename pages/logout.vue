<template>
    

</template>
<script>
import { Auth } from "aws-amplify";

export default {
    async mounted() {
        await Auth.signOut()
        sessionStorage.removeItem("userObj")
        this.$store.commit('user/set', {})
        this.$store.commit('user/setToken', "")
        window.location = "/"
    }
}
</script>
