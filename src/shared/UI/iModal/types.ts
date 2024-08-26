export interface DialogAction {
    label: string;
    onClick: () => void;
    type?: string;
    form?: string;
    loading?: boolean;
    disabled?: boolean;
}
