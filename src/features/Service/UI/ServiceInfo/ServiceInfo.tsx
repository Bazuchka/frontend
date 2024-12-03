import { observer } from "mobx-react";
import { FC, useMemo } from "react";
import { IFormComponent } from "src/shared/UI/iFormComponent";
import serviceStore from "../../store";
import { fieldsConfiguration } from "./configs";

interface ServiceInfoProps {}

const ServiceInfo: FC<ServiceInfoProps> = observer((): JSX.Element => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fields = useMemo(() => fieldsConfiguration(), [serviceStore.current]);

    return (
        <IFormComponent
            isWaitingStore={serviceStore.state.isLoading}
            fields={fields}
            isLoading={false}
            isEditMode={false}
        />
    );
});

export default ServiceInfo;
