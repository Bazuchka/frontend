import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { Instance } from "mobx-state-tree";
import { ReceivingOrderPreviewCargo } from "src/features/ReceivingOrder/store/ReceivingOrderPreviewStore/models";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";

const columnHelper =
    createColumnHelper<WithGridRowId<Instance<typeof ReceivingOrderPreviewCargo>>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("clientGood", {
            cell: (params) => params.getValue()?.item ?? "-",
            header: t("ReceivingOrderPreview:cargoParams.article"),
        }),
        columnHelper.accessor("clientGood", {
            cell: (params) => params.getValue()?.code ?? "-",
            header: t("ReceivingOrderPreview:cargoParams.goodName"),
        }),
        columnHelper.accessor("batch", {
            cell: (params) => params.getValue()?.code ?? "-",
            header: t("ReceivingOrderPreview:cargoParams.goodName"),
        }),
        columnHelper.accessor("clientGood", {
            cell: (params) => params.getValue()?.unitOfMeasure.code ?? "-",
            header: t("ReceivingOrderPreview:cargoParams.unitOfMeasure"),
        }),
        columnHelper.accessor("totalQuantity", {
            cell: (params) => params.getValue() ?? "-",
            header: t("ReceivingOrderPreview:cargoParams.totalQuantity"),
        }),
    ];
};
