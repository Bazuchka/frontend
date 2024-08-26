import { SvgIcon } from "@mui/material";
import { t } from "i18next";
import { observer } from "mobx-react";
import { FC } from "react";
import { PlusIcon } from "src/assets/svg";
import { BatchForm } from "src/features/Batch";
import batchStore from "src/features/Batch/store";
import receivingOrderStore from "src/features/ReceivingOrder/store/ReceivingOrderStore";
import {
    IAlisFormActionComponentProps,
    IAlisFormComponentProps,
} from "src/features/common/AlisForm/AlisForm";

export const ReceivingOrderGoodBatchForm: FC<IAlisFormComponentProps> = observer(
    ({ onClose, onFormStateChange, componentProps }) => {
        return (
            <BatchForm
                onClose={onClose}
                onFormStateChange={onFormStateChange!}
                handleCreated={(data) => componentProps && componentProps?.setValue("batch", data)}
                store={batchStore}
                clientGoodProps={{
                    client: receivingOrderStore.current?.client as { id: string },
                    clientGood:
                        componentProps &&
                        (componentProps?.getValue("clientGood") as { id: string } | undefined),
                    batchAccountingType:
                        componentProps &&
                        (componentProps?.getValue("clientGood")?.batchAccountingType as string),
                    goodVariant:
                        componentProps &&
                        (componentProps?.getValue("goodVariant") as { id: string } | undefined),
                }}
            />
        );
    }
);

export const CreateBatchButton: FC<IAlisFormActionComponentProps> = ({ classes, onAction }) => (
    <button
        className={classes?.buttons}
        title={t("Action:create")}
        onClick={() => onAction && onAction()}>
        <SvgIcon component={PlusIcon} />
    </button>
);
