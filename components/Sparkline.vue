<template>
  <v-sparkline
      :value="value"
      :gradient="gradient"
      :smooth="radius || false"
      :padding="padding"
      :line-width="width"
      :stroke-linecap="lineCap"
      :gradient-direction="gradientDirection"
      :fill="fill"
      :type="type"
      :auto-line-width="autoLineWidth"
      auto-draw
    >
    <template v-slot:label="item">
              ${{ item.value }}
        </template>
    </v-sparkline>
</template>

<script>
const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'],
]

export default {
    data(){
        return{
            width: 2,
            radius: 10,
            padding: 8,
            lineCap: 'round',
            selectedGradient: gradients[4],
            gradients,
            value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
            gradientDirection: 'top',
            fill: false,
            type: 'trend',
            autoLineWidth: false,
        }
    }
}
</script>

<style>

</style>