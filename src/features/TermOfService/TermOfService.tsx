import { observer } from "mobx-react";
import { JSX, useEffect } from "react";
import { useParams } from "react-router";
import { BaseTabs } from "src/shared/UI/BaseTabs";
import { ICard } from "src/shared/UI/iCard";
import { usePermissionService } from "src/shared/services/PermissionService";
import { termOfServiceStore } from "./store/TermOfServiceStore";
import { termOfServiceConfiguration } from "./tabsConfiguration";

const TermOfService = observer((): JSX.Element => {
    const { id } = useParams();
    const { getAccessGrantedObjects } = usePermissionService();

    useEffect(() => {
        termOfServiceStore.setCurrent(id);
        return () => {
            termOfServiceStore.setCurrent(null);
        };
    }, [id]);

    const configuration = { items: getAccessGrantedObjects(termOfServiceConfiguration(!id).items) };
    return (
        <ICard cardSize={12} col={10}>
            <BaseTabs configuration={configuration} navigateUseSearchQuery />
        </ICard>
    );
});

export default TermOfService;
