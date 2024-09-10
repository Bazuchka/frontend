import { Instance, types } from "mobx-state-tree";
import { Container } from "src/features/Container/store/ContainerStore";
import { ForeignKey } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";

export const ShippingOrderContainer = types.model("ShippingOrderContainer", {
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

export const ShippingOrderRailwayContainer = types
    .compose(
        ShippingOrderContainer,
        types.model({
            railwayCarriage: types.maybeNull(ForeignKey),
        })
    )
    .named("ShippingOrderRailwayContainer");

export const ShippingOrderContainerStore = createBaseStoreWithViewMediator({
    storeName: "ShippingOrderContainer",
    storeListModel: ShippingOrderContainer,
    storeMainInfoModel: ShippingOrderContainer,
});

export const ShippingOrderRailwayContainerStore = createBaseStoreWithViewMediator({
    storeName: "ShippingOrderContainer",
    storeListModel: ShippingOrderRailwayContainer,
    storeMainInfoModel: ShippingOrderRailwayContainer,
}).views(() => ({
    get isRailway() {
        return true;
    },
}));

export interface IShippingOrderContainer extends Instance<typeof ShippingOrderContainer> {}

export interface IShippingOrderRailwayContainer
    extends Instance<typeof ShippingOrderRailwayContainer> {}
