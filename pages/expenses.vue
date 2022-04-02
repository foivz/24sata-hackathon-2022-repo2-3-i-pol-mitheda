<template>
    <div class="flex-initial">
        

    
    </div>

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
