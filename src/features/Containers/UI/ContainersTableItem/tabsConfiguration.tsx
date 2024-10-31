import { TabsConfiguration, TabType } from "src/shared/UI/BaseTabs/types";
import { t } from "i18next";
import ContainersTableItemCommon from "./ContainersTableItemCommon";

export const containersTableItemConfiguration: () => TabsConfiguration = () => ({
    items: [
        {
            label: t("Containers:containersTableItem.tabList.common"),
            type: TabType.MAIN_INFO,
            component: <ContainersTableItemCommon />,
        },
        {
            label: t("Containers:containersTableItem.tabList.move"),
            type: TabType.MAIN_LIST,
            component: <ContainersTableItemCommon />,
        },
    ],
});
