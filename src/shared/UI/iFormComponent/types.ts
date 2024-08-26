import { GridRowModel } from "@mui/x-data-grid";
import { FieldErrors, FieldValues, UseFormSetValue } from "react-hook-form";
import { UseForm } from "src/shared/types";
import { FieldGroup, FieldItem } from "../iFieldItem/types";

export interface FormProps {
    name?: string;
    isWaitingStore?: boolean;
    onSubmit?: (data: Record<string, string>) => void;
    onCancelEditing?: () => void;
    fields: FieldGroup[] | FieldItem[];
    isLoading?: boolean;
    isEditMode?: boolean;
    setIsEditMode?: (mode: boolean) => void;
    editRow?: GridRowModel;
    editRowExtraSync?: GridRowModel;
    cleanEditRows?: () => void;
    setEditRow?: (data: GridRowModel) => void;
    setEditRowNext?: (data: GridRowModel, key: string) => void;
    setEditRowExtraSync?: (data: GridRowModel) => void;
    setRequestParams?: (value: Record<string, object>) => void;
    setIsDisable?: (value: boolean) => void;
    requestParamsField?: string;
    disableField?: string;
    isHorizontalDirection?: boolean;
    onTriggerFieldsChange?: {
        [field: string]: (values: FieldValues, setValue: UseFormSetValue<FieldValues>) => void;
    };
    onLoad?: (form: UseForm) => void;
    onFormStateChange?: (formState: {
        errors: FieldErrors;
        isValid: boolean;
        isDirty: boolean;
    }) => void;
}
