import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { Instance } from "mobx-state-tree";
import { ReceivingOrderPreviewContainer } from "src/features/ReceivingOrder/store/ReceivingOrderPreviewStore/models";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";

const columnHelper =
    createColumnHelper<WithGridRowId<Instance<typeof ReceivingOrderPreviewContainer>>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("etranInvoice", {
            cell: (params) => params.getValue()?.code,
            header: t("ReceivingOrderPreview:cargoParams.etranInvoice"),
        }),
        columnHelper.accessor("railwayCarriage", {
            cell: (params) => params.getValue()?.code,
            header: t("ReceivingOrderPreview:cargoParams.railwayCarriage"),
        }),
        columnHelper.accessor("container", {
            cell: (params) => params.getValue()?.code ?? "-",
            header: t("ReceivingOrderPreview:cargoParams.containerNumber"),
        }),
        columnHelper.accessor("container", {
            cell: (params) => {
                const value = params.getValue();
                return value?.containerType ? t("ContainerType:types." + value.containerType) : "-";
            },
            header: t("ReceivingOrderPreview:cargoParams.containerType"),
        }),
        columnHelper.accessor("etsngCode", {
            cell: (params) => {
                const value = params.getValue();
                const canShow = value?.code && value.name;
                return canShow ? `${value.name} (${value.code})` : "-";
            },
            header: t("ReceivingOrderPreview:cargoParams.etsngCode"),
        }),
        columnHelper.accessor("netWeight", {
            cell: (params) => params.getValue(),
            header: t("ReceivingOrderPreview:cargoParams.netWeight"),
        }),
        columnHelper.accessor("grossWeight", {
            cell: (params) => params.getValue(),
            header: t("ReceivingOrderPreview:cargoParams.grossWeight"),
        }),
    ];
};
