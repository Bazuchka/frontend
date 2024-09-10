import { Instance, types } from "mobx-state-tree";
import { Container } from "src/features/Container/store/ContainerStore";
import { ForeignKey } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";

export const ReceivingOrderContainer = types.model("ReceivingOrderContainer", {
    id: types.identifier,
    code: types.maybe(types.string),
    syncId: types.maybe(types.string),
    container: Container,
    sealNumbers: types.array(types.string),
    empty: types.boolean,
    weight: types.number,
    customsClearance: types.boolean,
    dangerousCargo: types.boolean,
});

export const ReceivingOrderRailwayContainer = types
    .compose(
        ReceivingOrderContainer,
        types.model({
            railwayCarriage: ForeignKey,
        })
    )
    .named("ReceivingOrderRailwayContainer");

export const ReceivingOrderContainerStore = createBaseStoreWithViewMediator({
    storeName: "ReceivingOrderContainer",
    storeListModel: ReceivingOrderContainer,
    storeMainInfoModel: ReceivingOrderContainer,
});

export const ReceivingOrderRailwayContainerStore = createBaseStoreWithViewMediator({
    storeName: "ReceivingOrderContainer",
    storeListModel: ReceivingOrderRailwayContainer,
    storeMainInfoModel: ReceivingOrderRailwayContainer,
}).views(() => ({
    get isRailway() {
        return true;
    },
}));

export interface IReceivingOrderContainer extends Instance<typeof ReceivingOrderContainer> {}
export interface IReceivingOrderRailwayContainer
    extends Instance<typeof ReceivingOrderRailwayContainer> {}
