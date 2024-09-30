/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableCell, TableRow, Typography } from "@mui/material";
import type { AccessorKeyColumnDef, ColumnDef, Row } from "@tanstack/react-table";
import {
    ForwardedRef,
    forwardRef,
    memo,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useState,
} from "react";
import { DefaultValues, FieldErrors, FieldValues, useForm } from "react-hook-form";
import { FieldItemType } from "../../iFieldItem/const";

type EditableRowProps<T> = {
    columns: ColumnDef<T, unknown>[];
    row?: Row<T>;
    onSubmit?: (data: FieldValues) => void;
    onRowStateChange?: (formState: {
        errors: FieldErrors<Record<string, T>>;
        isValid: boolean;
        isDirty: boolean;
    }) => void;
};

export type SubmitHandle = {
    submitForm: () => void;
};

const getDefaultRow = <T,>(columns: ColumnDef<T, unknown>[]) => {
    return {
        original: columns.reduce((prev, curr) => {
            return {
                ...prev,
                [(curr as AccessorKeyColumnDef<T>).accessorKey!]:
                    typeof curr.meta?.editableCell === "function"
                        ? curr.meta?.editableCell(null)?.defaultValue
                        : curr.meta?.editableCell?.defaultValue,
            };
        }, {}),
    };
};

// eslint-disable-next-line react/display-name
const EditableRowForwarded = <T,>(props: EditableRowProps<T>, ref: ForwardedRef<SubmitHandle>) => {
    const { columns, row = getDefaultRow(columns), onSubmit, onRowStateChange } = props;
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors, isValid, isDirty },
        control,
        setValue,
    } = useForm({
        defaultValues: row.original as DefaultValues<T>,
        mode: "onSubmit",
    });

    const [values, setValues] = useState<FieldValues>(row.original as FieldValues);

    useEffect(() => {
        const subscription = watch((value) => {
            setValues(value);
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const submitForm = handleSubmit((data) => {
        onSubmit?.(data);
    });

    useEffect(() => {
        onRowStateChange?.({ isValid, isDirty, errors });
    }, [isValid, isDirty, errors, onRowStateChange]);

    useImperativeHandle(ref, () => {
        return {
            submitForm,
        };
    });

    const formRow = useMemo(() => {
        return {
            getValue: (key: string) => values[key],
            setValue: (key: string, value: any) =>
                setValue(key, value, { shouldDirty: value !== values[key] }),
            original: row.original,
        };
    }, [row, values, setValue]);

    const cellStyles = useCallback((cellType: FieldItemType) => {
        switch (cellType) {
            case FieldItemType.INPUT:
            case FieldItemType.INPUT_NUMBER:
            case FieldItemType.AUTOCOMPLETE:
                return { paddingLeft: 1 };
            case FieldItemType.CHECKBOX:
                return { paddingLeft: 6 };
        }
    }, []);

    return (
        <TableRow className='border-b" bg-white'>
            {columns.map((cell) => {
                const isEditableCell =
                    typeof cell.meta?.editableCell === "function"
                        ? !!cell.meta?.editableCell(row.original)
                        : !!cell.meta?.editableCell;

                if (isEditableCell) {
                    return (
                        <TableCell
                            style={cellStyles(
                                typeof cell.meta?.editableCell === "function"
                                    ? cell.meta.editableCell(row.original)?.fieldType
                                    : cell.meta?.editableCell?.fieldType
                            )}
                            key={cell.id}>
                            {typeof cell.meta?.editableCell === "function"
                                ? cell.meta?.editableCell(row.original)?.component({
                                      row: formRow,
                                      register,
                                      control,
                                      error: errors[(cell as AccessorKeyColumnDef<T>).accessorKey],
                                  })
                                : cell.meta?.editableCell?.component({
                                      row: formRow,
                                      register,
                                      control,
                                      error: errors[(cell as AccessorKeyColumnDef<T>).accessorKey],
                                  })}
                        </TableCell>
                    );
                }

                if (cell.meta?.isComputed) {
                    return (
                        <TableCell key={cell.id}>
                            <Typography>{(cell.cell as any)?.({ row: formRow })}</Typography>
                        </TableCell>
                    );
                }

                return (
                    <TableCell key={cell.id}>
                        {(cell.cell as any)?.({
                            row,
                            getValue: () =>
                                (row as any)[(cell as AccessorKeyColumnDef<T>).accessorKey],
                        })}
                    </TableCell>
                );
            })}
        </TableRow>
    );
};

export const EditableRow = memo(forwardRef(EditableRowForwarded)) as <T>(
    props: EditableRowProps<T> & { ref?: ForwardedRef<SubmitHandle> }
) => ReturnType<typeof EditableRowForwarded>;
