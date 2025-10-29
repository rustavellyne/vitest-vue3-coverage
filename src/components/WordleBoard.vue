<template>
  <input
    v-model="formattedGuessInProgress"
    @keydown.enter="guessSubmitted = guessInProgress"
    type="text"
  />
  <template v-if="guessSubmitted.length > 0 ">
    <p v-if="guessSubmitted === wordOfTheDay"> {{ VICTORY_MESSAGE }} </p>
    <p v-else>{{ DEFEAT_MESSAGE }}</p>
  </template>
</template>

<script setup lang="ts">
import {computed, ref, type Ref} from 'vue';
import {VICTORY_MESSAGE, DEFEAT_MESSAGE, WORD_SIZE} from '@/settings';
import dictionary from '@/englishWordsWith5Letters.json';

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (wordGiven: string): boolean => dictionary.includes(wordGiven)
  }
})

const guessInProgress: Ref<string> = ref('');
const guessSubmitted: Ref<string> = ref('');
const formattedGuessInProgress = computed({
  get () {
    return guessInProgress;
  },
  set (raw: string) {
    guessInProgress.value = raw.slice(0, WORD_SIZE);
  }
})

</script>
