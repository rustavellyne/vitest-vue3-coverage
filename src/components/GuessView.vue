<template>
  <ul class="word">
    <li
      v-for="(letter, index) in guess.padEnd(WORD_SIZE, ' ')"
      :key="`${letter}-${index}`"
      :data-letter="letter"
      :data-letter-feedback="getFeedback(index)"
      :class="{ 'with-flips': answer }"
      class="letter"
    >{{ letter }}</li>
  </ul>
</template>

<script setup lang="ts">
import {WORD_SIZE} from '@/settings.ts';

const props = defineProps<{guess: string, answer?: string }>();

function getFeedback (letterPosition: number): null | 'correct' | 'incorrect' | 'almost' {
  const answer = props.answer;
  if (!answer) return null;
  const letterGuessed = props.guess[letterPosition];
  const letterExpected = answer[letterPosition];
  if (!letterGuessed || !answer.includes(letterGuessed)) return 'incorrect';

  return letterExpected === letterGuessed ? 'correct' : 'almost';
}

</script>

<style scoped>
.word {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 0.25rem;
}
.letter {
  --front-color: hsl(0, 0%, 99%);
  --back-color: hsl(0, 0%, 70%);
  background-color: var(--front-color);
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

.letter.with-flips {
  animation: flip-card 0.3s linear forwards;

  &:nth-child(1) { animation-delay: 0.25s }
  &:nth-child(2) { animation-delay: 0.5s }
  &:nth-child(3) { animation-delay: 0.75s }
  &:nth-child(4) { animation-delay: 1s }
  &:nth-child(5) { animation-delay: 1.25s }
}

[data-letter-feedback=correct] {
  --back-color: hsl(120, 25%, 65%);
}

[data-letter-feedback=almost] {
  --back-color: hsl(40, 65%, 48%);
}

[data-letter-feedback=incorrect] {
  --back-color: hsl(0, 0%, 70%);
}

@keyframes pop {
  0% { transform: scale(1) }
  100% { transform: scale(1.4) }
}
@keyframes flip-card {
  0% {
    transform: rotateY(0);
    background-color: var(--front-color);
  }
  49% {
    background-color: var(--front-color);
  }
  50% {
    transform: rotateY(-90deg);
    background-color: var(--back-color);
  }
  100% {
    transform: rotateY(0);
    background-color: var(--back-color);
  }
}
</style>