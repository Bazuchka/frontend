import { observer } from "mobx-react";
import { JSX, useLayoutEffect } from "react";
import { useParams } from "react-router";
import { BaseTabs } from "src/shared/UI/BaseTabs";
import { ICard } from "src/shared/UI/iCard";
import { usePermissionService } from "src/shared/services/PermissionService";
import roleStore from "./store/RoleStore";
import { roleConfiguration } from "./tabsConfiguration";

const Role = observer((): JSX.Element => {
    const { id } = useParams();
    const { getAccessGrantedObjects } = usePermissionService();

    useLayoutEffect(() => {
        roleStore.setCurrent(id!);
        return () => {
            roleStore.setCurrent(null);
        };
    }, [id]);

    const configuration = { items: getAccessGrantedObjects(roleConfiguration().items) };
    return (
        <ICard cardSize={12} col={10}>
            <BaseTabs configuration={configuration} navigateUseSearchQuery />
        </ICard>
    );
});

export default Role;
