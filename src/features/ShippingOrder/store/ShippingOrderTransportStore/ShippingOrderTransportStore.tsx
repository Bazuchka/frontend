import { getParent, Instance, types } from "mobx-state-tree";
import ClientDriverStore from "src/features/ClientDriverTable/store/ClientDriverStore";
import ClientVehicleStore from "src/features/ClientVehicle/store/ClientVehicleStore";
import { ForeignKey } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { IShippingOrder } from "../ShippingOrderStore/ShippingOrderStore";

export const ShippingOrderTransport = types.model("ShippingOrderTransport", {
    id: types.identifier,
});

export const FullShippingOrderTransport = types.compose(
    "FullShippingOrderTransport",
    ShippingOrderTransport,
    types.model({
        shippingOrder: types.maybe(ForeignKey), // remove maybe
        consignee: types.model({
            id: types.identifier,
            code: types.string,
            inn: types.string,
            kpp: types.maybeNull(types.string),
        }),
        consigneeAddress: types.string,
        carrier: ForeignKey,
        withTrailer: types.maybeNull(types.boolean),
        vehicleInfo: types.model({
            id: types.identifier,
            code: types.string,
            trailerNumber: types.maybeNull(types.string),
            insuranceNumber: types.maybeNull(types.string),
            withTrailer: types.boolean,
        }),
        driverInfo: types.model({
            id: types.identifier,
            code: types.string,
            phoneNumber: types.maybeNull(types.string),
            POANumber: types.maybeNull(types.string),
        }),
    })
);

const ShippingOrderTransportStore = types
    .compose(
        createBaseStoreWithViewMediator({
            storeName: "ShippingOrderTransport",
            storeListModel: ShippingOrderTransport,
            storeMainInfoModel: FullShippingOrderTransport,
        }),
        types.model({
            cardDriver: types.optional(ClientDriverStore, () => ClientDriverStore.create()),
            cardVehicle: types.optional(ClientVehicleStore, () => ClientVehicleStore.create()),
        })
    )
    .views((self) => ({
        get parentId() {
            return (getParent(self) as IShippingOrder).id;
        },
    }));

export default ShippingOrderTransportStore;

export interface IShippingOrderTransport extends Instance<typeof ShippingOrderTransport> {}
export interface IFullShippingOrderTransport extends Instance<typeof FullShippingOrderTransport> {}
