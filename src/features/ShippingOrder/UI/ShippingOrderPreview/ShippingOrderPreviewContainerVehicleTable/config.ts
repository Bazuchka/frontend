import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { Instance } from "mobx-state-tree";
import { ShippingOrderPreviewContainer } from "src/features/ShippingOrder/store/ShippingOrderPreviewStore/models";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";

const columnHelper =
    createColumnHelper<WithGridRowId<Instance<typeof ShippingOrderPreviewContainer>>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("container", {
            cell: (params) => params.getValue()?.code ?? "-",
            header: t("ShippingOrderPreview:cargoParams.containerNumber"),
        }),
        columnHelper.accessor("container", {
            cell: (params) => {
                const value = params.getValue();
                return value?.containerType ? t("ContainerType:types." + value.containerType) : "-";
            },
            header: t("ShippingOrderPreview:cargoParams.containerType"),
        }),
        columnHelper.accessor("etsngCode", {
            cell: (params) => {
                const value = params.getValue();
                const canShow = value?.code && value.name;
                return canShow ? `${value.name} (${value.code})` : "-";
            },
            header: t("ShippingOrderPreview:cargoParams.etsngCode"),
        }),
        columnHelper.accessor("netWeight", {
            cell: (params) => params.getValue(),
            header: t("ShippingOrderPreview:cargoParams.netWeight"),
        }),
        columnHelper.accessor("grossWeight", {
            cell: (params) => params.getValue(),
            header: t("ShippingOrderPreview:cargoParams.grossWeight"),
        }),
    ];
};
