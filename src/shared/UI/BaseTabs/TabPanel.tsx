import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CSSProperties, FC, ReactNode } from "react";
import { useStyles } from "./styles";

interface TabPanelProps {
    children: ReactNode;
    index: number;
    value: number | string;
    isHeightFixed?: boolean;
    styles?: CSSProperties;
}

const TabPanel: FC<TabPanelProps> = (props: TabPanelProps) => {
    const { children, value, index, isHeightFixed, styles, ...other } = props;
    const theme = useTheme();
    const classes = useStyles({ theme });

    const defaultStyles: CSSProperties = isHeightFixed ? {} : { minHeight: "auto !important" };

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{ flex: 1, height: "100%", ...styles }}
            {...other}>
            {value === index && (
                <Box className={classes.itemContainer} sx={defaultStyles}>
                    {children}
                </Box>
            )}
        </Box>
    );
};

export default TabPanel;
