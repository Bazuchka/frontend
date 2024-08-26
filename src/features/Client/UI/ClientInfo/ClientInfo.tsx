import { t } from "i18next";
import { observer } from "mobx-react";
import { FC } from "react";
import clientStore from "src/features/Client/store";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { FieldGroup } from "src/shared/UI/iFieldItem/types";
import { IFormComponent } from "src/shared/UI/iFormComponent";

interface ClientInfoProps {}

const ClientInfo: FC<ClientInfoProps> = observer((): JSX.Element => {
    const fields: FieldGroup[] = [
        {
            fields: [
                {
                    label: t("Client:properties.code"),
                    type: FieldItemType.INPUT,
                    value: clientStore.current?.code,
                    name: "code",
                    fullLine: false,
                },
                {
                    label: t("Client:properties.active"),
                    type: FieldItemType.CHECKBOX,
                    value: clientStore.current?.active,
                    name: "active",
                    fullLine: false,
                },
                {
                    label: t("Client:properties.name"),
                    type: FieldItemType.INPUT,
                    value: clientStore.current?.name ?? "-",
                    name: "name",
                    fullLine: true,
                },
            ],
            name: t("Shared:commonInfo"),
        },
        {
            fields: [
                {
                    label: t("Client:properties.phoneNumber"),
                    type: FieldItemType.INPUT,
                    value: clientStore.current?.phoneNumber ?? "-",
                    name: "phoneNumber",
                    fullLine: false,
                },
                {
                    label: t("Client:properties.email"),
                    type: FieldItemType.INPUT,
                    value: clientStore.current?.email ?? "-",
                    name: "email",
                    fullLine: false,
                },
                {
                    label: t("Client:properties.address"),
                    type: FieldItemType.INPUT,
                    value: clientStore.current?.addressFact ?? "-",
                    name: "addressFact",
                    fullLine: true,
                },
            ],
            name: t("Client:properties.contactInfo"),
        },
    ];

    return (
        <IFormComponent
            isWaitingStore={clientStore.state.isLoading}
            fields={fields}
            isLoading={false}
            isEditMode={false}
        />
    );
});

export default ClientInfo;
