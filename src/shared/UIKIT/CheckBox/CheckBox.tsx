import { Checkbox, useTheme } from "@mui/material";
import { checkBoxStyles } from "./styles";
import { ICheckBoxProps } from "./types";
import { DoneToggle } from "src/assets/icons";

export default function CheckBox({
    isChecked,
    onChange,
    isDisabled,
    isRequired,
    size,
}: ICheckBoxProps) {
    const theme = useTheme();
    const classes = checkBoxStyles({ theme, size })({ theme });

    return (
        <Checkbox
            className={classes.input}
            checkedIcon={<DoneToggle />}
            onChange={onChange}
            required={isRequired}
            disabled={isDisabled}
            checked={isChecked}
        />
    );
}
