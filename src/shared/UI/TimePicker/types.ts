export interface TimePickerProps {
    value: string;
    onChange?: (value: Date | null) => void;
    error?: boolean;
    fieldName?: string;
    testFieldName?: string;
    disableCondition?: boolean;
    timezone?: string;
}
