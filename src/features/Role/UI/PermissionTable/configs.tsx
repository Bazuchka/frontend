import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { IPermission } from "../../store/PermissionStore";

const columnHelper = createColumnHelper<WithGridRowId<IPermission>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("path", {
            cell: (params) => params.getValue(),
            header: t("Permission:properties.code"),
        }),
    ];
};
