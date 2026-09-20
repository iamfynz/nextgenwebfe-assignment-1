export interface SelectOption {
    value: string
    label: string
}

export interface SelectComponentProps {
    options: SelectOption[]
    selected: string
    label?: string
    disabled?: boolean
}
