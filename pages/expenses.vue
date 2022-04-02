<template>
  <amplify-authenticator>
    <div>
      <div class="flex">
        <Sidebar />

        
      </div>
      <amplify-sign-out></amplify-sign-out>
    </div>
  </amplify-authenticator>

</template>

<script>
import { Auth } from 'aws-amplify';


export default {
    data() {
        return {
            
        }
    },
    async mounted() {
        console.log(await (await Auth.currentSession()).getAccessToken().getJwtToken())
    }
}
</script>
