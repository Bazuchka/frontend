import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { IContainerMovement } from "src/features/ContainerMovement/store";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";

const columnHalper = createColumnHelper<WithGridRowId<IContainerMovement>>();

export const getColumns = () => [
    columnHalper.accessor("code", {
        cell: (params) => params.getValue(),
        header: t("Containers:containersTableItem.move.code"),
    }),
    columnHalper.accessor("containerCode", {
        cell: (params) => params.getValue(),
        header: t("Containers:containersTableItem.move.transportType"),
    }),
    columnHalper.accessor("zone", {
        cell: (params) => params.getValue(),
        header: t("Containers:containersTableItem.move.transportCode"),
    }),
    columnHalper.accessor("platform", {
        cell: (params) => params.getValue(),
        header: t("Containers:containersTableItem.move.etsngCode"),
    }),
    columnHalper.accessor("good", {
        cell: (params) => params.getValue(),
        header: t("Containers:containersTableItem.move.date"),
    }),
    columnHalper.accessor("status", {
        cell: (params) => params.getValue(),
        header: t("Containers:containersTableItem.move.orderId"),
    }),
    columnHalper.accessor("neto", {
        cell: (params) => params.getValue(),
        header: t("Containers:containersTableItem.move.orderStatus"),
    }),
    columnHalper.accessor("date", {
        cell: (params) => params.getValue(),
        header: t("Containers:containersTableItem.move.client"),
    }),
    columnHalper.accessor("order", {
        cell: (params) => params.getValue(),
        header: t("Containers:containersTableItem.move.client"),
    }),
    columnHalper.accessor("damageList", {
        cell: (params) => params.getValue(),
        header: t("Containers:containersTableItem.move.client"),
    }),
];
