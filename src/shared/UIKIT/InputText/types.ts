import { CommonSize } from "../size";

export interface InputTextProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    error?: boolean;
    label?: string;
    hintText?: string;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    iconStart?: React.ReactNode;
    iconEnd?: React.ReactNode;
    size?: CommonSize;
}
