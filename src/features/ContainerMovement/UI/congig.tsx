import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { format } from "date-fns";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { IContainerMovement } from "../store";

const columnHelper = createColumnHelper<WithGridRowId<IContainerMovement>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("eventCode", {
            cell: (params) => t(`Containers:moveType.${params.getValue()}`),
            header: t("Remains:containersMoveTable.eventCode"),
        }),
        columnHelper.accessor("containerCode", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersMoveTable.containerCode"),
        }),
        columnHelper.accessor("transportType", {
            cell: (params) => t(`TransportType:types.${params.getValue()}`),
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
            cell: (params) => format(params.getValue() as Date, "dd.MM.yyyy HH:mm"),
            header: t("Remains:containersMoveTable.eventDateTime"),
        }),
        columnHelper.accessor("orderNumber", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersMoveTable.orderNumber"),
        }),
        columnHelper.accessor("orderStatus", {
            cell: (params) => t(`OrderStatus:types.${params.getValue()}`),
            header: t("Remains:containersMoveTable.orderStatus"),
        }),
        columnHelper.accessor("clientCode", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersMoveTable.clientCode"),
        }),
    ];
};
