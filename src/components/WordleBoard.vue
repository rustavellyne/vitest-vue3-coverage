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
import { VICTORY_MESSAGE, DEFEAT_MESSAGE } from '@/settings';
import { ref } from 'vue';

defineProps<{
  wordOfTheDay: string
}>()

const guessInProgress: Ref<string> = ref('');
const guessSubmitted: Ref<string> = ref('');

</script>
