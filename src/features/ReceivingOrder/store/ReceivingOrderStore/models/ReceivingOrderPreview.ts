import { flow, getParent, getRoot, Instance, types } from "mobx-state-tree";
import { ForeignKey, IsoDate, IsoUTCDate } from "src/shared/entities";
import { IBaseStore } from "src/shared/entities/BaseStore";
import { getBaseActions } from "src/shared/request/baseActions";

export const ReceivingOrderPreview = types
    .model("ReceivingOrderPreview", {
        model: types.maybe(
            types.model({
                id: types.identifier,
                number: types.number,
                client: ForeignKey,
                legalEntity: ForeignKey,
                orderStatus: types.string,
                planReceivingDateTime: IsoUTCDate,
                terminalArea: types.string,
                transportType: types.string,
                createdAt: IsoDate,
                contract: ForeignKey,
                currency: ForeignKey,
                contact: types.maybeNull(
                    types.model({
                        name: types.maybeNull(types.string),
                        phone: types.maybeNull(types.string),
                        email: types.maybeNull(types.string),
                    })
                ),
                comment: types.maybeNull(types.string),
                totalContainerQuantity: types.maybeNull(types.number),
                railwayCarriageQuantity: types.maybeNull(types.number),
                totalSKUQuantity: types.maybeNull(types.number),
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
            yield update({ ...current!, orderStatus: "ACCEPTED" });
            yield setCurrent(current.id);
        });

        return {
            getPreview,
            sendDraft,
        };
    });

export interface IReceivingOrderPreview extends Instance<typeof ReceivingOrderPreview> {}
