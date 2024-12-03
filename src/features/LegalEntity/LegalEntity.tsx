import { observer } from "mobx-react";
import { JSX, useLayoutEffect } from "react";
import { useParams } from "react-router";
import { BaseTabs } from "src/shared/UI/BaseTabs";
import { ICard } from "src/shared/UI/iCard";
import { usePermissionService } from "src/shared/services/PermissionService";
import legalEntityStore from "./store/LegalEntityStore";
import { legalEntityConfiguration } from "./tabsConfiguration";

const LegalEntity = observer((): JSX.Element => {
    const { id } = useParams();
    const { getAccessGrantedObjects } = usePermissionService();

    useLayoutEffect(() => {
        legalEntityStore.setCurrent(id!);
    }, [id]);

    const configuration = { items: getAccessGrantedObjects(legalEntityConfiguration().items) };
    return (
        <ICard cardSize={12} col={10}>
            <BaseTabs configuration={configuration} />
        </ICard>
    );
});

export default LegalEntity;
