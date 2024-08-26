import { t } from "i18next";
import { TabsConfiguration, TabType } from "src/shared/UI/BaseTabs/types";
import LegalEntityInfo from "./UI/LegalEntityInfo/LegalEntityInfo";
import LegalEntityContractsTable from "./UI/LegalEntityContractTable";
import { PermissionType } from "src/shared/services/PermissionService/types";

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
            component: <LegalEntityContractsTable />,
            permission: {
                path: "LegalEntity.Contract",
                type: PermissionType.TABLE,
            },
        },
    ],
});
