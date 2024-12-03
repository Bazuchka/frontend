import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { t } from "i18next";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { IShippingOrder } from "../../store/ShippingOrderStore/ShippingOrderStore";

const columnHelper = createColumnHelper<WithGridRowId<IShippingOrder>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("number", {
            cell: (params) => params.getValue(),
            header: t("ShippingOrder:properties.number"),
        }),
        columnHelper.accessor("client", {
            cell: (params) => params.getValue().code,
            header: t("ShippingOrder:properties.client"),
        }),
        columnHelper.accessor("legalEntity", {
            cell: (params) => params.getValue().code,
            header: t("ShippingOrder:properties.legalEntityShort"),
        }),
        columnHelper.accessor("orderStatus", {
            cell: (params) => t("OrderStatus:types." + params.getValue()),
            header: t("ShippingOrder:properties.orderStatus"),
        }),
        columnHelper.accessor("plannedShippingDateTime", {
            cell: (params) => format(params.getValue() as Date, "dd.MM.yyyy"),
            header: t("ShippingOrder:properties.planShippingDate"),
        }),
        columnHelper.accessor("plannedShippingDateTime", {
            cell: (params) => format(params.getValue() as Date, "HH:mm"),
            header: t("ShippingOrder:properties.planShippingTime"),
        }),
        columnHelper.accessor("terminalArea", {
            cell: (params) => t("TerminalArea:types." + params.getValue()),
            header: t("ShippingOrder:properties.terminalArea"),
        }),
        columnHelper.accessor("transportType", {
            cell: (params) => t("TransportType:types." + params.getValue()),
            header: t("ShippingOrder:properties.transportType"),
        }),
        columnHelper.accessor("createdAt", {
            cell: (params) => format(params.getValue() as Date, "dd.MM.yyyy"),
            header: t("ShippingOrder:properties.createdAt"),
        }),
    ];
};
