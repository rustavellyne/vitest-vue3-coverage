<template>
  <div class="user-input">
    <ul class="user-input__word">
      <li
        v-for="(letter, index) in formattedGuessInProgress.padEnd(WORD_SIZE, ' ')"
        :key="`${letter}-${index}`"
        :data-letter="letter"
        class="user-input__letter"
      >{{ letter }}</li>
    </ul>
    <input
      v-model="formattedGuessInProgress"
      type="text"
      :maxlength="WORD_SIZE"
      autofocus
      @keydown.enter="onSubmitted"
      @blur="({target}) => (target as HTMLInputElement).focus()"
    />
  </div>

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

<style scoped>
input {
  position: absolute;
  opacity: 0;
}

.user-input {
  .user-input__word {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 0.25rem;
  }
  .user-input__letter {
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
}

@keyframes pop {
  0% { transform: scale(1) }
  100% { transform: scale(1.4) }
}

</style>
