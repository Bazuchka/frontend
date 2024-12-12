import { Box } from "@mui/material";
import { useCommonStyles } from "../commonStyles";
import { IFrame } from "src/shared/UI/IFrame";

const ReportsContainerMovement = () => {
    const commonClasses = useCommonStyles();
    const url = "https://datalens.dxlc.online/l6mwkcrt0u5o8-dvizheniya-konteynera";

    return (
        <Box component="div" className={commonClasses.container}>
            <IFrame url={url} />
        </Box>
    );
};

export default ReportsContainerMovement;
