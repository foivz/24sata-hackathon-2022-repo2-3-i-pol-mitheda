<template>
    <div>
        <canvas ref="myChart" width="400" height="400"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js'

export default {
    mounted(){
        this.$nextTick(() => {
            const ctx = this.$refs.myChart.getContext('2d')
            console.log(this.$refs.myChart)
            const myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: [
                        'Red',
                        'Blue',
                        'Yellow'
                    ],
                    datasets: [{
                        label: 'My First Dataset',
                        data: [300, 50, 100],
                        backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                        ],
                        hoverOffset: 4
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            })
        })
    }
}
</script>
<style>

</style>