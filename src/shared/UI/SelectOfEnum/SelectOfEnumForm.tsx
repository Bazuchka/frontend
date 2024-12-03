import { FormControl } from "@mui/material";
import { FC, useState } from "react";
import SelectOfEnum from "./SelectOfEnum";
import { SelectOfEnumProps } from "./types";

interface SelectOfEnumFormProps extends Omit<SelectOfEnumProps, "onChange"> {
    withClearButton?: boolean;
    onChange?: (value: string | undefined) => void;
    fieldName: string;
    testFieldName?: string;
}

const SelectOfEnumForm: FC<SelectOfEnumFormProps> = (props) => {
    const { onChange, value, withClearButton, ...rest } = props;
    const [selectedValue, setSelectedValue] = useState(value);
    const handleChange = (value: string | undefined) => {
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
