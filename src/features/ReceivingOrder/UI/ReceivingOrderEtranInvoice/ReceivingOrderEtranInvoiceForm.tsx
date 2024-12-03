import { observer } from "mobx-react";
import { FC } from "react";
import { EtranInvoiceForm } from "src/features/EtranInvoice";
import { IAlisFormComponentProps } from "src/features/common/AlisForm/AlisForm";
import receivingOrderStore from "../../store/ReceivingOrderStore";

export const ReceivingOrderEtranInvoiceForm: FC<IAlisFormComponentProps> = observer(
    ({ onClose, onFormStateChange, componentProps, store }) => {
        return (
            <EtranInvoiceForm
                onClose={onClose}
                onFormStateChange={onFormStateChange!}
                handleCreated={(data) =>
                    componentProps && componentProps?.setValue("etranInvoice", data)
                }
                handleUpdated={(data) =>
                    componentProps && componentProps?.setValue("etranInvoice", data)
                }
                id={store?.current?.id}
                store={store}
                editForm={true}
                etranInvoiceProps={{
                    client: receivingOrderStore.current?.client as { id: string },
                }}
            />
        );
    }
);
