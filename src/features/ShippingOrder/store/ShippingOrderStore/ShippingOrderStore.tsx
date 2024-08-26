import { flow, Instance, types } from "mobx-state-tree";
import { ForeignKey, IsoDate, IsoUTCDate } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { ShippingOrderCargoStore } from "../ShippingOrderCargoStore";
import { ShippingOrderGoodStore } from "../ShippingOrderGoodStore/ShippingOrderGoodStore";
import { ShippingOrderRequestedServiceStore } from "../ShippingOrderRequestedServiceStore";
import { ShippingOrderTransportStore } from "../ShippingOrderTransportStore";
import { ShippingOrderPreview } from "./models/ShippingOrderPreview";

export const ShippingOrder = types.model("ShippingOrder", {
    id: types.identifier,
    number: types.number,
    client: ForeignKey,
    legalEntity: ForeignKey,
    orderStatus: types.string,
    plannedShippingDateTime: IsoUTCDate,
    terminalArea: types.string,
    transportType: types.string,
    createdAt: IsoDate,
    syncId: types.maybe(types.string),
});

export const FullShippingOrder = types
    .compose(
        "FullShippingOrder",
        ShippingOrder,
        types.model({
            code: types.maybe(types.string),
            contract: types.maybe(ForeignKey),
            contact: types.maybe(
                types.model({
                    name: types.string,
                    phone: types.string,
                    email: types.string,
                })
            ),
            comment: types.maybeNull(types.string),
            currency: types.maybe(ForeignKey),
            shippingOrderTransport: types.optional(ShippingOrderTransportStore, () =>
                ShippingOrderTransportStore.create({
                    state: {
                        isFetching: true, // set true as default state
                    },
                })
            ),
            shippingOrderGood: types.optional(ShippingOrderGoodStore, () =>
                ShippingOrderGoodStore.create({
                    state: {
                        isFetching: true, // set true as default state
                    },
                })
            ),
            shippingOrderRequestedService: types.optional(ShippingOrderRequestedServiceStore, () =>
                ShippingOrderRequestedServiceStore.create({
                    state: {
                        isFetching: true, // set true as default state
                    },
                })
            ),
            shippingOrderCargo: types.optional(ShippingOrderCargoStore, () =>
                ShippingOrderCargoStore.create({
                    state: {
                        isFetching: true, // set true as default state
                    },
                })
            ),
            shippingOrderPreview: types.optional(ShippingOrderPreview, {}),
        })
    )
    .actions((self) => {
        const getTransport = flow(function* () {
            yield self.shippingOrderTransport.setCurrent(self.id, { preventDefaultAlert: true });
        });

        const getShippingOrderGoods = flow(function* () {
            yield self.shippingOrderGood.fetch(
                {
                    active: true,
                    deleted: false,
                    shippingOrder: {
                        id: self?.id,
                    },
                },
                { preventDefaultAlert: true }
            );
        });

        const getShippingOrderRequestedService = flow(function* () {
            yield self.shippingOrderRequestedService.fetch({
                contractId: self.contract?.id,
                deleted: false,
            });
        });

        const getShippingOrderCargo = flow(function* () {
            yield self.shippingOrderCargo.fetch({
                shippingOrder: {
                    id: self?.id,
                },
                deleted: false,
            });
        });

        return {
            getShippingOrderGoods,
            getTransport,
            getShippingOrderRequestedService,
            getShippingOrderCargo,
        };
    })
    .postProcessSnapshot((snapshot) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { shippingOrderTransport, shippingOrderGood, ...rest } = snapshot;
        return rest;
    });

const ShippingOrderStore = createBaseStoreWithViewMediator({
    storeName: "ShippingOrder",
    storeListModel: ShippingOrder,
    storeMainInfoModel: FullShippingOrder,
});

export default ShippingOrderStore;

export interface IShippingOrder extends Instance<typeof ShippingOrder> {}
export interface IFullShippingOrder extends Instance<typeof FullShippingOrder> {}
