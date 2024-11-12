import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { IContainerMovement } from "src/features/ContainerMovement/store";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";

const columnHalper = createColumnHelper<WithGridRowId<IContainerMovement>>();

export const getColumns = () => [
    columnHalper.accessor("eventCode", {
        cell: (params) => params.getValue(),
        header: t("Containers:containersTableItem.move.eventCode"),
    }),
    columnHalper.accessor("transportType", {
        cell: (params) => params.getValue(),
        header: t("Containers:containersTableItem.move.transportType"),
    }),
    columnHalper.accessor("transportNumber", {
        cell: (params) => params.getValue(),
        header: t("Containers:containersTableItem.move.transportNumber"),
    }),
    columnHalper.accessor("etsngCode", {
        cell: (params) => params.getValue(),
        header: t("Containers:containersTableItem.move.etsngCode"),
    }),
    columnHalper.accessor("eventDateTime", {
        cell: (params) => params.getValue(),
        header: t("Containers:containersTableItem.move.eventDateTime"),
    }),
    columnHalper.accessor("orderNumber", {
        cell: (params) => params.getValue(),
        header: t("Containers:containersTableItem.move.orderNumber"),
    }),
    columnHalper.accessor("orderStatus", {
        cell: (params) => params.getValue(),
        header: t("Containers:containersTableItem.move.orderStatus"),
    }),
    columnHalper.accessor("clientCode", {
        cell: (params) => params.getValue(),
        header: t("Containers:containersTableItem.move.clientCode"),
    }),
];
