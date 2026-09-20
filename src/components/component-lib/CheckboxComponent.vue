<template>
<div class="flex shrink-0 items-center">
    <input
        :id="id"
        type="checkbox"
        :checked="props.checked"
        class="w-4 h-4 accent-accent focus:ring-2 focus:ring-brand-soft"
        @change="emit('update:checked', ($event.target as HTMLInputElement).checked)"
    >
    <label v-if="props.label" :for="id" class="select-none ms-2 text-sm font-medium text-fg">{{ props.label }}</label>
</div>
</template>

<script setup lang="ts">
import {useId} from 'vue'
import {type CheckboxComponentProps} from './CheckboxTypes.ts'

const props = defineProps<CheckboxComponentProps>()
const emit = defineEmits<{
    (event: 'update:checked', value: boolean): void
}>()

const id = useId()
</script>
