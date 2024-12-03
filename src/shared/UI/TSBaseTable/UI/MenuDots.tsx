import { Box, useTheme } from "@mui/material";
import { GridRowModel } from "@mui/x-data-grid";
import { Header } from "@tanstack/react-table";
import { MouseEvent, useRef, useState } from "react";
import useStyles from "src/shared/UI/TSBaseTable/UI/styles";
import { ITSSorting } from "../store/TSSorting";
import { BaseTableRow } from "../types";
import { MenuModal } from "./MenuModal";

export interface IMenuDots<T extends BaseTableRow & GridRowModel> {
    setIsColumnManagmentModalOpen: (val: boolean) => void;
    setIsFilterModalOpen: (val: boolean) => void;
    setColumnMenuModalPosition: (position: { x: number; y: number }) => void;
    tsSorting: ITSSorting;
    setActiveHeader: (val: Header<T, unknown> | null) => void;
    header: Header<T, unknown>;
}

export const MenuDots = <T extends BaseTableRow & GridRowModel>(props: IMenuDots<T>) => {
    const {
        setIsColumnManagmentModalOpen,
        setColumnMenuModalPosition,
        setIsFilterModalOpen,
        setActiveHeader,
        tsSorting,
        header,
    } = props;
    const theme = useTheme();
    const classes = useStyles({ theme });
    const dotsRef = useRef<HTMLDivElement>(null);
    const [triggerRef, setTriggerRef] = useState<HTMLDivElement | null>(null);

    const handleDotsClick = (e: MouseEvent<HTMLDivElement>) => {
        setColumnMenuModalPosition({ x: e.clientX, y: e.clientY });
        setTriggerRef(dotsRef.current as HTMLDivElement);
        setActiveHeader(header);
    };

    return (
        <>
            <Box
                component="div"
                className={classes.dotContainer}
                onClick={(e) => handleDotsClick(e)}
                ref={dotsRef}
                data-testid="dots-container">
                <Box className={classes.dot}></Box>
                <Box className={classes.dot}></Box>
                <Box className={classes.dot}></Box>
            </Box>
            <MenuModal
                setIsColumnManagmentModalOpen={setIsColumnManagmentModalOpen}
                setIsFilterModalOpen={setIsFilterModalOpen}
                setTriggerRef={setTriggerRef}
                triggerRef={triggerRef}
                tsSorting={tsSorting}
                header={header}
            />
        </>
    );
};
