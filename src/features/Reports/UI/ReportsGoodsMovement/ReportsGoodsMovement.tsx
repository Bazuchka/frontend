import { Box } from "@mui/material";
import { useCommonStyles } from "../commonStyles";

const ReportsGoodsMovement = () => {
    const commonClasses = useCommonStyles();

    return (
        <Box component="div" className={commonClasses.container}>
            <iframe
                width="100%"
                height="100%"
                src="https://datalens.dxlc.online/3odijjw8229kq-dvizheniya-nomenklatury"></iframe>
        </Box>
    );
};

export default ReportsGoodsMovement;
