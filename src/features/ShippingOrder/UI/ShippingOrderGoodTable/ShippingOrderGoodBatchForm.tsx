import { observer } from "mobx-react";
import { FC } from "react";
import { BatchForm } from "src/features/Batch";
import batchStore from "src/features/Batch/store";
import { IAlisFormComponentProps } from "src/features/common/AlisForm/AlisForm";
import shippingOrderStore from "../../store/ShippingOrderStore";

export const ShippingOrderGoodBatchForm: FC<IAlisFormComponentProps> = observer(
    ({ onClose, onFormStateChange, componentProps, id }) => {
        return (
            <BatchForm
                onClose={(submited, data) => {
                    onClose(submited);
                    data && componentProps && componentProps?.setValue("batch", data);
                }}
                onFormStateChange={onFormStateChange!}
                store={batchStore}
                clientGoodProps={{
                    client: shippingOrderStore.current?.client as { id: string },
                    clientGood:
                        componentProps &&
                        (componentProps?.getValue("clientGood") as { id: string } | undefined),
                    batchAccountingType:
                        componentProps &&
                        (componentProps?.getValue("clientGood")?.batchAccountingType as string),
                }}
                id={id}
            />
        );
    }
);
