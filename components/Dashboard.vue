<template>
    <div class="h-full w-full">
        <div class="m-4 p-4 gap-4 bg-white rounded-3xl p-4 w-64">
            <DatePicker @input="(e) => selectedDate = e" class="col-span-2"/>
        </div>
        <div class="m-4 grid grid-cols-6 gap-4">
            <DoughnutChart class="col-span-3 bg-white rounded-3xl p-12"/>
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

