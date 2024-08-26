import { t } from "i18next";
import { TabsConfiguration, TabType } from "src/shared/UI/BaseTabs/types";
import { ClientInfo } from "./UI/ClientInfo";

export const clientsConfiguration: () => TabsConfiguration = () => ({
    items: [
        {
            label: t("Shared:commonInfo"),
            type: TabType.MAIN_INFO,
            component: <ClientInfo />,
        },
    ],
});
