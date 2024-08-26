import { observer } from "mobx-react";
import { JSX, useLayoutEffect } from "react";
import { useParams } from "react-router";
import { BaseTabs } from "src/shared/UI/BaseTabs";
import { ICard } from "src/shared/UI/iCard";
import { usePermissionService } from "src/shared/services/PermissionService";
import clientStore from "./store";
import { clientsConfiguration } from "./tabsConfiguration";

const Client = observer((): JSX.Element => {
    const { id } = useParams();
    const { getAccessGrantedObjects } = usePermissionService();

    useLayoutEffect(() => {
        clientStore.setCurrent(id);
    }, [id]);

    const configuration = { items: getAccessGrantedObjects(clientsConfiguration().items) };
    return (
        <ICard cardSize={12} col={10}>
            <BaseTabs configuration={configuration} />
        </ICard>
    );
});

export default Client;
