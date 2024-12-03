import React from "react";
import TablePagination from "@mui/material/TablePagination";
import { useTranslation } from "react-i18next";

export interface PaginationChange {
    page: number;
    size: number;
}

export interface PaginationProps {
    page: number;
    size: number;
    disabled: boolean;
    totalElements: number;
    onChange: (data: PaginationChange) => void;
}

export const Pagination = ({ page, size, disabled, totalElements, onChange }: PaginationProps) => {
    const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        onChange({ page: newPage, size });
    };

    const { t } = useTranslation();

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const pageSize = parseInt(event.target.value, 10);
        onChange({ page, size: pageSize });
    };

    return (
        <TablePagination
            component="div"
            count={totalElements}
            page={page}
            onPageChange={handleChangePage}
            disabled={disabled}
            rowsPerPage={size}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={t("Shared:paginationText")}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${t("Shared:of")} ${count}`}
        />
    );
};
