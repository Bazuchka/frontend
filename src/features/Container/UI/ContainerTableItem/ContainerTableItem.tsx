import { observer } from "mobx-react";
import { useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { usePermissionService } from "src/shared/services/PermissionService";
import { BaseTabs } from "src/shared/UI/BaseTabs";
import { ICard } from "src/shared/UI/iCard";
import { containerStore } from "../../store";
import { containersTableItemConfiguration } from "./tabsConfiguration";

const ContainerTableItem = observer((): JSX.Element => {
    const { id } = useParams();
    const { getAccessGrantedObjects } = usePermissionService();

    useLayoutEffect(() => {
        containerStore.setCurrent(id);

        return () => {
            containerStore.setCurrent(null);
        };
    }, [id]);

    const configuration = {
        items: getAccessGrantedObjects(containersTableItemConfiguration(id as string).items),
    };
    return (
        <ICard cardSize={12} col={10}>
            <BaseTabs configuration={configuration} />
        </ICard>
    );
});

export default ContainerTableItem;
