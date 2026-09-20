<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import TodoApp from './components/todo-list/TodoApp.vue'
</script>

<template>
  
  <Header />

  <main class="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
    <TodoApp />
  </main>

  <Footer />
</template>
