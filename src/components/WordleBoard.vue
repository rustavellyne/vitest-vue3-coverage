<template>
  <div>
    <guess-input
        @guess-submitted="guess => guessSubmitted = guess"
    />
    <template v-if="guessSubmitted.length > 0 ">
      <p v-if="guessSubmitted === wordOfTheDay"> {{ VICTORY_MESSAGE }} </p>
      <p v-else>{{ DEFEAT_MESSAGE }}</p>
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
