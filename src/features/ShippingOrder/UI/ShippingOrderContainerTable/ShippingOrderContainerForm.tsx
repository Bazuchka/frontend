import { observer } from "mobx-react";
import { FC } from "react";
import { ContainerForm } from "src/features/Container";
import { containerStore, IContainer } from "src/features/Container/store";
import { IAlisFormComponentProps } from "src/features/common/AlisForm/AlisForm";
import shippingOrderStore from "../../store/ShippingOrderStore";

export const ShippingOrderContainerForm: FC<IAlisFormComponentProps> = observer(
    ({ onClose, onFormStateChange, componentProps, id }) => {
        return (
            <ContainerForm
                onClose={(submited, data?: unknown) => {
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
                        value: shippingOrderStore.current?.client as { id: string },
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
