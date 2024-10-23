import { toJS } from "mobx";
import { Instance, getSnapshot, getType, types } from "mobx-state-tree";
import { viewStore } from "src/app/store";
import { AlertMode } from "../types/types";

const storeToMenuKeyMap = new Map<string, string>([
    ["ClientStore", "client"],
    ["LegalEntityStore", "legalEntity"],
    ["ServiceStore", "service"],
    ["ClientGoodStore", "clientGood"],
    ["TermOfServiceStore", "termOfService"],
    ["ReceivingOrderStore", "receivingOrder"],
    ["ShippingOrderStore", "shippingOrder"],
    ["UserStore", "user"],
    ["RoleStore", "role"],
]);

const ViewMediator = types
    .model()
    .views((self) => ({
        get globalFilters() {
            const snapshot = getSnapshot(viewStore.globalFilters);

            // exceptions for clients and legal entities pages
            if (getType(self).name === "ClientStore") {
                return { ...snapshot, id: snapshot.client?.id };
            } else if (getType(self).name === "LegalEntityStore") {
                return { ...snapshot, id: snapshot.legalEntity?.id };
            }

            return getSnapshot(viewStore.globalFilters);
        },
    }))
    .actions((self) => {
        function onSnapshotConvertionError(modelName: string, id: string) {
            viewStore.addAlert({
                alertMode: AlertMode.warning,
                message: "Shared:AlertMessages.snapshotConvertion",
                context: {
                    contextObject: {
                        modelName,
                        id,
                    },
                },
                closeTime: 10000,
            });
        }

        function onCurrentModelSet(model: Record<string, unknown>) {
            viewStore.setMenuParams({
                [storeToMenuKeyMap.get(getType(self).name)!]: {
                    path: (model as { id: string }).id,
                    label: (model as { code: string }).code,
                    metadata: toJS(model),
                },
            });
        }

        function onCurrentModelDestroy() {
            viewStore.setMenuParams({
                [storeToMenuKeyMap.get(getType(self).name)!]: undefined,
            });
        }
        return {
            onCurrentModelSet,
            onCurrentModelDestroy,
            onSnapshotConvertionError,
        };
    });

export default ViewMediator;

export interface IViewMediator extends Instance<typeof ViewMediator> {}
