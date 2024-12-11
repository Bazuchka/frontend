import { Box } from "@mui/material";
import { useCommonStyles } from "../commonStyles";

const RemainsGoodTable = () => {
    const commonClasses = useCommonStyles();

    return (
        <Box component="div" className={commonClasses.container}>
            <iframe
                width="100%"
                height="100%"
                src="https://datalens.dxlc.online/j4s2qpt4tn9s6-dvizh-ostatkov-2"></iframe>
        </Box>
    );
};

export default RemainsGoodTable;
