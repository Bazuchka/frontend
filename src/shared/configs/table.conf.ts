import { ColumnResizeMode, getCoreRowModel } from "@tanstack/react-table";
import { GridRowId } from "@mui/x-data-grid/models";

export const DEFAULT_TANSTACK_CONFIG = {
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange" as ColumnResizeMode,
    getRowId: (row: { id: GridRowId }) => row.id.toString(),
    defaultColumn: {
        size: 200,
        minSize: 30,
        maxSize: 500,
    },
};
