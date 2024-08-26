import {
    Box,
    Checkbox,
    ClickAwayListener,
    InputAdornment,
    Popper,
    TextField,
    useTheme,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { Column, Table as TableType } from "@tanstack/react-table";
import { GridRowModel } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import useStyles from "./styles";
import { BaseTableRow } from "../types";

export interface IColumnManagmentProps<T extends BaseTableRow & GridRowModel> {
    table: TableType<T>;
    isOpen: boolean;
    position: number;
    setIsColumnManagmentModalOpen: (val: boolean) => void;
}

export const ColumnManagmentModal = <T extends BaseTableRow & GridRowModel>(
    props: IColumnManagmentProps<T>
) => {
    const { table, isOpen, setIsColumnManagmentModalOpen, position } = props;
    const theme = useTheme();
    const classes = useStyles({ theme });
    const { t } = useTranslation();
    const [filterColumnText, setFilterColumnText] = useState("");

    useEffect(() => {
        if (!isOpen) {
            setFilterColumnText("");
        }
    }, [isOpen]);

    const onClickAwayHandler = () => {
        if (table.getVisibleLeafColumns().length > 1) {
            setIsColumnManagmentModalOpen(false);
        }
    };

    const onCheckBoxClick = (column: Column<T, unknown>, e: unknown) => {
        column.getToggleVisibilityHandler()(e);
    };

    return (
        <Popper open={isOpen} style={{ position: "fixed", top: 236, left: position - 295 }}>
            <ClickAwayListener onClickAway={onClickAwayHandler}>
                <Box
                    component="div"
                    className={classes.modalColumnManagmentContainer}
                    style={{
                        overflowY: table.getAllLeafColumns().length > 11 ? "scroll" : "hidden",
                    }}>
                    <label className={classes.menuLabel}>
                        <Checkbox
                            className={classes.menuCheckbox}
                            {...{
                                checked: table.getIsAllColumnsVisible(),
                                onChange: table.getToggleAllColumnsVisibilityHandler(),
                            }}
                        />
                        <TextField
                            value={filterColumnText}
                            onChange={(e) => setFilterColumnText(e.target.value)}
                            placeholder={t("Shared:search") as string}
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment
                                        position="start"
                                        className={classes.inputIconWrapper}>
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                style: { padding: 0, textAlign: "center" },
                            }}
                        />
                    </label>
                    {table.getAllLeafColumns().map((column) => {
                        return (
                            typeof column.columnDef.header === "string" &&
                            (filterColumnText === "" ||
                                column.columnDef.header
                                    .toLocaleLowerCase()
                                    .includes(filterColumnText.toLocaleLowerCase())) && (
                                <Box key={column.id} style={{ height: "30px" }}>
                                    <label className={classes.menuLabel}>
                                        <Checkbox
                                            className={classes.menuCheckbox}
                                            {...{
                                                checked: column.getIsVisible(),
                                                onChange: (e) => onCheckBoxClick(column, e),
                                            }}
                                        />
                                        {column.columnDef.header}
                                    </label>
                                </Box>
                            )
                        );
                    })}
                </Box>
            </ClickAwayListener>
        </Popper>
    );
};
