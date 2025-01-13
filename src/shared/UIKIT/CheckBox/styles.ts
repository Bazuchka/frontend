import { Theme } from "@mui/material";
import { createUseStyles } from "react-jss";
import { CheckBoxSizeList } from ".";

export const checkBoxStyles = ({ theme, size }: { theme: Theme; size: CheckBoxSizeList }) => {
    const sizeStrList = {
        [CheckBoxSizeList.small]: "16px",
        [CheckBoxSizeList.medium]: "20px",
        [CheckBoxSizeList.large]: "24px",
    };

    return createUseStyles(() => ({
        input: {
            display: "flex",
            borderColor: theme.colors.gray,
            width: sizeStrList[size],
            height: sizeStrList[size],

            "&:hover": {
                border: "solid 1px " + theme.colors.secondary,
                color: theme.colors.secondary,
            },
        },
    }));
};
