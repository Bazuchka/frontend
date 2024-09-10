import { observer } from "mobx-react";
import { FC } from "react";
import { ContainerForm } from "src/features/Container";
import { containerStore } from "src/features/Container/store";
import { IAlisFormComponentProps } from "src/features/common/AlisForm/AlisForm";
import receivingOrderStore from "../../store/ReceivingOrderStore";

export const ReceivingOrderContainerForm: FC<IAlisFormComponentProps> = observer(
    ({ onClose, onFormStateChange, componentProps }) => {
        return (
            <ContainerForm
                onClose={(submited, data) => {
                    onClose(submited);
                    data && componentProps && componentProps?.setValue("container", data);
                }}
                onFormStateChange={onFormStateChange!}
                store={containerStore}
                fieldOptions={{
                    client: {
                        value: receivingOrderStore.current?.client as { id: string },
                    },
                }}
            />
        );
    }
);
