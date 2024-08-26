import { createColumnHelper } from "@tanstack/react-table";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { SvgIcon } from "@mui/material";
import { CheckIcon } from "src/assets/svg";
import { t } from "i18next";
import { ILegalEntity } from "../../store/LegalEntityStore/LegalEntityStore";

const columnHelper = createColumnHelper<WithGridRowId<ILegalEntity>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("code", {
            cell: (params) => params.getValue(),
            header: t("LegalEntity:properties.code"),
        }),
        columnHelper.accessor("client", {
            cell: (params) => params.getValue().code,
            header: t("LegalEntity:properties.client"),
        }),
        columnHelper.accessor("inn", {
            cell: (params) => params.getValue(),
            header: t("LegalEntity:properties.inn"),
        }),
        columnHelper.accessor("kpp", {
            cell: (params) => params.getValue(),
            header: t("LegalEntity:properties.kpp"),
        }),
        columnHelper.accessor("active", {
            cell: (params) => {
                if (params.getValue()) {
                    return <SvgIcon component={CheckIcon} />;
                }
            },
            header: t("LegalEntity:properties.active"),
        }),
    ];
};
