import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import { AppBar, Box, ButtonBase, Toolbar, useTheme } from "@mui/material";
import { FC, JSX } from "react";
import { Link } from "react-router-dom";
import { useStyles } from "src/app/layout/header/styles/styles";
import { AlertList } from "src/features/AlertList";
import { UserBar } from "src/features/User/UserBar";
import { IBreadcrumbs } from "src/shared/UI/iBreadcrumbs";
import { ITooltype } from "src/shared/UI/iTooltype";

const Header: FC = (): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles({ theme });

    return (
        <AppBar className={classes.appBar}>
            <AlertList />
            <Toolbar className={classes.toolbar}>
                <Box className={classes.container}>
                    <Box className={classes.logoPanel}>
                        <Box className={classes.logoWrap}>
                            <Link to="/">
                                <img src="/images/logo.png" alt="img" className={classes.logo} />
                            </Link>
                        </Box>
                    </Box>
                    <Box className={classes.leftPanel}>
                        <ButtonBase className={classes.icons}>
                            <ITooltype
                                id={"mouse-over-reload"}
                                item={<CachedOutlinedIcon className={classes.icon} />}
                                label={"Shared:Reload.label"}
                            />
                        </ButtonBase>
                        <IBreadcrumbs />
                    </Box>
                </Box>
                <Box className={classes.rightPanel}>
                    {/* //TODO add question mark button */}
                    <UserBar />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
