/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "@tanstack/react-table"; //or vue, svelte, solid, etc.
import { ReactNode } from "react";

type EditableCell = {
    component: (editableCellProps: {
        row: {
            getValue: (key: string) => any;
            setValue: (key: string, value: any) => void;
            original: TableRowStore<TData>;
        };
        register: UseFormRegister<FieldValues>;
        control: Control;
        error: FieldError | undefined;
    }) => ReactNode;
    fieldType: FieldItemType;
    defaultValue?: TValue | "";
};

declare module "@tanstack/react-table" {
    interface ColumnMeta<TData extends RowData, TValue> {
        editableCell?:
            | EditableCell
            | ((original: TableRowStore<TData> | null) => EditableCell | undefined);
        isComputed?: boolean;
        validate?: (value: TableRowStore<TData>) => boolean;
    }
}
declare module "@tanstack/table-core" {
    interface TableMeta<TData extends RowData> {
        editedRows: Record<string, boolean>;
        setEditedRows: React.Dispatch<React.SetStateAction<object>>;
        isEditMode: boolean;
    }
}

declare global {
    interface Window {
        _env_: Record<string, string>;
    }
}
