import { SvgIcon } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { CheckIcon } from "src/assets/svg";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { IService } from "../../store/ServiceStore";

const columnHelper = createColumnHelper<WithGridRowId<IService>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("code", {
            cell: (params) => params.getValue(),
            header: t("Service:properties.code"),
        }),
        columnHelper.accessor("unitOfMeasure", {
            cell: (params) => params.getValue()?.code,
            header: t("Service:properties.unitOfMeasure"),
        }),
        columnHelper.accessor("terminalArea", {
            cell: (params) =>
                params.getValue() ? t(`TerminalArea:types.${params.getValue()}`) : "-",
            header: t("Service:properties.terminalArea"),
        }),
        columnHelper.accessor("accrualMethod", {
            cell: (params) =>
                params.getValue() ? t(`AccrualMethod:types.${params.getValue()}`) : "-",
            header: t("Service:properties.accrualMethod"),
        }),
        columnHelper.accessor("accrualBase", {
            cell: (params) =>
                params.getValue() ? t(`AccrualBase:types.${params.getValue()}`) : "-",
            header: t("Service:properties.accrualBase"),
        }),
        columnHelper.accessor("active", {
            cell: (params) => {
                if (params.getValue()) {
                    return <SvgIcon component={CheckIcon} />;
                }
            },
            header: t("Service:properties.active"),
        }),
    ];
};
