<template>
  <input
    v-model="formattedGuessInProgress"
    @keydown.enter="onSubmitted"
    type="text"
    :maxlength="WORD_SIZE"
  />
  <template v-if="guessSubmitted.length > 0 ">
    <p v-if="guessSubmitted === wordOfTheDay"> {{ VICTORY_MESSAGE }} </p>
    <p v-else>{{ DEFEAT_MESSAGE }}</p>
  </template>
</template>

<script setup lang="ts">
import {computed, nextTick, ref} from 'vue';
import { DEFEAT_MESSAGE, VICTORY_MESSAGE, WORD_SIZE } from '@/settings';
import dictionary from '@/englishWordsWith5Letters.json';

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (wordGiven: string): boolean => dictionary.includes(wordGiven)
  }
})

const guessInProgress = ref<string|null>(null);
const guessSubmitted = ref<string>('');
const formattedGuessInProgress = computed<string>({
  get () {
    return guessInProgress.value ?? '';
  },
  set (raw: string) {
    guessInProgress.value = null;
    guessInProgress.value = raw
      .slice(0, WORD_SIZE)
      .toUpperCase()
      .replace(/[^A-Z]+/gi, '');
  }
})

function onSubmitted () {
  if (!dictionary.includes(formattedGuessInProgress.value)) {
    return;
  }
  guessSubmitted.value = formattedGuessInProgress.value;
}

</script>
