import { TabsConfiguration, TabType } from "src/shared/UI/BaseTabs/types";
import { t } from "i18next";
import ContainerTableItemCommon from "./ContainerTableItemCommon/ContainerTableItemCommon";
import ContainerTableItemMove from "./ContainerTableItemMove/ContainerTableItemMove";
import DataGuard from "src/shared/UI/DataGuard/DataGuard";
import { containerStore } from "../../store";

export const containersTableItemConfiguration: () => TabsConfiguration = () => ({
    items: [
        {
            label: t("Containers:containersTableItem.tabList.common"),
            type: TabType.MAIN_INFO,
            component: <ContainerTableItemCommon />,
        },
        {
            label: t("Containers:containersTableItem.tabList.move"),
            type: TabType.MAIN_LIST,
            component: (
                <DataGuard whenExist={containerStore.current}>
                    {(current) => (
                        <ContainerTableItemMove
                            store={current.movements}
                            containerId={current.id}
                        />
                    )}
                </DataGuard>
            ),
        },
    ],
});
