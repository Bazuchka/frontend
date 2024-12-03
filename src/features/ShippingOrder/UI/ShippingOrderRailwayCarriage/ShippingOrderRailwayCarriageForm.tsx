import { observer } from "mobx-react";
import { FC } from "react";
import { RailwayCarriageForm } from "src/features/RailwayCarriage";
import { IAlisFormComponentProps } from "src/features/common/AlisForm/AlisForm";
import shippingOrderStore from "../../store/ShippingOrderStore";

export const ShippingOrderRailwayCarriageForm: FC<IAlisFormComponentProps> = observer(
    ({ onClose, onFormStateChange, componentProps, store }) => {
        return (
            <RailwayCarriageForm
                onClose={onClose}
                onFormStateChange={onFormStateChange!}
                handleCreated={(data) =>
                    componentProps && componentProps?.setValue("railwayCarriage", data)
                }
                handleUpdated={(data) =>
                    componentProps && componentProps?.setValue("railwayCarriage", data)
                }
                id={store?.current?.id}
                store={store}
                editForm={true}
                props={{
                    client: shippingOrderStore.current?.client as { id: string },
                }}
            />
        );
    }
);
