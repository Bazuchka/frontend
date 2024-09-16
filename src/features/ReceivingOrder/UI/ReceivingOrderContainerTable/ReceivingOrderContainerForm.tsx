import { observer } from "mobx-react";
import { FC } from "react";
import { ContainerForm } from "src/features/Container";
import { containerStore, IContainer } from "src/features/Container/store";
import { IAlisFormComponentProps } from "src/features/common/AlisForm/AlisForm";
import receivingOrderStore from "../../store/ReceivingOrderStore";

export const ReceivingOrderContainerForm: FC<IAlisFormComponentProps> = observer(
    ({ onClose, onFormStateChange, componentProps, id }) => {
        return (
            <ContainerForm
                onClose={(submited, data) => {
                    onClose(submited);
                    if (submited) {
                        (data as IContainer)?.active && componentProps
                            ? componentProps?.setValue("container", data)
                            : componentProps?.setValue("container", null);
                    }
                }}
                onFormStateChange={onFormStateChange!}
                store={containerStore}
                fieldOptions={{
                    client: {
                        value: receivingOrderStore.current?.client as { id: string },
                    },
                    code: {
                        isUpdateDisabled: true,
                    },
                }}
                id={id}
            />
        );
    }
);
