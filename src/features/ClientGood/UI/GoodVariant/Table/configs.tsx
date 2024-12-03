import { SvgIcon } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { CheckIcon } from "src/assets/svg";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { IGoodVariant } from "../../../store/GoodVariantStore";

const columnHelper = createColumnHelper<WithGridRowId<IGoodVariant>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("active", {
            cell: (params) => {
                if (params.getValue()) {
                    return <SvgIcon component={CheckIcon} />;
                }
            },
            header: t("GoodVariant:properties.active"),
        }),
        columnHelper.accessor("item", {
            cell: (params) => params.getValue(),
            header: t("GoodVariant:properties.item"),
        }),
        columnHelper.accessor("code", {
            cell: (params) => params.getValue(),
            header: t("GoodVariant:properties.code"),
        }),
    ];
};
