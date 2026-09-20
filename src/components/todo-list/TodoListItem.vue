<template>
    <div class="flex flex-row items-center gap-3 w-full border border-line rounded-xl p-3 shadow-xl justify-start sm:gap-4">
        <CheckboxComponent
            :checked="props.accomplished"
            @update:checked="toggleAccomplished"
        />
        <div class="flex min-w-0 flex-col break-words">
        <h3>{{ props.TodoItem.title }}</h3>
        <p>{{ props.TodoItem.description }}</p>
        </div>
        <button class="flex ml-auto shrink-0 border btn btn-danger items-center justify-center rounded-xl p-1" @click="deleteItem">
            <Times size="32" />
        </button>
    </div>
</template>

<script setup lang="ts">
import {type TodoItem} from './types.ts'
import Times from '@primeicons/vue/times'
import CheckboxComponent from '../component-lib/CheckboxComponent.vue'

interface Props {
    TodoItem: TodoItem
    accomplished: boolean
}

interface Emits {
    (event: 'update:accomplished', id: string, value: boolean): void,
    (event: 'delete:item', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

function toggleAccomplished(value: boolean) {
    emit('update:accomplished', props.TodoItem.id, value)
}

function deleteItem() {
    emit('delete:item', props.TodoItem.id)
}
</script>
