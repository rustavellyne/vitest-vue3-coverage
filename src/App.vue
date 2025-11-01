<script setup>
import WordleBoard from '@/components/WordleBoard.vue';
</script>

<template>
  <main>
    <section class="board">
      <div class="board__container">
        <wordle-board word-of-the-day="TESTS" class="board__item"/>
      </div>
    </section>
  </main>
</template>
<style>

.board {
  margin-top: 50px;
}

.board__item {
  display: flex;
  justify-content: center;
}

</style>