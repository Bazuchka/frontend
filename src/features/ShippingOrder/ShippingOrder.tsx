import { observer } from "mobx-react";
import { JSX, useLayoutEffect } from "react";
import { useParams } from "react-router";
import { BaseTabs } from "src/shared/UI/BaseTabs";
import { ICard } from "src/shared/UI/iCard";
import { usePermissionService } from "src/shared/services/PermissionService";
import shippingOrderStore from "./store/ShippingOrderStore";
import { shippingOrderConfiguration } from "./tabsConfiguration";

const ShippingOrder = observer((): JSX.Element => {
    const { id } = useParams();
    const { getAccessGrantedObjects } = usePermissionService();

    useLayoutEffect(() => {
        shippingOrderStore.setCurrent(id);

        return () => {
            shippingOrderStore.setCurrent(null);
        };
    }, [id]);

    const configuration = {
        items: getAccessGrantedObjects(shippingOrderConfiguration(!id).items),
    };
    return (
        <ICard cardSize={12} col={10}>
            <BaseTabs configuration={configuration} navigateUseSearchQuery={true} />
        </ICard>
    );
});

export default ShippingOrder;
