import { createColumnHelper } from "@tanstack/react-table";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { IClient } from "../../store/ClientStore";
import { SvgIcon } from "@mui/material";
import { CheckIcon } from "src/assets/svg";
import { t } from "i18next";

const columnHelper = createColumnHelper<WithGridRowId<IClient>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("code", {
            cell: (params) => params.getValue(),
            header: t("Client:properties.code"),
        }),
        columnHelper.accessor("email", {
            cell: (params) => params.getValue(),
            header: t("Client:properties.email"),
        }),
        columnHelper.accessor("phoneNumber", {
            cell: (params) => params.getValue(),
            header: t("Client:properties.phoneNumber"),
        }),
        columnHelper.accessor("active", {
            cell: (params) => {
                if (params.getValue()) {
                    return <SvgIcon component={CheckIcon} />;
                }
            },
            header: t("Client:properties.active"),
        }),
    ];
};
