export type TodoItem = {
    id: string
    title: string
    description: string
    accomplished: boolean
}


export type FilterValues = 'all' | 'open' | 'done'