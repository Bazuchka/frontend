import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { format } from "date-fns";
import { IContainerMovement } from "src/features/ContainerMovement/store";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";

const columnHalper = createColumnHelper<WithGridRowId<IContainerMovement>>();

export const getColumns = () => [
    columnHalper.accessor("eventCode", {
        cell: (params) => t(`Containers:moveType.${params.getValue()}`),
        header: t("Containers:containersTableItem.move.eventCode"),
    }),
    columnHalper.accessor("transportType", {
        cell: (params) => t(`TransportType:types.${params.getValue()}`),
        header: t("Containers:containersTableItem.move.transportType"),
    }),
    columnHalper.accessor("transportNumber", {
        cell: (params) => params.getValue(),
        header: t("Containers:containersTableItem.move.transportNumber"),
    }),
    columnHalper.accessor("etsngCode", {
        cell: (params) => {
            const item = params.getValue();
            return `${item.name} (${item.code})`;
        },
        header: t("Containers:containersTableItem.move.etsngCode"),
    }),
    columnHalper.accessor("eventDateTime", {
        cell: (params) => format(params.getValue() as Date, "dd.MM.yyyy HH:mm"),
        header: t("Containers:containersTableItem.move.eventDateTime"),
    }),
    columnHalper.accessor("orderNumber", {
        cell: (params) => params.getValue(),
        header: t("Containers:containersTableItem.move.orderNumber"),
    }),
    columnHalper.accessor("orderStatus", {
        cell: (params) => t(`OrderStatus:types.${params.getValue()}`),
        header: t("Containers:containersTableItem.move.orderStatus"),
    }),
    columnHalper.accessor("clientCode", {
        cell: (params) => params.getValue(),
        header: t("Containers:containersTableItem.move.clientCode"),
    }),
];
