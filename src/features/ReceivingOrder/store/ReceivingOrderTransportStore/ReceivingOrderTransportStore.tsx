import { getParent, Instance, types } from "mobx-state-tree";
import ClientDriverStore from "src/features/ClientDriverTable/store/ClientDriverStore";
import ClientVehicleStore from "src/features/ClientVehicle/store/ClientVehicleStore";
import { ForeignKey } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { IReceivingOrder } from "../ReceivingOrderStore/ReceivingOrderStore";

export const ReceivingOrderTransport = types.model("ReceivingOrderTransport", {
    id: types.identifier,
});

export const FullReceivingOrderTransport = types.compose(
    "FullReceivingOrderTransport",
    ReceivingOrderTransport,
    types.model({
        receivingOrder: types.maybe(ForeignKey), // remove maybe
        shipper: types.model({
            id: types.identifier,
            code: types.string,
            inn: types.string,
        }),
        waybill: types.maybe(types.string), // remove maybe
        carrier: ForeignKey,
        vehicleInfo: types.model({
            id: types.identifier,
            code: types.string,
            withTrailer: types.maybe(types.boolean),
            trailerNumber: types.maybeNull(types.string),
            insuranceNumber: types.maybeNull(types.string),
        }),
        driverInfo: types.model({
            id: types.identifier,
            code: types.string,
            phoneNumber: types.maybeNull(types.string),
            POANumber: types.maybeNull(types.string),
        }),
    })
);

const ReceivingOrderTransportStore = types
    .compose(
        createBaseStoreWithViewMediator({
            storeName: "ReceivingOrderTransport",
            storeListModel: ReceivingOrderTransport,
            storeMainInfoModel: FullReceivingOrderTransport,
        }),
        types.model({
            cardDriver: types.optional(ClientDriverStore, () => ClientDriverStore.create()),
            cardVehicle: types.optional(ClientVehicleStore, () => ClientVehicleStore.create()),
        })
    )
    .views((self) => ({
        get parentId() {
            return (getParent(self) as IReceivingOrder).id;
        },
    }));

export default ReceivingOrderTransportStore;

export interface IReceivingOrderTransport extends Instance<typeof ReceivingOrderTransport> {}
export interface IFullReceivingOrderTransport
    extends Instance<typeof FullReceivingOrderTransport> {}
