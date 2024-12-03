import { observer } from "mobx-react";
import { JSX, useLayoutEffect } from "react";
import { useParams } from "react-router";
import { BaseTabs } from "src/shared/UI/BaseTabs";
import { ICard } from "src/shared/UI/iCard";
import { usePermissionService } from "src/shared/services/PermissionService";
import receivingOrderStore from "./store/ReceivingOrderStore";
import { receivingOrderConfiguration } from "./tabsConfiguration";

const ReceivingOrder = observer((): JSX.Element => {
    const { id } = useParams();
    const { getAccessGrantedObjects } = usePermissionService();

    useLayoutEffect(() => {
        receivingOrderStore.setCurrent(id);

        return () => {
            receivingOrderStore.setCurrent(null);
        };
    }, [id]);

    const configuration = {
        items: getAccessGrantedObjects(receivingOrderConfiguration(!id).items),
    };
    return (
        <ICard cardSize={12} col={10}>
            <BaseTabs configuration={configuration} navigateUseSearchQuery={true} />
        </ICard>
    );
});

export default ReceivingOrder;
