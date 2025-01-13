import { ChangeEvent } from "react";

export enum CheckBoxSizeList {
    small,
    medium,
    large,
}

export interface ICheckBoxProps {
    isChecked: boolean;
    isEditable: boolean;
    isDisabled: boolean;
    isRequired: boolean;
    size: CheckBoxSizeList;
    onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}
