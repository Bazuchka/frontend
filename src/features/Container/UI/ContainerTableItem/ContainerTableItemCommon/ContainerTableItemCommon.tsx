import { FieldGroup } from "src/shared/UI/iFieldItem/types";
import { containerStore } from "../../../store";
import { observer } from "mobx-react";
import { FC } from "react";
import { t } from "i18next";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { IFormComponent } from "src/shared/UI/iFormComponent";

interface containerItemCommonProps {}

const LegalEntityInfo: FC<containerItemCommonProps> = observer((): JSX.Element => {
    const fields: FieldGroup[] = [
        {
            fields: [
                {
                    label: t("Containers:containersTableItem.common.name"),
                    type: FieldItemType.INPUT,
                    value: containerStore.current?.code,
                    name: "name",
                    fullLine: false,
                },
                {
                    label: t("Containers:containersTableItem.common.type"),
                    type: FieldItemType.INPUT,
                    value: containerStore.current?.containerType,
                    name: "type",
                    fullLine: false,
                },
                {
                    label: t("Containers:containersTableItem.common.client"),
                    type: FieldItemType.INPUT,
                    value: containerStore.current?.client.code ?? "-",
                    name: "client",
                    fullLine: false,
                },
                {
                    label: t("Containers:containersTableItem.common.weightTara"),
                    type: FieldItemType.INPUT,
                    value: containerStore.current?.weight ?? "-",
                    name: "weight",
                    fullLine: false,
                },
                {
                    label: t("Containers:containersTableItem.common.refrigirator"),
                    type: FieldItemType.CHECKBOX,
                    value: containerStore.current?.refrigerator,
                    name: "refrigerator",
                    fullLine: false,
                },
                {
                    label: t("Containers:containersTableItem.common.active"),
                    type: FieldItemType.CHECKBOX,
                    value: containerStore.current?.active,
                    name: "active",
                    fullLine: false,
                },
            ],
            name: t("Shared:commonInfo"),
        },
    ];
    return (
        <IFormComponent
            isWaitingStore={containerStore.state.isLoading}
            fields={fields}
            isLoading={false}
            isEditMode={false}
        />
    );
});

export default LegalEntityInfo;
