<template>
  <input
    v-model="formattedGuessInProgress"
    @keydown.enter="onSubmitted"
    type="text"
    :maxlength="WORD_SIZE"
  />
</template>

<script setup lang="ts">
import {computed, ref, triggerRef } from 'vue';
import { WORD_SIZE } from '@/settings';
import dictionary from '@/englishWordsWith5Letters.json';

const emit = defineEmits<{
  'guess-submitted': [guess: string]
}>()
const guessInProgress = ref<string>('');
const formattedGuessInProgress = computed<string>({
  get () {
    return guessInProgress.value;
  },
  set (raw: string) {
    guessInProgress.value = raw
      .slice(0, WORD_SIZE)
      .toUpperCase()
      .replace(/[^A-Z]+/gi, '');

    triggerRef(formattedGuessInProgress);
  }
})

function onSubmitted () {
  if (!dictionary.includes(formattedGuessInProgress.value)) {
    return;
  }
  emit('guess-submitted', formattedGuessInProgress.value)
}

</script>
