import { SvgIcon } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { t } from "i18next";
import { CheckIcon } from "src/assets/svg";
import { getValueForTextField } from "src/shared/helpers";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { IClientDriver } from "./store/ClientDriverStore";

const columnHelper = createColumnHelper<WithGridRowId<IClientDriver>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("code", {
            cell: (params) => params.getValue(),
            header: t("ClientDriver:properties.code"),
        }),
        columnHelper.accessor("client", {
            cell: (params) => params.getValue()?.code,
            header: t("ClientDriver:properties.client"),
        }),
        columnHelper.accessor("phoneNumber", {
            cell: getValueForTextField(),
            header: t("ClientDriver:properties.phoneNumber"),
        }),
        columnHelper.accessor("passportNumber", {
            cell: (params) => (params.getValue() ? params.getValue() : "-"),
            header: t("ClientDriver:properties.passportNumber"),
        }),
        columnHelper.accessor("drivingLicenseNumber", {
            cell: (params) => (params.getValue() ? params.getValue() : "-"),
            header: t("ClientDriver:properties.drivingLicenseNumber"),
        }),
        columnHelper.accessor("POANumber", {
            cell: getValueForTextField(),
            header: t("ClientDriver:properties.poaNumber"),
        }),
        columnHelper.accessor("POAValidTo", {
            cell: (params) =>
                params.getValue() ? format(params.getValue() as Date, "dd.MM.yyyy") : "-",
            header: t("ClientDriver:properties.poaValidTo"),
        }),
        columnHelper.accessor("active", {
            cell: (params) => {
                if (params.getValue()) {
                    return <SvgIcon component={CheckIcon} />;
                }
            },
            header: t("ClientDriver:properties.active"),
        }),
    ];
};
