import { FC } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Tooltip } from "@mui/material";
import { inlineHelpStyles } from "src/shared/UI/IInlineHelp/styles";

export type IInlineHelpPropsType = {
    describe: string;
};

const IInlineHelp: FC<IInlineHelpPropsType> = ({ describe }) => {
    return (
        <Tooltip
            title={describe}
            placement={"right-end"}
            arrow
            color={"black"}
            componentsProps={{
                tooltip: {
                    sx: inlineHelpStyles,
                },
            }}>
            <HelpOutlineIcon />
        </Tooltip>
    );
};

export default IInlineHelp;
