/* eslint-disable @typescript-eslint/no-unused-vars */
import { flow, Instance, types } from "mobx-state-tree";
import { ForeignKey, IsoDate, IsoUTCDate } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { getBaseActions } from "src/shared/request/baseActions";
import { ReceivingOrderCargoStore } from "../ReceivingOrderCargoStore";
import { ReceivingOrderContainerItemStore } from "../ReceivingOrderContainerItemStore";
import {
    ReceivingOrderContainerStore,
    ReceivingOrderRailwayContainerStore,
} from "../ReceivingOrderContainerStore/ReceivingOrderContainerStore";
import { ReceivingOrderEtranInvoiceStore } from "../ReceivingOrderEtranInvoiceStore/ReceivingOrderEtranInvoiceStore";
import { ReceivingOrderGoodStore } from "../ReceivingOrderGood/ReceivingOrderGood";
import { ReceivingOrderRailwayCarriageStore } from "../ReceivingOrderRailwayCarriageStore/ReceivingOrderRailwayCarriageStore";
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
            contract: types.model({
                id: types.string,
                code: types.string,
                contractNumber: types.maybeNull(types.string),
                contractType: types.maybeNull(types.string),
                contractDate: types.maybeNull(types.string),
            }),
            contact: types.maybeNull(
                types.model({
                    name: types.maybeNull(types.string),
                    phone: types.maybeNull(types.string),
                    email: types.maybeNull(types.string),
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
            receivingOrderContainer: types.optional(ReceivingOrderContainerStore, () =>
                ReceivingOrderContainerStore.create()
            ),
            receivingOrderRailwayContainer: types.optional(
                ReceivingOrderRailwayContainerStore,
                () => ReceivingOrderRailwayContainerStore.create()
            ),
            receivingOrderContainerItem: types.optional(ReceivingOrderContainerItemStore, () =>
                ReceivingOrderContainerItemStore.create()
            ),
            receivingOrderEtranInvoice: types.optional(ReceivingOrderEtranInvoiceStore, () =>
                ReceivingOrderEtranInvoiceStore.create({
                    state: {
                        isFetching: true, // set true as default state
                    },
                })
            ),
            receivingOrderRailwayCarriage: types.optional(ReceivingOrderRailwayCarriageStore, () =>
                ReceivingOrderRailwayCarriageStore.create({
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
}).actions((self) => {
    const getReceivingOrderMx1Print = flow(function* () {
        return yield getBaseActions("ReceivingOrder".toLowerCase()).downloadFile(
            {},
            `/report/receivingorder/mx1/${self.current?.id}/download`,
            "application/json"
        );
    });

    const onSuccesLoadBlobData = (url: string) => {
        window.open(url)!.print();
    };

    const getAdditionalBlobData = () => ({ type: "application/pdf" });

    return {
        getReceivingOrderMx1Print,
        onSuccesLoadBlobData,
        getAdditionalBlobData,
    };
});

export default ReceivingOrderStore;

export interface IReceivingOrder extends Instance<typeof ReceivingOrder> {}
export interface IFullReceivingOrder extends Instance<typeof FullReceivingOrder> {}
export interface IReceivingOrderStore extends Instance<typeof ReceivingOrderStore> {}
