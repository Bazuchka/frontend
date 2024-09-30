import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { IRole } from "../../store/RoleStore/RoleStore";

const columnHelper = createColumnHelper<WithGridRowId<IRole>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("code", {
            cell: (params) => params.getValue(),
            header: t("Role:properties.code"),
        }),
        columnHelper.accessor("name", {
            cell: (params) => params.getValue(),
            header: t("Role:properties.name"),
        }),
    ];
};
