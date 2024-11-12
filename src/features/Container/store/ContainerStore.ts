import { Instance, types } from "mobx-state-tree";
import { ForeignKey } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";

export const Container = types.model("Container", {
    id: types.identifier,
    code: types.maybe(types.string),
    syncId: types.maybe(types.string),
    containerType: types.string,
    weight: types.number,
    refrigerator: types.boolean,
    active: types.boolean,
    client: ForeignKey,
});

export const ContainerStore = createBaseStoreWithViewMediator({
    storeName: "Container",
    storeListModel: Container,
    storeMainInfoModel: Container,
});

export interface IContainer extends Instance<typeof Container> {}
