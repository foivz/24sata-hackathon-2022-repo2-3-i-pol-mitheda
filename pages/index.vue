<template>
    <div class="h-full w-full z-50">
        <div class="mb-16 flex items-center">
            <div class="m-8 px-4 py-2 gap-8 bg-white rounded-3xl w-64" style="box-shadow: 0 0 2rem 0 rgb(136 152 170 / 15%);">
                <DatePicker @input="(e) => selectedDate = e" class="col-span-2"/>
            </div>
            <v-btn
                class="mx-2"
                fab
                dark
                color="teal"
                @click="gridView = !gridView"
            >
                <v-icon dark>
                mdi-format-list-bulleted-square
                </v-icon>
            </v-btn>
        </div>
        <div class="m-8 flex items-center">
            <p class="font-extrabold text-2xl mr-4 text-white" style="margin-bottom: 0px">Dashboard</p>
            <v-icon color="#ffffff" class="absolute">mdi-home</v-icon>
        </div>
        <div class="m-8 grid gap-8" :class="{'grid-cols-8': gridView, 'grid-cols-1': !gridView}">
            <v-card
            elevation="2"
            class="col-span-3"
            >
                <DoughnutChart class=" bg-white rounded-lg m-4"/>
            </v-card>  
            <v-card
                elevation="2"
                class="col-span-5 p-8"
                >
                <Sparkline />

                
            </v-card> 
            
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{ 
            selectedDate: null,
            showMenu: false,
            items: [
                { title: 'Click Me' },
                { title: 'Click Me' },
                { title: 'Click Me' },
                { title: 'Click Me 2' },
            ],
            gridView: true
        }
    }
}
</script>

<style>

</style>

