import { t } from "i18next";
import { TabsConfiguration, TabType } from "src/shared/UI/BaseTabs/types";
import ServiceInfo from "./UI/ServiceInfo";

export const servicesConfiguration: () => TabsConfiguration = () => ({
    items: [
        {
            label: t("Shared:commonInfo"),
            type: TabType.MAIN_INFO,
            component: <ServiceInfo />,
        },
    ],
});
