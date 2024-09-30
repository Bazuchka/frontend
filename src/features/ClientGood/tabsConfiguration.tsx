import { t } from "i18next";
import { Instance } from "mobx-state-tree";
import { ClientGoodType } from "src/features/ClientGoodTypeTable/store/ClientGoodTypeStore";
import { PermissionType } from "src/shared/services/PermissionService/types";
import { TabsConfiguration, TabType } from "src/shared/UI/BaseTabs/types";
import DataGuard from "src/shared/UI/DataGuard/DataGuard";
import clientGoodStore from "./store/ClientGoodStore";
import { ClientGoodInfo } from "./UI/ClientGoodInfo";
import { GoodPackageBarcodeTable } from "./UI/GoodPackageBarcodeTable";
import { GoodPackageTable } from "./UI/GoodPackageTable";
import { GoodVariantTable } from "./UI/GoodVariant/Table";

export const clientGoodConfiguration: (isCreateMode: boolean) => TabsConfiguration = (
    isCreateMode: boolean
) => ({
    items: [
        {
            label: t("Shared:commonInfo"),
            type: TabType.MAIN_INFO,
            component: <ClientGoodInfo />,
        },
        {
            label: t("ClientGood:tabs.goodPackages"),
            type: TabType.MAIN_LIST,
            component: (
                <DataGuard whenExist={!!clientGoodStore.current}>
                    {() => <GoodPackageTable />}
                </DataGuard>
            ),
            permission: {
                path: "ClientGood.GoodPackage",
                type: PermissionType.FORM,
            },
            disabled: isCreateMode,
        },
        {
            label: t("ClientGood:tabs.goodPackagesBarcodes"),
            type: TabType.MAIN_LIST,
            component: (
                <DataGuard whenExist={!!clientGoodStore.current}>
                    {() => (
                        <GoodPackageBarcodeTable
                            fetchParams={{
                                goodVariant: {
                                    id: clientGoodStore.current?.id,
                                },
                            }}
                        />
                    )}
                </DataGuard>
            ),
            permission: {
                path: "ClientGood.GoodPackageBarcode",
                type: PermissionType.FORM,
            },
            disabled: isCreateMode,
            visibleRule: () =>
                !(clientGoodStore.current?.clientGoodType as Instance<typeof ClientGoodType>)
                    ?.isVariable || false,
        },
        {
            label: t("ClientGood:tabs.goodVariants"),
            type: TabType.MAIN_LIST,
            component: (
                <DataGuard whenExist={!!clientGoodStore.current}>
                    {() => <GoodVariantTable />}
                </DataGuard>
            ),
            permission: {
                path: "ClientGood.GoodVariant",
                type: PermissionType.FORM,
            },
            disabled: isCreateMode,
            visibleRule: () =>
                (clientGoodStore.current?.clientGoodType as Instance<typeof ClientGoodType>)
                    ?.isVariable || false,
        },
    ],
});
