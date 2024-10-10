import { Instance, types } from "mobx-state-tree";
import { IDimensions } from "src/features/common/DimensionsLink/DimensionsLink";
import { ForeignKey } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";

export const ShippingOrderCargo = types
    .model("ShippingOrderCargo", {
        id: types.identifier,
        code: types.maybe(types.string),
        syncId: types.maybe(types.string),
        shippingOrderGood: types.model("ShippingOrderGood", {
            id: types.string,
            code: types.string,
            batch: types.maybeNull(ForeignKey),
        }),
        barcode: types.maybeNull(ForeignKey),
        clientGood: types.maybeNull(ForeignKey),
        goodPackage: ForeignKey,
        packageQuantity: types.refinement(types.number, (value) => value >= 0),
        conversionQuantity: types.refinement(types.number, (value) => value >= 0),
        totalQuantity: types.refinement(types.number, (value) => value >= 0),
        length: types.maybeNull(types.refinement(types.number, (value) => value >= 0)),
        width: types.maybeNull(types.refinement(types.number, (value) => value >= 0)),
        height: types.maybeNull(types.refinement(types.number, (value) => value >= 0)),
        volume: types.maybeNull(types.refinement(types.number, (value) => value >= 0)),
        weight: types.maybeNull(types.refinement(types.number, (value) => value >= 0)),
        dimensions: types.frozen<IDimensions>(),
    })
    .preProcessSnapshot((snapshot) => {
        return {
            ...snapshot,
            dimensions: {
                length: snapshot?.length ?? 0,
                width: snapshot?.width ?? 0,
                height: snapshot?.height ?? 0,
                volume: snapshot?.volume ?? 0,
                weight: snapshot?.weight ?? 0,
            },
        };
    })
    .postProcessSnapshot((snapshot) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { dimensions, ...rest } = snapshot;
        return rest;
    });

export const ShippingOrderCargoStore = createBaseStoreWithViewMediator({
    storeName: "ShippingOrderCargo",
    storeListModel: ShippingOrderCargo,
    storeMainInfoModel: ShippingOrderCargo,
});

export interface IShippingOrderCargo extends Instance<typeof ShippingOrderCargo> {}
