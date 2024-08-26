import { FC, useState } from "react";
import { FormControl } from "@mui/material";
import SelectOfEnum from "./SelectOfEnum";
import { SelectOfEnumProps } from "./types";

interface SelectOfEnumFormProps extends Omit<SelectOfEnumProps, "onChange"> {
    withClearButton?: boolean;
    onChange?: (value: string) => void;
    fieldName: string;
    testFieldName?: string;
}

const SelectOfEnumForm: FC<SelectOfEnumFormProps> = (props) => {
    const { onChange, value, withClearButton, ...rest } = props;
    const [selectedValue, setSelectedValue] = useState(value);
    const handleChange = (value: string) => {
        setSelectedValue(value);
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <FormControl variant="outlined" fullWidth>
            <SelectOfEnum
                value={selectedValue ?? ""}
                onChange={handleChange}
                withClearButton={!!withClearButton}
                {...rest}
            />
        </FormControl>
    );
};

export default SelectOfEnumForm;
