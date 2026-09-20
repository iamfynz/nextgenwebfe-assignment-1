<template>
  <div class="w-full">
    <TodoList
      :TodoItems="TodoItems"
      @create:todo="createTodoItem"
      @toggle:accomplished="checkTodoItem"
      @delete:todo="removeTodo"
    />
  </div>
</template>

<script setup lang="ts">
import TodoList from './TodoList.vue'
import useTodos from '../../composables/useTodos'

const {TodoItems, createTodoItem, removeTodo, checkTodoItem} = useTodos()
</script>
