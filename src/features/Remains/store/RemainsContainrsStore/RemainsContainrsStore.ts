import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { RemainsContainersItem } from "./models";
import { flow } from "mobx-state-tree";
import { getBaseActions } from "src/shared/request/baseActions";

const RemainsContainersStore = createBaseStoreWithViewMediator({
    storeName: "ContainerRemains",
    storeListModel: RemainsContainersItem,
    storeMainInfoModel: RemainsContainersItem,
}).actions((self) => {
    const getContainerRemainsInfoXlsx = flow(function* () {
        return yield getBaseActions("ContainerRemains".toLowerCase()).downloadFile(
            {},
            `/report/containerremains/download`,
            "application/json"
        );
    });

    const beforeDownloadCallback = () => {
        self.state.isFetching = true;
    };
    const onErrorDownload = (error: unknown) => {
        self.state.isError = true;
        throw new Error(error as string);
    };
    const onFinallyDownload = () => {
        self.state.isFetching = false;
    };

    return {
        getContainerRemainsInfoXlsx,
        onErrorDownload,
        beforeDownloadCallback,
        onFinallyDownload,
    };
});

export const remainsContainersStore = RemainsContainersStore.create();
