import { Button as MuiButton, ButtonProps as MuiButtonProps, useTheme } from "@mui/material";
import classNames from "classnames";
import { FunctionComponent } from "react";
import useStyles from "./styles";

interface ButtonProps extends MuiButtonProps {}

const Button: FunctionComponent<ButtonProps> = (props) => {
    const theme = useTheme();
    const classes = useStyles({ theme });
    return <MuiButton {...props} className={classNames([props.className, classes.button])} />;
};

export default Button;
