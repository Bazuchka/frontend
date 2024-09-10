import { createColumnHelper } from "@tanstack/react-table";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { SvgIcon } from "@mui/material";
import { CheckIcon } from "src/assets/svg";
import { t } from "i18next";
import { IUser } from "src/features/Administration/Users/store/UserStore";

const columnHelper = createColumnHelper<WithGridRowId<IUser>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("username", {
            cell: (params) => params.getValue(),
            header: t("User:properties.username"),
        }),
        columnHelper.accessor("fullname", {
            cell: (params) => params.getValue(),
            header: t("User:properties.fullname"),
        }),
        columnHelper.accessor("type", {
            cell: (params) => t("User:types." + params.getValue()),
            header: t("User:properties.type"),
        }),
        columnHelper.accessor("active", {
            cell: (params) => {
                if (params.getValue()) {
                    return <SvgIcon component={CheckIcon} />;
                }
            },
            header: t("User:properties.active"),
        }),
    ];
};
