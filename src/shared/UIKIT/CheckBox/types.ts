import { CommonSize } from "..";

export interface ICheckBoxProps {
    id: string;
    isChecked: boolean;
    isDisabled: boolean;
    isRequired: boolean;
    size: CommonSize;
    label?: string;
    labelPosition?: "top" | "left";
    onClick: (newValue: boolean) => void;
}
