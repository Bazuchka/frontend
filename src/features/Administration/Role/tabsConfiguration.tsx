import { t } from "i18next";
import { TabsConfiguration, TabType } from "src/shared/UI/BaseTabs/types";
import DataGuard from "src/shared/UI/DataGuard/DataGuard";
import { PermissionType } from "src/shared/services/PermissionService/types";
import PermissionTable from "./UI/PermissionTable";
import { RoleInfo } from "./UI/RoleInfo";
import roleStore from "./store/RoleStore";

export const roleConfiguration: () => TabsConfiguration = () => ({
    items: [
        {
            label: t("Shared:commonInfo"),
            type: TabType.MAIN_INFO,
            component: <RoleInfo />,
        },
        {
            label: t("Role:tabs.permissions"),
            type: TabType.MAIN_LIST,
            permission: {
                path: "Role.RolePermission",
                type: PermissionType.FORM,
            },
            component: (
                <DataGuard whenExist={roleStore.current}>{() => <PermissionTable />}</DataGuard>
            ),
        },
    ],
});
