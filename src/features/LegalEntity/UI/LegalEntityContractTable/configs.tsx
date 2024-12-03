import { SvgIcon } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { t } from "i18next";
import { CheckIcon } from "src/assets/svg";
import { getValueForTextField } from "src/shared/helpers";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { IContract } from "../../store/ContractStore";

const columnHelper = createColumnHelper<WithGridRowId<IContract>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("code", {
            cell: (params) => params.getValue(),
            header: t("Contract:properties.code"),
        }),
        columnHelper.accessor("company", {
            cell: getValueForTextField("code"),
            header: t("Contract:properties.company"),
        }),
        columnHelper.accessor("contractNumber", {
            cell: (params) => params.getValue(),
            header: t("Contract:properties.contractNumber"),
        }),
        columnHelper.accessor("contractDate", {
            cell: (params) =>
                params.getValue() ? format(params.getValue() as Date, "dd.MM.yyyy") : "-",
            header: t("Contract:properties.contractDate"),
        }),
        columnHelper.accessor("validFrom", {
            cell: (params) =>
                params.getValue() ? format(params.getValue() as Date, "dd.MM.yyyy") : "-",
            header: t("Contract:properties.validFrom"),
        }),
        columnHelper.accessor("validTo", {
            cell: (params) =>
                params.getValue() ? format(params.getValue() as Date, "dd.MM.yyyy") : "-",
            header: t("Contract:properties.validTo"),
        }),
        columnHelper.accessor("currency", {
            cell: (params) => params.getValue()?.code,
            header: t("Contract:properties.currency"),
        }),
        columnHelper.accessor("active", {
            cell: (params) => {
                if (params.getValue()) {
                    return <SvgIcon component={CheckIcon} />;
                }
            },
            header: t("Contract:properties.active"),
        }),
    ];
};
