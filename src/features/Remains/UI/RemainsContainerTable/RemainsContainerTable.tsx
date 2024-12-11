import { Box } from "@mui/material";
import { useCommonStyles } from "../commonStyles";

const RemainsContainerTable = () => {
    const commonClasses = useCommonStyles();

    return (
        <Box component="div" className={commonClasses.container}>
            <iframe
                width="100%"
                height="100%"
                src="https://datalens.dxlc.online/h2rwpiti3by04-ostatki-konteynerov"></iframe>
        </Box>
    );
};

export { RemainsContainerTable };
