import { t } from "i18next";
import { flow, getParent, getRoot, Instance, types } from "mobx-state-tree";
import { viewStore } from "src/app/store";
import { ForeignKey, IsoDate, IsoUTCDate } from "src/shared/entities";
import { IBaseStore } from "src/shared/entities/BaseStore";
import { getBaseActions } from "src/shared/request/baseActions";
import {
    IShippingOrderContainer,
    IShippingOrderRailwayContainer,
} from "../../ShippingOrderContainerStore/ShippingOrderContainerStore";

export const ShippingOrderPreview = types
    .model("ShippingOrderPreview", {
        model: types.maybe(
            types.model({
                id: types.identifier,
                number: types.number,
                client: ForeignKey,
                legalEntity: ForeignKey,
                orderStatus: types.string,
                plannedShippingDateTime: IsoUTCDate,
                terminalArea: types.string,
                transportType: types.string,
                createdAt: IsoDate,
                contract: types.model({
                    id: types.string,
                    code: types.string,
                    contractType: types.maybeNull(types.string),
                    contractDate: types.maybeNull(types.string),
                }),
                currency: ForeignKey,
                contact: types.maybeNull(
                    types.model({
                        name: types.maybeNull(types.string),
                        phone: types.maybeNull(types.string),
                        email: types.maybeNull(types.string),
                    })
                ),
                comment: types.maybeNull(types.string),
                totalSKUQuantity: types.maybeNull(types.number),
                totalContainerQuantity: types.maybeNull(types.number),
                totalWeight: types.maybeNull(types.number),
                totalCargoQuantity: types.maybeNull(types.number),
                totalPalletQuantity: types.maybeNull(types.number),
                totalNotPalletQuantity: types.maybeNull(types.number),
                totalGoodsPrice: types.maybeNull(types.number),
                totalRequestedServiceQuantity: types.maybeNull(types.number),
                totalRequestedServicePrice: types.maybeNull(types.number),
            })
        ),
    })
    .actions((self) => {
        const getPreview = flow(function* () {
            const previewData = yield getBaseActions(
                (getRoot(self) as unknown as IBaseStore).url
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ).getById((getParent(self) as any).id, { urlPostfix: "preview" });

            try {
                self.model = previewData.data;
            } catch (err) {
                console.error(err);
            }
        });

        const sendDraft = flow(function* () {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { current, update, setCurrent } = getRoot<any>(self);

            const hasVehicleTransport = (): boolean => {
                const transportInfo = current.shippingOrderTransport.current;

                const hasConsignee =
                    !!transportInfo?.consignee?.id && !!transportInfo?.consigneeAddress?.length;
                const hasCarrier = !!transportInfo?.carrier?.id;
                const hasVehicle = !!transportInfo?.vehicleInfo?.id;
                const hasDriver = !!transportInfo?.driverInfo?.id;

                return Boolean(hasConsignee && hasCarrier && hasVehicle && hasDriver);
            };

            // проверка TOSS заявок (авто)
            const isValidTossVehicleOrder = (): boolean => {
                const hasContainer = Boolean(current.shippingOrderContainer.data.length);
                const hasGoods = () => {
                    const isEveryEmptyContainers = current.shippingOrderContainer.data.every(
                        (item: IShippingOrderContainer) => item.empty
                    );

                    if (isEveryEmptyContainers) {
                        return true;
                    }

                    return !!current.shippingOrderContainerItem.data.length;
                };

                return Boolean(hasVehicleTransport() && hasContainer && hasGoods());
            };

            // проверка TOSS заявок (жд)
            const isValidTossRailwayOrder = (): boolean => {
                const hasETRAN = !!current.shippingOrderEtranInvoice.data.length;
                const hasReilwayCarriage = !!current.shippingOrderRailwayCarriage.data.length;
                const hasContainer = !!current.shippingOrderRailwayContainer.data.length;
                const hasGood = () => {
                    const isEveryEmptyContainers = current.shippingOrderRailwayContainer.data.every(
                        (item: IShippingOrderRailwayContainer) => item.empty
                    );

                    if (isEveryEmptyContainers) {
                        return true;
                    }

                    return !!current.shippingOrderContainerItem.data.length;
                };

                return Boolean(hasETRAN && hasReilwayCarriage && hasContainer && hasGood());
            };

            const isValidTossOrder =
                current.transportType === "VEHICLE"
                    ? isValidTossVehicleOrder()
                    : isValidTossRailwayOrder();

            // проверка WMS заявок
            const isValidWmsOrder = (): boolean => {
                const hasGoods = !!current.shippingOrderGood.data.length;
                const hasCargo = !!current.shippingOrderCargo.data.length;

                return Boolean(hasVehicleTransport() && hasGoods && hasCargo);
            };

            const isValidOrder =
                current.terminalArea === "WAREHOUSE" ? isValidWmsOrder() : isValidTossOrder;

            if (!isValidOrder) {
                viewStore.addAlert({
                    alertMode: "warning",
                    message: t("ShippingOrderPreview:error.send"),
                });
                return;
            }

            yield update(
                { ...current!, orderStatus: "ACCEPTED" },
                { customEndpoint: current.id + "/accept" }
            );
            yield setCurrent(current.id);
        });

        return {
            getPreview,
            sendDraft,
        };
    });

export interface IShippingOrderPreview extends Instance<typeof ShippingOrderPreview> {}
