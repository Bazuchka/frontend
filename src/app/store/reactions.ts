import { reaction } from "mobx";
import clientStore from "src/features/Client/store";
import clientDriverStore from "src/features/ClientDriverTable/store";
import clientGoodStore from "src/features/ClientGood/store/ClientGoodStore";
import clientGoodTypeStore from "src/features/ClientGoodTypeTable/store";
import clientRelatedEntityStore from "src/features/ClientRelatedEntityTable/store";
import clientVehicleStore from "src/features/ClientVehicle/store";
import legalEntityStore from "src/features/LegalEntity/store/LegalEntityStore";
import receivingOrderStore from "src/features/ReceivingOrder/store/ReceivingOrderStore";
import serviceStore from "src/features/Service/store";
import shippingOrderStore from "src/features/ShippingOrder/store/ShippingOrderStore";
import { termOfServiceStore } from "src/features/TermOfService/store/TermOfServiceStore";
import { IBaseStore } from "src/shared/entities/BaseStore";
import { IViewMediator } from "src/shared/store/ViewMediator";

const stores = [
    clientStore,
    legalEntityStore,
    clientGoodStore,
    clientRelatedEntityStore,
    serviceStore,
    clientGoodTypeStore,
    clientVehicleStore,
    clientDriverStore,
    receivingOrderStore,
    shippingOrderStore,
    termOfServiceStore,
];

export const addGlobalFilterReactions = () => {
    stores.forEach((store) => {
        refetchOnGlobalFiltersChange(store as unknown as IViewMediator);
    });
};

const refetchOnGlobalFiltersChange = (store: IViewMediator) => {
    reaction(
        () => store.globalFilters,
        () => {
            (store as unknown as IBaseStore).fetch();
        }
    );
};
