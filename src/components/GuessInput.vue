<template>
  <div class="user-input">
    <guess-view :guess="formattedGuessInProgress" />
    <input
      v-model="formattedGuessInProgress"
      type="text"
      :maxlength="WORD_SIZE"
      autofocus
      :disabled
      @keydown.enter="onSubmitted"
      @blur="({target}) => (target as HTMLInputElement).focus()"
    />
  </div>

</template>

<script setup lang="ts">
import {computed, ref, triggerRef } from 'vue';
import { WORD_SIZE } from '@/settings';
import dictionary from '@/englishWordsWith5Letters.json';
import GuessView from '@/components/GuessView.vue';

withDefaults(defineProps<{ disabled?: boolean }>(), { disabled: false })
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
  emit('guess-submitted', formattedGuessInProgress.value);
  guessInProgress.value = '';
}
</script>

<style scoped>
input {
  position: absolute;
  opacity: 0;
}
</style>
