import { Box } from "@mui/material";
import { useCommonStyles } from "../commonStyles";
import { IFrame } from "src/shared/UI/IFrame";
import * as datalensConfig from "../../../../../datalens.config.json";

const ReportsRemainsContainerTable = () => {
    const commonClasses = useCommonStyles();

    const spaceType = window._env_.SPACE_TYPE;
    const url = (datalensConfig as Record<string, Record<string, string>>)[spaceType]
        .reportsRemainsContainer;

    return (
        <Box component="div" className={commonClasses.container}>
            <IFrame url={url} />
        </Box>
    );
};

export { ReportsRemainsContainerTable };
