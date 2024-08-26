import { SvgIcon } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { t } from "i18next";
import { CheckIcon } from "src/assets/svg";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { ITermOfService } from "../../store/TermOfServiceStore/TermOfServiceStore";

const columnHelper = createColumnHelper<WithGridRowId<ITermOfService>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("code", {
            cell: (params) => params.getValue(),
            header: t("TermOfService:properties.code"),
        }),
        columnHelper.accessor("client", {
            cell: (params) => params.getValue()?.code,
            header: t("TermOfService:properties.client"),
        }),
        columnHelper.accessor("legalEntity", {
            cell: (params) => params.getValue()?.code,
            header: t("TermOfService:properties.legalEntity"),
        }),
        columnHelper.accessor("contract", {
            cell: (params) => params.getValue()?.code,
            header: t("TermOfService:properties.contract"),
        }),
        columnHelper.accessor("terminalArea", {
            cell: (params) => t("TerminalArea:types." + params.getValue()),
            header: t("TermOfService:properties.terminalArea"),
        }),
        columnHelper.accessor("validFrom", {
            cell: (params) =>
                params.getValue() ? format(params.getValue() as Date, "dd.MM.yyyy") : "-",
            header: t("TermOfService:properties.validFrom"),
        }),
        columnHelper.accessor("validTo", {
            cell: (params) => {
                if (params.row.original.indefinitely) {
                    return t("TermOfService:properties.indefinitely");
                }
                return params.getValue() ? format(params.getValue() as Date, "dd.MM.yyyy") : "-";
            },
            header: t("TermOfService:properties.validTo"),
        }),
        columnHelper.accessor("active", {
            cell: (params) => {
                if (params.getValue()) {
                    return <SvgIcon component={CheckIcon} />;
                }
            },
            header: t("TermOfService:properties.active"),
        }),
    ];
};
