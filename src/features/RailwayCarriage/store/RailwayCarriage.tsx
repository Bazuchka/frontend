import { Instance, types } from "mobx-state-tree";
import { ForeignKey } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { ViewMediator } from "src/shared/store";

export const RailwayCarriage = types.model("RailwayCarriage", {
    id: types.identifier,
    code: types.maybeNull(types.string),
    active: types.boolean,
    client: ForeignKey,
    type: ForeignKey,
    liftingCapacity: types.number,
});

const BaseStore = createBaseStoreWithViewMediator({
    storeName: "RailwayCarriage",
    storeListModel: RailwayCarriage,
    storeMainInfoModel: RailwayCarriage,
});

export const RailwayCarriageStore = types
    .compose(BaseStore, ViewMediator)
    .named("RailwayCarriageStore");

export interface IRailwayCarriage extends Instance<typeof RailwayCarriage> {}
