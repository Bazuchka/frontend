import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { IContainerMovement } from "../store";

const columnHelper = createColumnHelper<WithGridRowId<IContainerMovement>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("eventCode", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersMoveTable.eventCode"),
        }),
        columnHelper.accessor("containerCode", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersMoveTable.containerCode"),
        }),
        columnHelper.accessor("transportType", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersMoveTable.transportType"),
        }),
        columnHelper.accessor("transportNumber", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersMoveTable.transportNumber"),
        }),
        columnHelper.accessor("etsngCode", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersMoveTable.etsngCode"),
        }),
        columnHelper.accessor("eventDateTime", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersMoveTable.eventDateTime"),
        }),
        columnHelper.accessor("orderNumber", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersMoveTable.orderNumber"),
        }),
        columnHelper.accessor("orderStatus", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersMoveTable.orderStatus"),
        }),
        columnHelper.accessor("clientCode", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersMoveTable.clientCode"),
        }),
    ];
};
