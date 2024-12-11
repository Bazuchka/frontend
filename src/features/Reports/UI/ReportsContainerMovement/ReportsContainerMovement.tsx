import { Box } from "@mui/material";
import { useCommonStyles } from "../commonStyles";

const ReportsContainerMovement = () => {
    const commonClasses = useCommonStyles();

    return (
        <Box component="div" className={commonClasses.container}>
            <iframe
                src="https://datalens.dxlc.online/l6mwkcrt0u5o8-dvizheniya-konteynera"
                width="100%"
                height="100%"></iframe>
        </Box>
    );
};

export default ReportsContainerMovement;
