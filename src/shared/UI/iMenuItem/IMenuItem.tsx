import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
    Box,
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuItemWithIsVisible } from "src/app/layout/sidebar/menu/libs";
import { ITooltype } from "src/shared/UI/iTooltype";
import { useIMenuItemStyles } from "./styles/styles";
import { IMenuItemProps } from "./types";

const IMenuItem: FC<IMenuItemProps> = ({ item, isSidebarOpen }): JSX.Element | null => {
    const theme = useTheme();
    const location = useLocation();
    const path = location.pathname;
    const hasChildren = Boolean(
        item.children?.filter((el) => !el.isInvisibleMenuItem).length ?? 0 > 0
    );

    const hasChildWithPath = (items: MenuItemWithIsVisible[], path: string): boolean => {
        const stack = [...items];

        while (stack.length) {
            const item = stack.pop();

            if (!item) {
                return false;
            }

            if (item.path === path) {
                return true;
            }

            if (item.children) {
                stack.push(...item.children);
            }
        }

        return false;
    };

    const classes = useIMenuItemStyles({ theme });

    const [open, setOpen] = useState(item.children ? hasChildWithPath(item.children, path) : false);

    useEffect(() => {
        setOpen((prev) => prev || (item.children ? hasChildWithPath(item.children, path) : false));
    }, [item.children, path]);

    const handleClick = () => {
        isSidebarOpen && setOpen((prevState) => !prevState);
    };

    const options = !hasChildren && { href: item.path };

    if (!item.isVisible) {
        return null;
    }

    const getVariablesArrows = (): JSX.Element => {
        return (
            <picture className={classes.arrow}>{open ? <ExpandLess /> : <ExpandMore />}</picture>
        );
    };

    const Header = item.path ? Link : Box;

    return (
        <>
            <Header
                to={item.path || ""}
                className={classes.link}
                key={`menu-item-${item.key}`}
                role="menu-item"
                area-label={item.key}>
                <ListItemButton
                    title={item.label}
                    className={classes.main}
                    {...options}
                    key={`menu-item-${item.label}`}
                    onClick={handleClick}>
                    <ListItemIcon className={classes.icon}>
                        <ITooltype
                            id={`mouse-over-menu-${item.label}`}
                            item={item.icon}
                            label={!isSidebarOpen ? item.label : ""}
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary={item.label}
                        className={
                            item.path === path ||
                            item.children?.some((el) => el.path === path && el.isInvisibleMenuItem)
                                ? classes.underline
                                : ""
                        }
                    />
                    {hasChildren && getVariablesArrows()}
                </ListItemButton>
            </Header>
            {hasChildren && isSidebarOpen && (
                <Collapse in={open} timeout="auto" unmountOnExit className={classes.subItem}>
                    <List component="div" disablePadding role="menu">
                        {item.children
                            ?.filter((item) => !item.isInvisibleMenuItem)
                            .map((subItem) => {
                                return subItem.children ? (
                                    <IMenuItem
                                        key={`menu-item-${subItem.key}`}
                                        item={subItem}
                                        isSidebarOpen={isSidebarOpen as boolean}
                                    />
                                ) : (
                                    subItem.isVisible && (
                                        <IMenuItem
                                            key={`menu-item-${subItem.key}`}
                                            item={subItem}
                                            isSidebarOpen={isSidebarOpen as boolean}
                                        />
                                    )
                                );
                            })}
                    </List>
                </Collapse>
            )}
        </>
    );
};

export default IMenuItem;
