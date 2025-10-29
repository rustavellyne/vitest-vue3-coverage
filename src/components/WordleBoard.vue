<template>
  <input type="text" />
  <p> You Won!</p>
</template>

<script setup lang="ts">
defineProps<{
  wordOfTheDay: string
}>()
</script>
