import { createColumnHelper } from "@tanstack/react-table";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { IRemainsContainersItem } from "../../store";
import { t } from "i18next";
import { format } from "date-fns";

const columnHalper = createColumnHelper<WithGridRowId<IRemainsContainersItem>>();

export const getColumns = () => {
    return [
        columnHalper.accessor("containerCode", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersTable.containerCode"),
        }),
        columnHalper.accessor("etsngCode", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersTable.etsngCode"),
        }),
        columnHalper.accessor("eventDateTime", {
            cell: (params) => format(params.getValue() as Date, "dd.MM.yyyy HH:mm"),
            header: t("Remains:containersTable.eventDateTime"),
        }),
        columnHalper.accessor("orderNumber", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersTable.orderNumber"),
        }),
        columnHalper.accessor("orderStatus", {
            cell: (params) => t(`OrderStatus:types.${params.getValue()}`),
            header: t("Remains:containersTable.orderStatus"),
        }),
        columnHalper.accessor("clientCode", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersTable.clientCode"),
        }),
    ];
};
