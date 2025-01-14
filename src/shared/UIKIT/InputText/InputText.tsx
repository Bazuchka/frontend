import React, { useState } from "react";
import { useInputTextStyles } from "./styles";
import { CommonSize } from "src/shared/UIKIT";
import { useTheme } from "@mui/material";

interface InputTextProps {
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

const InputText: React.FC<InputTextProps> = ({
    value,
    onChange,
    placeholder,
    className,
    disabled = false,
    error = false,
    label,
    hintText,
    onFocus,
    onBlur,
    iconStart,
    iconEnd,
    size = CommonSize.Regular,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const theme = useTheme();

    const {
        inputContainer,
        inputLabel,
        inputField,
        hintText: hintTextClass,
        inputWrapper,
        iconStart: iconStartClass,
        iconEnd: iconEndClass,
    } = useInputTextStyles({
        isFocused,
        error,
        disabled,
        iconStart: !!iconStart,
        iconEnd: !!iconEnd,
        size,
        theme,
    });

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        if (onFocus) {
            onFocus(e);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        if (onBlur) {
            onBlur(e);
        }
    };

    return (
        <div className={`${inputContainer} ${className || ""}`}>
            {label && <label className={inputLabel}>{label}</label>}
            <div className={inputWrapper}>
                {iconStart && <span className={iconStartClass}>{iconStart}</span>}
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={inputField}
                />
                {iconEnd && <span className={iconEndClass}>{iconEnd}</span>}
            </div>
            {hintText && <span className={hintTextClass}>{hintText}</span>}
        </div>
    );
};

export default InputText;
