import { FC, useMemo } from "react";
import { Box, Divider, List, ListItem } from "@mui/material";
import { observer } from "mobx-react";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { IMenuItem } from "src/shared/UI/iMenuItem";
import { useMenuStyles } from "src/app/layout/sidebar/menu/styles/styles";
import { MenuSearch } from "../menuSearch/";
import { MenuItem } from "./config/menuConfiguration";
import { updateMenuWithIsVisibleProp } from "./libs";

interface MenuProps {
    menuConfiguration: MenuItem[];
    isSidebarOpen?: boolean;
}

const Menu: FC<MenuProps> = observer(({ menuConfiguration, isSidebarOpen }): JSX.Element => {
    const theme = useTheme();
    const classes = useMenuStyles({ theme });

    const updatedMenu = useMemo(
        () => updateMenuWithIsVisibleProp(menuConfiguration),
        [menuConfiguration]
    );

    return (
        <>
            {isSidebarOpen ? (
                <MenuSearch menu={updatedMenu} isSidebarOpen={isSidebarOpen} />
            ) : (
                <Box component="div" className={classes.iconContainer}>
                    <SearchIcon />
                </Box>
            )}
            <Divider />
            <List className={classes.list} role="menu">
                {updatedMenu
                    .filter((el) => !el.isInvisibleMenuItem && el.isVisible)
                    .map((item) => (
                        <ListItem key={`menu-item-${item.key}`} className={classes.listItem}>
                            <IMenuItem item={item} isSidebarOpen={!!isSidebarOpen} />
                            <Divider />
                        </ListItem>
                    ))}
            </List>
        </>
    );
});

export default Menu;
