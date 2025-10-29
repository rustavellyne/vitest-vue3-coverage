<template>
  <input
    v-model="guessInProgress"
    @keydown.enter="guessSubmitted = guessInProgress"
    type="text"
  />
  <template v-if="guessSubmitted.length > 0 ">
    <p v-if="guessSubmitted === wordOfTheDay"> {{ VICTORY_MESSAGE }} </p>
    <p v-else>{{ DEFEAT_MESSAGE }}</p>
  </template>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { VICTORY_MESSAGE, DEFEAT_MESSAGE } from '@/settings';
import dictionary from '@/englishWordsWith5Letters.json';


defineProps({
  wordOfTheDay: {
    type: String,
    validator: (wordGiven: string): boolean =>
        wordGiven.length === 5
        && wordGiven.toUpperCase() === wordGiven
        && dictionary.includes(wordGiven)
  }
})

const guessInProgress: Ref<string> = ref('');
const guessSubmitted: Ref<string> = ref('');

</script>
