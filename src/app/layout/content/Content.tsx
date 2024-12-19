import { Box, useTheme } from "@mui/material";
import { observer } from "mobx-react";
import { FC, ReactNode } from "react";
import { useContentStyles } from "src/app/layout/content/styles";
import { viewStore } from "src/app/store";

interface ContentProps {
    children: ReactNode;
    isMenuOpen: boolean;
}

const Content: FC<ContentProps> = observer(({ children, isMenuOpen }) => {
    const theme = useTheme();
    const { pageTitle: title } = viewStore;
    const classes = useContentStyles({ theme });
    const contentClass = `${classes.root} ${
        isMenuOpen ? classes.fullContentWidth : classes.collapsedContentWidth
    }`;

    return (
        <Box component="main" className={contentClass}>
            <Box component="h2" className={classes.pageTitle}>
                {title}
            </Box>
            <Box className={classes.pageContent}>{children}</Box>
        </Box>
    );
});

export default Content;
