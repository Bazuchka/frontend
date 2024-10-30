import { TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import i18next from "i18next";
import React from "react";
import {
    // DATE_PICKER_LOCALE_CONFIGURATION,
    DATE_PICKER_TEXT_LOCALE_CONFIGURATION,
} from "src/shared/types/types";
import { TimePickerProps } from "./types";

const ITimePicker: React.FC<TimePickerProps> = ({
    value,
    onChange,
    error,
    fieldName,
    testFieldName,
    disableCondition,
}) => {
    const currentLocale = i18next.language;
    const date = value ? new Date(value) : null;
    return (
        <LocalizationProvider
            dateAdapter={AdapterDateFns}
            localeText={DATE_PICKER_TEXT_LOCALE_CONFIGURATION[currentLocale]}>
            <TimePicker
                value={date}
                onChange={onChange}
                slotProps={{
                    textField: {
                        error: error,
                        size: "small",
                        "data-test-id": `value:${testFieldName ?? fieldName}`,
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } as any,
                }}
                closeOnSelect={false}
                ampm={false}
                format="HH:mm"
                disabled={disableCondition}
            />
        </LocalizationProvider>
    );
};

export default ITimePicker;
