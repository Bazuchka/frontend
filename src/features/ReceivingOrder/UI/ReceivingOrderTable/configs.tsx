import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { t } from "i18next";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { IReceivingOrder } from "../../store/ReceivingOrderStore/ReceivingOrderStore";

const columnHelper = createColumnHelper<WithGridRowId<IReceivingOrder>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("number", {
            cell: (params) => params.getValue(),
            header: t("ReceivingOrder:properties.number"),
        }),
        columnHelper.accessor("client", {
            cell: (params) => params.getValue().code,
            header: t("ReceivingOrder:properties.client"),
        }),
        columnHelper.accessor("legalEntity", {
            cell: (params) => params.getValue().code,
            header: t("ReceivingOrder:properties.legalEntityShort"),
        }),
        columnHelper.accessor("orderStatus", {
            cell: (params) => t("OrderStatus:types." + params.getValue()),
            header: t("ReceivingOrder:properties.orderStatus"),
        }),
        columnHelper.accessor("planReceivingDateTime", {
            cell: (params) => format(params.getValue() as Date, "dd.MM.yyyy"),
            header: t("ReceivingOrder:properties.planReceivingDate"),
        }),
        columnHelper.accessor("planReceivingDateTime", {
            cell: (params) => format(params.getValue() as Date, "HH:mm"),
            header: t("ReceivingOrder:properties.planReceivingTime"),
        }),
        columnHelper.accessor("terminalArea", {
            cell: (params) => t("TerminalArea:types." + params.getValue()),
            header: t("ReceivingOrder:properties.terminalAreaShort"),
        }),
        columnHelper.accessor("transportType", {
            cell: (params) => t("TransportType:types." + params.getValue()),
            header: t("ReceivingOrder:properties.transportTypeShort"),
        }),
        columnHelper.accessor("createdAt", {
            cell: (params) => format(params.getValue() as Date, "dd.MM.yyyy"),
            header: t("ReceivingOrder:properties.createdAt"),
        }),
    ];
};
