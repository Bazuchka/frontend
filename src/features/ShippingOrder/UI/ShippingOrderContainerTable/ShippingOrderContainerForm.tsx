import { SvgIcon } from "@mui/material";
import { t } from "i18next";
import { observer } from "mobx-react";
import { FC } from "react";
import { PlusIcon } from "src/assets/svg";
import { ContainerForm } from "src/features/Container";
import { containerStore } from "src/features/Container/store";
import {
    IAlisFormActionComponentProps,
    IAlisFormComponentProps,
} from "src/features/common/AlisForm/AlisForm";
import shippingOrderStore from "../../store/ShippingOrderStore";

export const ShippingOrderContainerForm: FC<IAlisFormComponentProps> = observer(
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
                        value: shippingOrderStore.current?.client as { id: string },
                    },
                }}
            />
        );
    }
);

export const CreateContainerButton: FC<IAlisFormActionComponentProps> = ({ classes, onAction }) => (
    <button className={classes?.buttons} title={t("Action:create")} onClick={() => onAction?.()}>
        <SvgIcon component={PlusIcon} />
    </button>
);
