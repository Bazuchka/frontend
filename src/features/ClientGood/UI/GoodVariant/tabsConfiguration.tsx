import { t } from "i18next";
import { PermissionType } from "src/shared/services/PermissionService/types";
import { TabsConfiguration, TabType } from "src/shared/UI/BaseTabs/types";
import DataGuard from "src/shared/UI/DataGuard/DataGuard";
import clientGoodStore from "../../store/ClientGoodStore";
import GoodVariantForm from "./Form/GoodVariantForm";
import { FieldOptions } from "src/shared/hooks/useDrawerForm";
import { GoodPackageBarcodeTable } from "src/features/ClientGood/UI/GoodPackageBarcodeTable";
import { createBaseStore } from "src/shared/entities/BaseStore";
import { Instance } from "mobx-state-tree";

export const goodVariantConfiguration: (
    isCreateMode: boolean,
    defaultModel: Instance<ReturnType<typeof createBaseStore>>,
    fieldOptions?: FieldOptions,
    id?: string,
    onClose?: (submited?: boolean, data?: unknown) => void
) => TabsConfiguration = (isCreateMode: boolean, defaultModel, fieldOptions, id, onClose) => ({
    items: [
        {
            label: t("Shared:commonInfo"),
            type: TabType.MAIN_INFO,
            component: (
                <GoodVariantForm
                    id={id}
                    store={defaultModel}
                    fieldOptions={fieldOptions}
                    onClose={onClose}
                />
            ),
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
                                    id: id,
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
        },
    ],
});
