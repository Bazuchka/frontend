/* eslint-disable react-hooks/exhaustive-deps */
import { ClickAwayListener, Divider, List, Popper, useTheme } from "@mui/material";
import { Header } from "@tanstack/react-table";
import { useEffect, useLayoutEffect, useMemo } from "react";
import { MenuModalItem } from "src/shared/UI/TSBaseTable/UI/MenuModalItem";
import useStyles from "src/shared/UI/TSBaseTable/UI/styles";
import { ITSSorting } from "../store/TSSorting";
import { menuModalConfig } from "./config/menuModalConfig";
import { SortingMenu } from "./SortingMenu";

export interface IMenuModalProps<T> {
    setIsColumnManagmentModalOpen: (val: boolean) => void;
    setIsFilterModalOpen: (val: boolean) => void;
    setTriggerRef: (val: HTMLDivElement | null) => void;
    triggerRef: HTMLDivElement | null;
    tsSorting: ITSSorting;
    header: Header<T, unknown>;
}

export const MenuModal = <T,>(props: IMenuModalProps<T>) => {
    const {
        setIsColumnManagmentModalOpen,
        setIsFilterModalOpen,
        triggerRef,
        setTriggerRef,
        tsSorting,
        header,
    } = props;
    const theme = useTheme();
    const classes = useStyles({ theme });
    const onMenuColumnManagementClickHandler = () => {
        setIsColumnManagmentModalOpen(true);
        setTriggerRef(null);
    };

    const onFilterClickHandler = () => {
        setIsFilterModalOpen(true);
        setTriggerRef(null);
    };

    useLayoutEffect(() => {
        if (triggerRef) {
            setIsFilterModalOpen(false);
        }
    }, [triggerRef]);

    useEffect(() => {
        const tableContainer = document.getElementById("tableContainer");
        const handleScroll = () => {
            setTriggerRef(null);
        };
        if (tableContainer) {
            tableContainer.addEventListener("scroll", handleScroll);
            return () => {
                tableContainer.removeEventListener("scroll", handleScroll, true);
            };
        }
    }, [triggerRef]);

    const menuModalItems = useMemo(
        () => menuModalConfig(onMenuColumnManagementClickHandler, onFilterClickHandler),
        [onMenuColumnManagementClickHandler, onFilterClickHandler]
    );

    return (
        <Popper
            open={!!triggerRef}
            anchorEl={triggerRef as HTMLDivElement}
            placement="bottom-end"
            style={{ paddingTop: 9 }}>
            <ClickAwayListener onClickAway={() => setTriggerRef(null)}>
                <List className={classes.menuModalContainer}>
                    {menuModalItems.map((item, index) => (
                        <MenuModalItem
                            key={index}
                            title={item.title}
                            onClickHandler={item.onClickHandler}
                            icon={item.icon}
                            meta={header?.column?.columnDef?.meta as Record<string, string>}
                        />
                    ))}
                    <Divider className={classes.divider} />
                    <SortingMenu header={header} tsSorting={tsSorting} />
                </List>
            </ClickAwayListener>
        </Popper>
    );
};
