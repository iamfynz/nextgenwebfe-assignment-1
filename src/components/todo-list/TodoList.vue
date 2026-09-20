<template>
    <div class="w-full border border-line-strong rounded-xl p-3 mt-3 h-full sm:p-5">
        <SelectComponent class="sm:ml-auto" :disabled="props.TodoItems.length === 0" label="Filter" :options="filterOptions" :selected="filter" @update:selected="setFilter"/>
        <ul v-if="filteredTodoItems.length > 0" class="flex flex-col gap-5 mt-3">
            <li v-for="item in filteredTodoItems" :key="item.id">
                <TodoListItem
                    :TodoItem="item"
                    :accomplished="item.accomplished"
                    @update:accomplished="toggleAccomplished"
                    @delete:item="deleteTodo"
                />
            </li>
        </ul>
        <div class="flex flex-row justify-center p-9 text-accent" v-else>
            <h1>Keine Todos..</h1>
        </div>
        <div class="flex flex-col">
            <form class="flex flex-col gap-3" :class="{ 'mt-5': filteredTodoItems.length > 0 }" @submit.prevent="submitNewTodo">
                <div class="grid gap-3 sm:grid-cols-2">
                <label class="flex flex-col gap-1 text-sm font-medium text-fg">
                    Titel
                    <input
                        v-model.trim="title"
                        type="text"
                        required
                        placeholder="Was ist zu tun?"
                        class="rounded-lg border border-line bg-surface px-3 py-2 font-normal text-fg placeholder:text-fg-disabled"
                    >
                </label>
                <label class="flex flex-col gap-1 text-sm font-medium text-fg">
                    Beschreibung
                    <input
                        v-model.trim="description"
                        type="text"
                        placeholder="Optionale Details"
                        class="rounded-lg border border-line bg-surface px-3 py-2 font-normal text-fg placeholder:text-fg-disabled"
                    >
                </label>
                </div>
                <button type="submit" class="btn btn-primary w-full sm:w-auto sm:self-start">Todo anlegen</button>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import {computed, ref} from 'vue'
import TodoListItem from './TodoListItem.vue'
import SelectComponent from '../component-lib/SelectComponent.vue'
import {type FilterValues, type TodoItem} from './types.ts'
import {type SelectOption} from '../component-lib/SelectTypes.ts'

interface Props {
    TodoItems: TodoItem[]
}

interface Emits {
    (event: 'create:todo', title: string, description: string): void,
    (event: 'toggle:accomplished', id: string, value: boolean): void,
    (event: 'delete:todo', id: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const filterOptions: SelectOption[] = [{value: 'all', label: "Alle"}, {value: 'done', label: "Erledigt"}, {value: 'open', label: "Offen"}]

const title = ref('')
const description = ref('')
const filter = ref<FilterValues>('all')

const filteredTodoItems = computed(() => {
    if (filter.value === 'open') {
        return props.TodoItems.filter((item) => !item.accomplished)
    }

    if (filter.value === 'done') {
        return props.TodoItems.filter((item) => item.accomplished)
    }

    return props.TodoItems
})

function setFilter(value: string) {
    filter.value = value as FilterValues
}

function submitNewTodo() {
    emit('create:todo', title.value, description.value)

    title.value = ''
    description.value = ''
}

function toggleAccomplished(id: string, value: boolean) {
    emit('toggle:accomplished', id, value)
}

function deleteTodo(id: string) {
    emit('delete:todo', id)
}

</script>
