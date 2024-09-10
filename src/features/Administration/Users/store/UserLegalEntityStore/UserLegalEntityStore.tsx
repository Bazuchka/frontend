import { Instance, types } from "mobx-state-tree";
import { ForeignKey } from "src/shared/entities";
import { createBaseStoreWithViewMediator } from "src/shared/entities/BaseStore";
import { ViewMediator } from "src/shared/store";

export const UserLegalEntity = types.model("UserLegalEntity", {
    id: types.identifier,
    legalEntity: types.maybe(ForeignKey),
});

const BaseStore = createBaseStoreWithViewMediator({
    storeName: "UserLegalEntity",
    storeListModel: UserLegalEntity,
    storeMainInfoModel: UserLegalEntity,
});

export const UserLegalEntityStore = types.compose(BaseStore, ViewMediator).named("UserLegalEntity");

export interface IUserLegalEntity extends Instance<typeof UserLegalEntity> {}
