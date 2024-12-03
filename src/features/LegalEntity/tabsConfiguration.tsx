import { t } from "i18next";
import { PermissionType } from "src/shared/services/PermissionService/types";
import { TabsConfiguration, TabType } from "src/shared/UI/BaseTabs/types";
import DataGuard from "src/shared/UI/DataGuard/DataGuard";
import legalEntityStore from "./store/LegalEntityStore";
import LegalEntityContractsTable from "./UI/LegalEntityContractTable";
import LegalEntityInfo from "./UI/LegalEntityInfo/LegalEntityInfo";

export const legalEntityConfiguration: () => TabsConfiguration = () => ({
    items: [
        {
            label: t("Shared:commonInfo"),
            type: TabType.MAIN_INFO,
            component: <LegalEntityInfo />,
        },
        {
            label: t("LegalEntity:tabs.contracts"),
            type: TabType.MAIN_LIST,
            component: (
                <DataGuard whenExist={legalEntityStore.current}>
                    {(current) => (
                        <LegalEntityContractsTable
                            contractStore={current.contracts}
                            legalEntityId={current.id}
                        />
                    )}
                </DataGuard>
            ),
            permission: {
                path: "LegalEntity.Contract",
                type: PermissionType.TABLE,
            },
        },
    ],
});
