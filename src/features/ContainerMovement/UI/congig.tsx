import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { IContainerMovement } from "../store";

const columnHelper = createColumnHelper<WithGridRowId<IContainerMovement>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("code", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersMoveTable.code"),
        }),
        columnHelper.accessor("containerCode", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersMoveTable.containerCode"),
        }),
        columnHelper.accessor("zone", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersMoveTable.zone"),
        }),
        columnHelper.accessor("platform", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersMoveTable.platform"),
        }),
        columnHelper.accessor("good", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersMoveTable.good"),
        }),
        columnHelper.accessor("status", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersMoveTable.status"),
        }),
        columnHelper.accessor("neto", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersMoveTable.neto"),
        }),
        columnHelper.accessor("date", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersMoveTable.date"),
        }),
        columnHelper.accessor("order", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersMoveTable.order"),
        }),
        columnHelper.accessor("damageList", {
            cell: (params) =>
                params.getValue().reduce((result, damage) => result + damage + ", ", ""),
            header: t("Remains:containersMoveTable.damageList"),
        }),
    ];
};
