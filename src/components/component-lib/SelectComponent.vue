<template>
    <div class="flex w-full flex-col gap-1 sm:max-w-xs">
        <label
            v-if="props.label"
            :for="id"
            class="text-sm font-medium"
            :class="props.disabled ? 'text-fg-disabled' : 'text-fg'"
        >{{ props.label }}</label>
        <select
            :id="id"
            :value="props.selected"
            :disabled="props.disabled"
            class="rounded-lg border border-line bg-surface px-3 py-2 text-sm text-fg
                   disabled:cursor-not-allowed disabled:border-line-soft
                   disabled:bg-surface-sunken disabled:text-fg-disabled"
            @change="selectOption"
        >
            <option v-for="option in props.options" :key="option.value" :value="option.value">
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
import {useId} from 'vue'
import {type SelectComponentProps} from './SelectTypes.ts'

interface Emits {
    (event: 'update:selected', value: string): void
}

const props = withDefaults(defineProps<SelectComponentProps>(), {
    disabled: false,
})
const emit = defineEmits<Emits>()

const id = useId()

function selectOption(event: Event) {
    emit('update:selected', (event.target as HTMLSelectElement).value)
}
</script>
