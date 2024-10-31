import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { IContainerItem } from "../../store/ContainersStore";
import { CheckIcon, SvgXIcon } from "src/assets/svg";

const columnHelper = createColumnHelper<WithGridRowId<IContainerItem>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("code", {
            cell: (params) => params.getValue(),
            header: t("Containers:containersTable.code"),
        }),
        columnHelper.accessor("containerType", {
            cell: (params) => params.getValue(),
            header: t("Containers:containersTable.containerType"),
        }),
        columnHelper.accessor("client", {
            cell: (params) => params.getValue().code,
            header: t("Containers:containersTable.client"),
        }),
        columnHelper.accessor("weight", {
            cell: (params) => params.getValue(),
            header: t("Containers:containersTable.weight"),
        }),
        columnHelper.accessor("refrigerator", {
            cell: (params) => {
                return params.getValue() ? <CheckIcon /> : <SvgXIcon />;
            },
            header: t("Containers:containersTable.refrigerator"),
        }),
        columnHelper.accessor("active", {
            cell: (params) => {
                return params.getValue() ? <CheckIcon /> : <SvgXIcon />;
            },
            header: t("Containers:containersTable.active"),
        }),
    ];
};
