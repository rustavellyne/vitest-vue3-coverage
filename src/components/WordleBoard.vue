<template>
  <div>
    <guess-input
        @guess-submitted="guess => guessSubmitted = guess"
    />
    <template v-if="guessSubmitted.length > 0 ">
      <p class="end-of-game-message"> {{ guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE }} </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DEFEAT_MESSAGE, VICTORY_MESSAGE } from '@/settings';
import dictionary from '@/englishWordsWith5Letters.json';
import GuessInput from '@/components/GuessInput.vue';

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (wordGiven: string): boolean => dictionary.includes(wordGiven)
  }
})
const guessSubmitted = ref<string>('');

</script>

<style scoped>
.end-of-game-message {
  margin-top: 3rem;
  font-size: 3rem;
  white-space: nowrap;
  text-align: center;
  animation: end-of-game-message 0.7s forwards;
}

@keyframes end-of-game-message {
  0% {
    opacity: 0;
    transform: rotateZ(0);
  }
  100% {
    opacity: 1;
    transform: translateY(2rem);
  }
}
</style>
