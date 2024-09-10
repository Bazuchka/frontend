import { flow, types } from "mobx-state-tree";
import { getBaseActions } from "../request/baseActions";

const buildStore = (params: Record<string, string>) => {
    const keys = Object.keys(params);
    const model = Object.assign({}, ...keys.map((key) => ({ [key]: types.array(types.string) })));
    return types
        .model("DictionaryStore", { ...model, isReady: false, isError: false })
        .actions((self) => {
            const fetch = flow(function* () {
                try {
                    const response = yield Promise.all(
                        keys.map((key) => {
                            return getBaseActions(params[key]).fetch({});
                        })
                    );
                    for (let index = 0; index < response.length; index++) {
                        const element = response[index];
                        self[keys[index]] = element.data;
                    }
                    self.isReady = true;
                } catch (err: unknown) {
                    self.isError = true;
                }
            });
            return {
                fetch,
            };
        });
};

const DictionaryStore = buildStore({
    batchAccountingType: "batchaccountingtype/all",
    serialAccountingType: "serialaccountingtype/all",
    identityDocumentType: "identitydocumenttype/all",
    terminalArea: "terminalarea/all",
    clientOrderType: "clientordertype/all",
    orderStatus: "orderstatus/all",
    transportType: "transporttype/all",
    calculationMethod: "calculationmethod/all",
    processingType: "processingtype/all",
    containerType: "containertype/all",
    userType: "/user/type/all",
});

const dictionaryStore = DictionaryStore.create();

export default dictionaryStore;
