import { observer } from "mobx-react";
import { JSX, useEffect } from "react";
import { useParams } from "react-router";
import { BaseTabs } from "src/shared/UI/BaseTabs";
import { ICard } from "src/shared/UI/iCard";
import { usePermissionService } from "src/shared/services/PermissionService";
import userStore from "src/features/Administration/Users/store/UserStore";
import { userConfiguration } from "./tabsConfiguration";

const User = observer((): JSX.Element => {
    const { id } = useParams();
    const { getAccessGrantedObjects } = usePermissionService();

    useEffect(() => {
        userStore.setCurrent(id!);

        return () => {
            userStore.setCurrent(null);
        };
    }, [id]);

    const configuration = { items: getAccessGrantedObjects(userConfiguration(!id).items) };
    return (
        <ICard cardSize={12} col={10}>
            <BaseTabs configuration={configuration} navigateUseSearchQuery />
        </ICard>
    );
});

export default User;
