import { observer } from "mobx-react";
import { JSX, useEffect } from "react";
import { useParams } from "react-router";
import { BaseTabs } from "src/shared/UI/BaseTabs";
import { ICard } from "src/shared/UI/iCard";
import { usePermissionService } from "src/shared/services/PermissionService";
import clientGoodStore from "./store/ClientGoodStore";
import { clientGoodConfiguration } from "./tabsConfiguration";

const ClientGood = observer((): JSX.Element => {
    const { id } = useParams();
    const { getAccessGrantedObjects } = usePermissionService();

    useEffect(() => {
        clientGoodStore.setCurrent(id!);

        return () => {
            clientGoodStore.setCurrent(null);
        };
    }, [id]);

    const configuration = { items: getAccessGrantedObjects(clientGoodConfiguration(!id).items) };
    return (
        <ICard cardSize={12} col={10}>
            <BaseTabs configuration={configuration} navigateUseSearchQuery />
        </ICard>
    );
});

export default ClientGood;
