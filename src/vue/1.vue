<script setup lang="ts">
const color = ref('red')
const move = ref(10)
const add = () => move.value += 10
</script>

<template>
  <div class="color">
    color
  </div>
  <div class="move" @click="add">
    move
  </div>
</template>

<style scoped>
.color {
  color: v-bind(color)
}

.move {
  transform: translateX(v-bind(move)px);
  width: v-bind(move) * 10px;
  height: calc(v-bind(move) * 10px)
}
</style>
