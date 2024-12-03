import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { RemainsContainersItem } from "./models";
import { flow } from "mobx-state-tree";
import { getBaseActions } from "src/shared/request/baseActions";

const RemainsContainersStore = createBaseStoreWithViewMediator({
    storeName: "ContainerRemains",
    storeListModel: RemainsContainersItem,
    storeMainInfoModel: RemainsContainersItem,
}).actions(() => {
    const getContainerRemainsInfoXlsx = flow(function* () {
        return yield getBaseActions("ContainerRemains".toLowerCase()).downloadFile(
            {},
            `/report/containerremains/download`,
            "application/json"
        );
    });

    return {
        getContainerRemainsInfoXlsx,
    };
});

export const remainsContainersStore = RemainsContainersStore.create();
