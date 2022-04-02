<template>
    <div class="h-full w-full">
        <div class="m-4 p-4 grid grid-cols-6 gap-4 bg-gray-200 rounded-3xl p-4">
            <DatePicker @input="(e) => selectedDate = e" class="col-span-2"/>
        </div>
        <div class="m-4 p-4 grid grid-cols-6 gap-4 bg-gray-200 rounded-3xl p-12">
            <DoughnutChart />
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{ 
            selectedDate: null
        }
    }
}
</script>

<style>

</style>

