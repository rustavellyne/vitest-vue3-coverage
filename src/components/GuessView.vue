<template>
  <ul class="word">
    <li
        v-for="(letter, index) in guess.padEnd(WORD_SIZE, ' ')"
        :key="`${letter}-${index}`"
        :data-letter="letter"
        class="letter"
    >{{ letter }}</li>
  </ul>
</template>

<script setup lang="ts">
import {WORD_SIZE} from '@/settings.ts';

defineProps<{guess: string}>();
</script>

<style scoped>
.word {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 0.25rem;
}
.letter {
  background-color: #ffffff;
  border: 1px solid hsl(0, 0%, 70%);
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bolder;

  &:not([data-letter=" "]) {
    animation: pop 0.1s;
  }
}
@keyframes pop {
  0% { transform: scale(1) }
  100% { transform: scale(1.4) }
}
</style>