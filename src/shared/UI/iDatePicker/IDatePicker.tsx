import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import i18next from "i18next";
import React from "react";
import {
    DATE_PICKER_LOCALE_CONFIGURATION,
    DATE_PICKER_TEXT_LOCALE_CONFIGURATION,
} from "src/shared/types/types";
import { DatePickerProps } from "./types";

const IDatePicker: React.FC<DatePickerProps> = ({
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
            adapterLocale={DATE_PICKER_LOCALE_CONFIGURATION[currentLocale]}
            localeText={DATE_PICKER_TEXT_LOCALE_CONFIGURATION[currentLocale]}>
            <DatePicker
                value={date}
                onChange={onChange}
                slotProps={{
                    textField: {
                        error: error,
                        size: "small",
                    },
                }}
                format="dd.MM.yyyy"
                disabled={disableCondition}
                data-test-id={`value:${testFieldName ?? fieldName}`}
            />
        </LocalizationProvider>
    );
};

export default IDatePicker;
