import { flow, Instance, types } from "mobx-state-tree";
import { ForeignKey } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { getBaseActions } from "src/shared/request/baseActions";
import { GoodPackageBarcodeStore } from "../GoodPackageBarcodeStore";
import { GoodPackageStore } from "../GoodPackageStore";
import { GoodVariantStore } from "../GoodVariantStore";
import { ClientGoodType } from "src/features/ClientGoodTypeTable/store/ClientGoodTypeStore";
import { ChosenSelectObject } from "src/shared/UI/SelectOfDictionaryForm/SelectOfDictionaryForm";

export type ClientGoodUploadResult = {
    errors: string[];
};

export const ClientGood = types.model("ClientGood", {
    id: types.identifier,
    code: types.string,
    client: ForeignKey,
    item: types.maybeNull(types.string),
    unitOfMeasure: types.maybeNull(ForeignKey),
    goodType: ForeignKey,
    clientGoodType: types.union(ClientGoodType, ForeignKey),
    dangerClass: types.maybeNull(ForeignKey),
    active: types.boolean,
});

export const FullClientGood = types.compose(
    "FullClientGood",
    ClientGood,
    types
        .model({
            gtin: types.maybeNull(types.string),
            batchAccountingType: types.string,
            serialAccountingType: types.string,
            shelfLife: types.maybeNull(types.number),
            price: types.maybeNull(types.number),
            description: types.maybeNull(types.string),
            name: types.maybeNull(types.string),
            tempRegime: types.maybeNull(ForeignKey),
            syncId: types.string,
            packages: types.optional(GoodPackageStore, {
                state: {},
                data: [],
            }),
            barcodes: types.optional(GoodPackageBarcodeStore, {
                state: {},
                data: [],
            }),
            variants: types.optional(GoodVariantStore, {
                state: {},
                data: [],
            }),
        })
        .postProcessSnapshot((snapshot) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { packages, barcodes, ...rest } = snapshot;
            return rest; // no need to pass packages and barcodes as DTO
        })
);

const ClientGoodStore = createBaseStoreWithViewMediator({
    storeName: "ClientGood",
    storeListModel: ClientGood,
    storeMainInfoModel: FullClientGood,
}).actions((self) => {
    const uploadFile = flow(function* (file: File, clientId: string) {
        try {
            self.state.isCreating = true;
            const response = yield getBaseActions("ClientGood".toLowerCase()).uploadFile(
                {
                    filename: file.name,
                    clientId: clientId,
                    content: file,
                },
                "parsefile"
            );

            return response.data as ClientGoodUploadResult;
        } catch (err) {
            self.state.isError = true;
            throw new Error(err as string);
        } finally {
            self.state.isCreating = false;
        }
    });

    const init = function (
        client: ChosenSelectObject,
        goodType: ChosenSelectObject,
        clientGoodType: ChosenSelectObject
    ) {
        try {
            self.current = FullClientGood.create({
                id: "",
                code: "",
                client: { id: client.id, code: client.code! },
                goodType: { id: goodType.id, code: goodType.code! },
                clientGoodType: { id: clientGoodType.id, code: clientGoodType.code! },
                batchAccountingType: "",
                serialAccountingType: "",
                syncId: "",
                active: false,
            });
        } catch (err) {
            self.state.isError = true;
            throw new Error(err as string);
        } finally {
            self.state.isCreating = false;
        }
    };

    return { uploadFile, init };
});

export default ClientGoodStore;

export interface IClientGood extends Instance<typeof ClientGood> {}
