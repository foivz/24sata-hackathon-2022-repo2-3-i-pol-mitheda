<template>
    <div class="h-full w-full">
        <div class="mb-16">
            <div class="m-8 px-4 py-2 gap-8 bg-white rounded-3xl w-64" style="box-shadow: 0 0 2rem 0 rgb(136 152 170 / 15%);">
                <DatePicker @input="(e) => selectedDate = e" class="col-span-2"/>
            </div>
        </div>
        <div class="m-8 flex items-center">
            <p class="font-extrabold text-xl mr-4" style="margin-bottom: 0px">Dashboard</p>
            <v-icon color="#5b9fd1" class="absolute">mdi-home</v-icon>
        </div>
        <div class="m-8 grid grid-cols-6 gap-8">
            <DoughnutChart class="col-span-2 bg-white rounded-lg p-12"/>
            <div class="col-span-4 bg-white rounded-lg p-12">
                <Sparkline />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{ 
            selectedDate: null,
        }
    }
}
</script>

<style>

</style>

