import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Box, ButtonBase, Drawer, useTheme } from "@mui/material";
import { observer } from "mobx-react";
import { FC, MouseEventHandler, useState } from "react";
import { useStyles } from "src/app/layout/sidebar/styles/styles";
import { viewStore } from "src/app/store";
import { ITooltype } from "src/shared/UI/iTooltype";
import { Menu } from "./menu";
import { menuConfiguration } from "./menu/config/menuConfiguration";

interface SidebarProps {
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
    isMenuOpen?: boolean | undefined;
}

const Sidebar: FC<SidebarProps> = observer(({ isMenuOpen, onClick }): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles({ theme });
    const [isOpenedMenu, setIsOpenedMenu] = useState<boolean>();
    const { menuParams } = viewStore;
    const drawerClass = [classes.drawerPaper];

    if (isMenuOpen) {
        drawerClass.push(classes.opened);
    } else {
        drawerClass.push(classes.closed);
    }

    const getMenuVariablesIcon = (): JSX.Element => {
        if (isMenuOpen) {
            return <MenuOpenIcon className={classes.icon} />;
        }

        return <MenuIcon className={classes.icon} />;
    };

    return (
        <Box component="nav" className={classes.root}>
            <Drawer
                variant={"permanent"}
                anchor="left"
                open={isMenuOpen}
                onClose={onClick}
                classes={{
                    paper: drawerClass.join(" "),
                }}
                ModalProps={{ keepMounted: true }}>
                <Box className={isMenuOpen ? classes.toolbarOpen : classes.toolbarClose}>
                    <Box className={classes.menuButton}>
                        <ButtonBase
                            className={classes.button}
                            onClick={(eventClick) => {
                                if (onClick) {
                                    onClick(eventClick);
                                }

                                setIsOpenedMenu(!isOpenedMenu);
                            }}>
                            <ITooltype
                                id={"mouse-over-menu"}
                                item={getMenuVariablesIcon()}
                                label={"Shared:Menu.label"}
                            />
                        </ButtonBase>
                    </Box>
                </Box>
                <Menu
                    menuConfiguration={menuConfiguration(menuParams)}
                    isSidebarOpen={isMenuOpen}
                />
            </Drawer>
        </Box>
    );
});

export default Sidebar;
