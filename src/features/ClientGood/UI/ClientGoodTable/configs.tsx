import { createColumnHelper } from "@tanstack/react-table";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { SvgIcon } from "@mui/material";
import { CheckIcon } from "src/assets/svg";
import { t } from "i18next";
import { IClientGood } from "../../store/ClientGoodStore";

const columnHelper = createColumnHelper<WithGridRowId<IClientGood>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("item", {
            cell: (params) => params.getValue(),
            header: t("ClientGood:properties.item"),
        }),
        columnHelper.accessor("client", {
            cell: (params) => params.getValue()?.code,
            header: t("ClientGood:properties.client"),
        }),
        columnHelper.accessor("code", {
            cell: (params) => params.getValue(),
            header: t("ClientGood:properties.code"),
        }),
        columnHelper.accessor("unitOfMeasure", {
            cell: (params) => params.getValue()?.code,
            header: t("ClientGood:properties.unitOfMeasure"),
        }),
        columnHelper.accessor("goodType", {
            cell: (params) => params.getValue()?.code,
            header: t("ClientGood:properties.goodType"),
        }),
        columnHelper.accessor("clientGoodType", {
            cell: (params) => params.getValue()?.code,
            header: t("ClientGood:properties.clientGoodType"),
        }),
        columnHelper.accessor("dangerClass", {
            cell: (params) => params.getValue()?.code,
            header: t("ClientGood:properties.dangerClass"),
        }),
        columnHelper.accessor("active", {
            cell: (params) => {
                if (params.getValue()) {
                    return <SvgIcon component={CheckIcon} />;
                }
            },
            header: t("ClientGood:properties.active"),
        }),
    ];
};
