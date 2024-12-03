import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { GridRowModel } from "@mui/x-data-grid/models/gridRows";

export type WithGridRowId<T> = T & { id: GridRowId };

export interface BaseTableRow extends GridRowModel {
    id: GridRowId;
    isNew?: boolean;
}

export type BaseTableColumn = GridColDef & {
    required?: boolean;
    hidden?: boolean;
};

export interface BaseOrderedTableRow extends BaseTableRow {
    priority: number;
}
