import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { Instance } from "mobx-state-tree";
import { ShippingOrderPreviewCargo } from "src/features/ShippingOrder/store/ShippingOrderPreviewStore/models";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";

const columnHelper =
    createColumnHelper<WithGridRowId<Instance<typeof ShippingOrderPreviewCargo>>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("clientGood", {
            cell: (params) => params.getValue()?.item ?? "-",
            header: t("ShippingOrderPreview:cargoParams.article"),
        }),
        columnHelper.accessor("clientGood", {
            cell: (params) => params.getValue()?.code ?? "-",
            header: t("ShippingOrderPreview:cargoParams.goodName"),
        }),
        columnHelper.accessor("batch", {
            cell: (params) => params.getValue()?.code ?? "-",
            header: t("ShippingOrderPreview:cargoParams.batch"),
        }),
        columnHelper.accessor("clientGood", {
            cell: (params) => params.getValue()?.unitOfMeasure.code ?? "-",
            header: t("ShippingOrderPreview:cargoParams.unitOfMeasure"),
        }),
        columnHelper.accessor("totalQuantity", {
            cell: (params) => params.getValue() ?? "-",
            header: t("ShippingOrderPreview:cargoParams.totalQuantity"),
        }),
    ];
};
