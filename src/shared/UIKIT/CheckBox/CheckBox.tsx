import { useTheme } from "@mui/material";
import { checkBoxStyles } from "./styles";
import { ICheckBoxProps } from "./types";

export default function CheckBox({
    id,
    isChecked,
    onClick,
    isDisabled,
    isRequired,
    size,
    label,
    labelPosition = "left",
}: ICheckBoxProps) {
    const theme = useTheme();
    const classes = checkBoxStyles({ theme, size, labelPosition })({ theme });

    const name = `checboxName_${id}`;

    const onCheck = () => {
        onClick(!isChecked);
    };

    return (
        <div>
            <input
                id={id}
                name={name}
                type="checkbox"
                className={classes.checkbox}
                required={isRequired}
                disabled={isDisabled}
                checked={isChecked}></input>
            <label onClick={onCheck} htmlFor={name}>
                {label}
            </label>
        </div>
    );
}
