import {
    Box,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useTheme,
} from "@mui/material";
import { GridRowId, GridRowModel } from "@mui/x-data-grid";
import { ExpandedState, flexRender, Header, Table as TableType } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { CSSProperties, ElementRef, useRef, useState } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";
import { Sorting } from "../../entities/Sorting";
import { BaseTableRow } from "./types";
import { ColumnManagmentModal } from "./UI/ColumnManagmentModal";
import { EditableRow } from "./UI/EditableRow";
import { MenuDots } from "./UI/MenuDots";
import { SortingIcon } from "./UI/SortingIcon";
import useStyles from "./UI/styles";

type BaseTableProps<T extends BaseTableRow & GridRowModel> = {
    table: TableType<T>;
    onRowClick?: (id: GridRowId) => () => void;
    onRowDoubleClick?: (id: GridRowId) => () => void;
    isLoading?: boolean;
    isCreateMode?: boolean;
    isEditMode?: boolean;
    footer?: (onSubmit: () => void) => JSX.Element;
    onEditableRowStateChange?: (formState: {
        errors: FieldErrors<Record<string, T>>;
        isValid: boolean;
        isDirty: boolean;
    }) => void;
    onSubmit?: (model: FieldValues) => void;
    style?: CSSProperties;
    sorting: Sorting;
    expandedState?: ExpandedState;
};

export const TSBaseTableUI = observer(
    <T extends object & { id: GridRowId }>(props: BaseTableProps<T>) => {
        const {
            table,
            onRowClick,
            onRowDoubleClick,
            isCreateMode,
            isEditMode,
            isLoading,
            onEditableRowStateChange,
            footer,
            onSubmit: onExternalSubmit,
            style,
            sorting,
        } = props;

        const theme = useTheme();
        const classes = useStyles({ theme });
        const [isColumnManagmentModalOpen, setIsColumnManagmentModalOpen] = useState(false);
        const [, setFilterModalOpen] = useState(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [columnMenuModalPosition, setColumnMenuModalPosition] = useState({ x: 0, y: 0 });
        const [, setActiveHeader] = useState<Header<T, unknown> | null>(null);
        const editableRowRef = useRef<ElementRef<typeof EditableRow>>(null);
        const newRowRef = useRef<ElementRef<typeof EditableRow>>(null);

        const handleSubmit = () => {
            if (isEditMode) {
                editableRowRef.current?.submitForm();
            }
            if (isCreateMode) {
                newRowRef.current?.submitForm();
            }
        };

        return (
            <Box className={classes.wrapper} style={style}>
                {isLoading && <LinearProgress className={classes.progress} />}
                <TableContainer className={classes.tableContainer} id="tableContainer">
                    <ColumnManagmentModal
                        table={table}
                        isOpen={isColumnManagmentModalOpen}
                        setIsColumnManagmentModalOpen={setIsColumnManagmentModalOpen}
                        position={columnMenuModalPosition}
                    />
                    <Table stickyHeader style={{ overflowX: "auto" }}>
                        <TableHead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableCell
                                            className={`${classes.tableCellHeader} ${
                                                header.id === "checkbox" &&
                                                classes.tableCellCheckbox
                                            }`}
                                            style={{
                                                width: header.getSize(),
                                            }}
                                            key={header.id}>
                                            <div
                                                className={`${
                                                    header.id !== "checkbox" && classes.headerInner
                                                }`}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column.columnDef.header,
                                                          header.getContext()
                                                      )}
                                                <div
                                                    {...{
                                                        onDoubleClick: () =>
                                                            header.column.resetSize(),
                                                        onMouseDown: header.getResizeHandler(),
                                                        onTouchStart: header.getResizeHandler(),
                                                        className: `${classes.resizer} ${
                                                            header.column.getIsResizing() &&
                                                            classes.isResizing
                                                        }`,
                                                    }}
                                                />
                                                {header.id !== "checkbox" && (
                                                    <MenuDots
                                                        setIsColumnManagmentModalOpen={
                                                            setIsColumnManagmentModalOpen
                                                        }
                                                        setColumnMenuModalPosition={
                                                            setColumnMenuModalPosition
                                                        }
                                                        setIsFilterModalOpen={setFilterModalOpen}
                                                        setActiveHeader={setActiveHeader}
                                                        tsSorting={sorting}
                                                        header={header}
                                                    />
                                                )}
                                                {header.column.getCanSort() && (
                                                    <SortingIcon
                                                        tsSorting={sorting}
                                                        columnId={header.id}
                                                    />
                                                )}
                                            </div>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody>
                            {isCreateMode && (
                                <EditableRow
                                    onSubmit={onExternalSubmit!}
                                    ref={newRowRef}
                                    onRowStateChange={onEditableRowStateChange!}
                                    columns={table.options.columns}
                                />
                            )}
                            {table.getRowModel().rows.map((row) => {
                                const isRowSelected = row.getIsSelected();

                                if (isRowSelected && isEditMode) {
                                    const columns = table.options.columns;

                                    return (
                                        <EditableRow
                                            onSubmit={onExternalSubmit!}
                                            key={row.id}
                                            ref={editableRowRef}
                                            onRowStateChange={onEditableRowStateChange!}
                                            columns={columns}
                                            row={row}
                                        />
                                    );
                                }

                                return (
                                    <TableRow
                                        onClick={onRowClick?.(row.id)}
                                        onDoubleClick={onRowDoubleClick?.(row.id)}
                                        className={
                                            isRowSelected ? classes.rowSelected : classes.row
                                        }
                                        key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                style={{ width: cell.column.getSize() }}
                                                key={cell.id}
                                                className={`${
                                                    cell.column.id === "checkbox" &&
                                                    classes.tableCellCheckbox
                                                }`}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                {footer && <Box className={classes.footerWrapper}>{footer(handleSubmit)}</Box>}
            </Box>
        );
    }
);
