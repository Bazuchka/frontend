import { Box } from "@mui/material";
import { useCommonStyles } from "../commonStyles";
import { IFrame } from "src/shared/UI/IFrame";

const RemainsGoodTable = () => {
    const commonClasses = useCommonStyles();
    const url = "https://datalens.dxlc.online/j4s2qpt4tn9s6-dvizh-ostatkov-2";

    return (
        <Box component="div" className={commonClasses.container}>
            <IFrame url={url} />
        </Box>
    );
};

export default RemainsGoodTable;
