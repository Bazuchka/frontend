import { Box } from "@mui/material";
import { useStyles } from "./styles.";

export default function AnalyticsTable() {
    const styles = useStyles();

    return (
        <Box component={"div"} className={styles.container}>
            <iframe src="https://datalens.yandex/2m5ys464i79ip" width="100%" height="100%"></iframe>
        </Box>
    );
}
