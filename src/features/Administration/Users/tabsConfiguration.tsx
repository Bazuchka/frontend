import { t } from "i18next";
import { TabsConfiguration, TabType } from "src/shared/UI/BaseTabs/types";
import DataGuard from "src/shared/UI/DataGuard/DataGuard";
import { UserInfo } from "src/features/Administration/Users/UI/UserInfo";
import userStore from "src/features/Administration/Users/store/UserStore";
import { UserClientTable } from "src/features/Administration/Users/UI/UserClientTable";
import { UserLegalEntityTable } from "src/features/Administration/Users/UI/UserLegalEntity";
import UserRoleTable from "src/features/Administration/Users/UI/UserRoleTable/UserRoleTable";

export const userConfiguration: (isCreateMode: boolean) => TabsConfiguration = (
    isCreateMode: boolean
) => ({
    items: [
        {
            label: t("Shared:commonInfo"),
            type: TabType.MAIN_INFO,
            component: <UserInfo />,
        },
        {
            label: t("User:tabs.clients"),
            type: TabType.LINKED_DATA,
            component: (
                <DataGuard whenExist={userStore.current}>
                    {(current) => (
                        <UserClientTable
                            store={current.clients}
                            userId={current.id}
                            isReadOnly={isCreateMode}
                        />
                    )}
                </DataGuard>
            ),
            disabled: isCreateMode,
        },
        {
            label: t("User:tabs.legalEntities"),
            type: TabType.MAIN_LIST,
            component: (
                <DataGuard whenExist={userStore.current}>
                    {(current) => (
                        <UserLegalEntityTable
                            store={current.legalEntities}
                            userId={current.id}
                            isReadOnly={isCreateMode}
                        />
                    )}
                </DataGuard>
            ),
            disabled: isCreateMode,
        },
        {
            label: t("User:tabs.roles"),
            type: TabType.MAIN_LIST,
            component: (
                <DataGuard whenExist={userStore.current}>
                    {(current) => <UserRoleTable store={current.roles} isReadOnly={isCreateMode} />}
                </DataGuard>
            ),
            disabled: isCreateMode,
        },
    ],
});
