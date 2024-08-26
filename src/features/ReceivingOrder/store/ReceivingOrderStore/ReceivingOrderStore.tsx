/* eslint-disable @typescript-eslint/no-unused-vars */
import { flow, Instance, types } from "mobx-state-tree";
import { ForeignKey, IsoDate, IsoUTCDate } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { ReceivingOrderCargoStore } from "../ReceivingOrderCargoStore";
import { ReceivingOrderGoodStore } from "../ReceivingOrderGood/ReceivingOrderGood";
import { ReceivingOrderRequestedServiceStore } from "../ReceivingOrderRequestedService";
import { ReceivingOrderTransportStore } from "../ReceivingOrderTransportStore";
import { ReceivingOrderPreview } from "./models/ReceivingOrderPreview";

export const ReceivingOrder = types.model("ReceivingOrder", {
    id: types.identifier,
    number: types.number,
    client: ForeignKey,
    legalEntity: ForeignKey,
    orderStatus: types.string,
    planReceivingDateTime: IsoUTCDate,
    terminalArea: types.string,
    transportType: types.string,
    createdAt: IsoDate,
    syncId: types.maybe(types.string),
});

export const FullReceivingOrder = types
    .compose(
        "FullReceivingOrder",
        ReceivingOrder,
        types.model({
            code: types.maybe(types.string),
            contract: types.maybe(ForeignKey), // TODO remove all maybe expressions
            contact: types.maybe(
                types.model({
                    name: types.string,
                    phone: types.string,
                    email: types.string,
                })
            ),
            comment: types.maybeNull(types.string),
            currency: types.maybe(ForeignKey),
            receivingOrderTransport: types.optional(ReceivingOrderTransportStore, () =>
                ReceivingOrderTransportStore.create({
                    state: {
                        isFetching: true, // set true as default state
                    },
                })
            ),
            receivingOrderRequestedService: types.optional(
                ReceivingOrderRequestedServiceStore,
                () =>
                    ReceivingOrderRequestedServiceStore.create({
                        state: {
                            isFetching: true, // set true as default state
                        },
                    })
            ),
            receivingOrderGood: types.optional(ReceivingOrderGoodStore, () =>
                ReceivingOrderGoodStore.create({
                    state: {
                        isFetching: true, // set true as default state
                    },
                })
            ),
            receivingOrderCargo: types.optional(ReceivingOrderCargoStore, () =>
                ReceivingOrderCargoStore.create({
                    state: {
                        isFetching: true, // set true as default state
                    },
                })
            ),
            storagePeriod: types.maybe(types.refinement(types.number, (value) => value >= 0)),
            receivingOrderPreview: types.optional(ReceivingOrderPreview, {}),
        })
    )
    .actions((self) => {
        const getTransport = flow(function* () {
            yield self.receivingOrderTransport.setCurrent(self.id, { preventDefaultAlert: true });
        });
        const getReceivingOrderRequestedService = flow(function* () {
            yield self.receivingOrderRequestedService.fetch({
                contractId: self.contract?.id,
                deleted: false,
            });
        });
        const getReceivingOrderGoods = flow(function* () {
            yield self.receivingOrderGood.fetch(
                {
                    active: true,
                    deleted: false,
                    receivingOrder: {
                        id: self?.id,
                    },
                },
                { preventDefaultAlert: true }
            );
        });
        const getReceivingOrderCargo = flow(function* () {
            yield self.receivingOrderCargo.fetch({
                receivingOrder: {
                    id: self?.id,
                },
                deleted: false,
            });
        });

        return {
            getTransport,
            getReceivingOrderRequestedService,
            getReceivingOrderGoods,
            getReceivingOrderCargo,
        };
    })
    .postProcessSnapshot((snapshot) => {
        const {
            receivingOrderTransport,
            receivingOrderRequestedService,
            receivingOrderGood,
            receivingOrderCargo,
            receivingOrderPreview,
            ...rest
        } = snapshot;
        return rest;
    });

const ReceivingOrderStore = createBaseStoreWithViewMediator({
    storeName: "ReceivingOrder",
    storeListModel: ReceivingOrder,
    storeMainInfoModel: FullReceivingOrder,
});

export default ReceivingOrderStore;

export interface IReceivingOrder extends Instance<typeof ReceivingOrder> {}
export interface IFullReceivingOrder extends Instance<typeof FullReceivingOrder> {}
export interface IReceivingOrderStore extends Instance<typeof ReceivingOrderStore> {}
