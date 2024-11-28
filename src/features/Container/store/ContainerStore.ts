import { flow, Instance, types } from "mobx-state-tree";
import { ContainerMovementStore } from "src/features/ContainerMovement";
import { ForeignKey } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { getBaseActions } from "src/shared/request/baseActions";

export const Container = types.model("Container", {
    id: types.identifier,
    code: types.maybe(types.string),
    syncId: types.maybe(types.string),
    containerType: types.string,
    weight: types.number,
    refrigerator: types.boolean,
    active: types.boolean,
    client: ForeignKey,
});

export const FullDataContainer = types.compose(
    "FullDataContainer",
    Container,
    types.model({
        movements: types.optional(ContainerMovementStore, {
            state: {},
            data: [],
        }),
    })
);

export const ContainerStore = createBaseStoreWithViewMediator({
    storeName: "Container",
    storeListModel: Container,
    storeMainInfoModel: FullDataContainer,
}).actions((self) => {
    const getContainerInfoXlsx = flow(function* () {
        return yield getBaseActions("Container".toLowerCase()).downloadFile(
            {},
            `/report/containermovement/${self.current?.id}/download`,
            "application/json"
        );
    });

    const beforeDownloadCallback = () => {
        self.state.isDownloading = true;
    };
    const onErrorDownload = (error: unknown) => {
        self.state.isError = true;
        throw new Error(error as string);
    };
    const onFinallyDownload = () => {
        self.state.isDownloading = false;
    };

    return {
        getContainerInfoXlsx,
        onErrorDownload,
        beforeDownloadCallback,
        onFinallyDownload,
    };
});

export interface IContainer extends Instance<typeof Container> {}
