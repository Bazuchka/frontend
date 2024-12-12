import { Box } from "@mui/material";
import { useCommonStyles } from "../commonStyles";
import { IFrame } from "src/shared/UI/IFrame";

const ReportsGoodsMovement = () => {
    const commonClasses = useCommonStyles();
    const url = "https://datalens.dxlc.online/3odijjw8229kq-dvizheniya-nomenklatury";

    return (
        <Box component="div" className={commonClasses.container}>
            <IFrame url={url} />
        </Box>
    );
};

export default ReportsGoodsMovement;
