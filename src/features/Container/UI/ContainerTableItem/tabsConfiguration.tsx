import { TabsConfiguration, TabType } from "src/shared/UI/BaseTabs/types";
import { t } from "i18next";
import ContainerTableItemCommon from "./ContainerTableItemCommon/ContainerTableItemCommon";
import ContainerTableItemMove from "./ContainerTableItemMove/ContainerTableItemMove";

export const containersTableItemConfiguration: (containerId: string) => TabsConfiguration = (
    containerId
) => ({
    items: [
        {
            label: t("Containers:containersTableItem.tabList.common"),
            type: TabType.MAIN_INFO,
            component: <ContainerTableItemCommon />,
        },
        {
            label: t("Containers:containersTableItem.tabList.move"),
            type: TabType.MAIN_LIST,
            component: <ContainerTableItemMove containerId={containerId} />,
        },
    ],
});
