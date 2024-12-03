import { t } from "i18next";
import { PermissionType } from "src/shared/services/PermissionService/types";
import { TabsConfiguration, TabType } from "src/shared/UI/BaseTabs/types";
import DataGuard from "src/shared/UI/DataGuard/DataGuard";
import { termOfServiceStore } from "./store/TermOfServiceStore";
import { TermOfPeriodicServiceTable } from "./UI/TermOfPeriodicServiceTable";
import { TermOfRequestedServiceTable } from "./UI/TermOfRequestedServiceTable";
import { TermOfServiceInfo } from "./UI/TermOfServiceInfo";

export const termOfServiceConfiguration: (isCreateMode: boolean) => TabsConfiguration = (
    isCreateMode
) => ({
    items: [
        {
            label: t("Shared:commonInfo"),
            type: TabType.MAIN_INFO,
            component: (
                <DataGuard whenExist={isCreateMode || !!termOfServiceStore.current}>
                    {() => <TermOfServiceInfo />}
                </DataGuard>
            ),
        },
        {
            label: t("TermOfService:tabs.periodicServices"),
            type: TabType.MAIN_LIST,
            component: (
                <DataGuard whenExist={!!termOfServiceStore.current}>
                    {() => <TermOfPeriodicServiceTable />}
                </DataGuard>
            ),
            disabled: isCreateMode,
            permission: {
                path: "TermOfService.TermOfPeriodicService",
                type: PermissionType.FORM,
            },
        },
        {
            label: t("TermOfService:tabs.requestedServices"),
            type: TabType.MAIN_LIST,
            component: (
                <DataGuard whenExist={!!termOfServiceStore.current}>
                    {() => <TermOfRequestedServiceTable />}
                </DataGuard>
            ),
            disabled: isCreateMode,
            permission: {
                path: "TermOfService.TermOfRequestedService",
                type: PermissionType.FORM,
            },
        },
    ],
});
