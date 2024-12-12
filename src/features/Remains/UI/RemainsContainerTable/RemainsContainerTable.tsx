import { Box } from "@mui/material";
import { useCommonStyles } from "../commonStyles";
import { IFrame } from "src/shared/UI/IFrame";

const RemainsContainerTable = () => {
    const commonClasses = useCommonStyles();
    const url = "https://datalens.dxlc.online/h2rwpiti3by04-ostatki-konteynerov";

    return (
        <Box component="div" className={commonClasses.container}>
            <IFrame url={url} />
        </Box>
    );
};

export { RemainsContainerTable };
