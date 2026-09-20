import {ref, watch} from 'vue'
import {type TodoItem} from '../components/todo-list/types'

const STORAGE_KEY = 'todos'

export default function useTodos() {
    const TodoItems = ref<TodoItem[]>(loadTodos())

    function createTodoItem(title: string, description: string, accomplished = false,): void {
         const Todo = ({ id: crypto.randomUUID(), title, description, accomplished })
         TodoItems.value.push(Todo)
    }

    function removeTodo(id: string): void {
        TodoItems.value = TodoItems.value.filter((item) => item.id !== id)
    }

    function checkTodoItem(id: string, value: boolean) {
        const todo = TodoItems.value.find((item) => item.id === id)
        
        if (todo) {
            todo.accomplished = value
        }
    }

    //synch localStorage with updated TodoItems
    watch(
        TodoItems,
        (newValue) => {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue))
            } catch (error) {
                console.warn('useTodos: Todos konnten nicht gespeichert werden', error)
            }
        },
        { deep: true },
    )

    return {
        TodoItems,
        createTodoItem,
        removeTodo,
        checkTodoItem
    }
}

//load todos from localeStorage if persisted
function loadTodos(): TodoItem[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw === null ? [] : (JSON.parse(raw) as TodoItem[])
    } catch (error) {
        console.warn('useTodos: gespeicherte Todos konnten nicht gelesen werden', error)
        return []
    }
}
