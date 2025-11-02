<template>
  <div>
    <ul class="guesses">
      <li
        v-for="guess in guessesSubmitted"
        :key="guess"
        class="guesses__item"
      >
        <guess-view :guess />
      </li>
    </ul>
    <guess-input
      :disabled="isGameOver"
      @guess-submitted="guess => guessesSubmitted.push(guess)"
    />
    <template v-if="isGameOver">
      <p class="end-of-game-message"> {{ rightGuess ? VICTORY_MESSAGE : DEFEAT_MESSAGE }} </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import {DEFEAT_MESSAGE, MAX_GUESSES_COUNT, VICTORY_MESSAGE} from '@/settings';
import dictionary from '@/englishWordsWith5Letters.json';
import GuessInput from '@/components/GuessInput.vue';
import GuessView from '@/components/GuessView.vue';

const props = defineProps({
  wordOfTheDay: {
    type: String,
    required: true,
    validator: (wordGiven: string): boolean => dictionary.includes(wordGiven)
  }
})
const guessesSubmitted = ref<string[]>([]);
const rightGuess = computed(() => guessesSubmitted.value.includes(props.wordOfTheDay));
const isGameOver = computed(() => rightGuess.value || guessesSubmitted.value.length === MAX_GUESSES_COUNT)

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

.guesses {
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}
</style>
