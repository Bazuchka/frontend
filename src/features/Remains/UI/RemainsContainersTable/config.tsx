import { createColumnHelper } from "@tanstack/react-table";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { IRemainsContainersItem } from "../../store";
import { t } from "i18next";

const columnHalper = createColumnHelper<WithGridRowId<IRemainsContainersItem>>();

export const getColumns = () => {
    return [
        columnHalper.accessor("code", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersTable.code"),
        }),
        columnHalper.accessor("transport", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersTable.transport"),
        }),
        columnHalper.accessor("transportCode", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersTable.transportCode"),
        }),
        columnHalper.accessor("good", {
            cell: (params) => params.getValue().code,
            header: t("Remains:containersTable.good"),
        }),
        columnHalper.accessor("date", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersTable.date"),
        }),
        columnHalper.accessor("order", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersTable.order"),
        }),
        columnHalper.accessor("orderStatus", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersTable.orderStatus"),
        }),
        columnHalper.accessor("client", {
            cell: (params) => params.getValue(),
            header: t("Remains:containersTable.client"),
        }),
    ];
};
