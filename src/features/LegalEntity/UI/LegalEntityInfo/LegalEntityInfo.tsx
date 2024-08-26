import { t } from "i18next";
import { observer } from "mobx-react";
import { FC } from "react";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { FieldGroup } from "src/shared/UI/iFieldItem/types";
import { IFormComponent } from "src/shared/UI/iFormComponent";
import legalEntityStore from "../../store/LegalEntityStore";

interface LegalEntityInfoProps {}

const LegalEntityInfo: FC<LegalEntityInfoProps> = observer((): JSX.Element => {
    const fields: FieldGroup[] = [
        {
            fields: [
                {
                    label: t("LegalEntity:properties.code"),
                    type: FieldItemType.INPUT,
                    value: legalEntityStore.current?.code,
                    name: "name",
                    fullLine: false,
                },
                {
                    label: t("LegalEntity:properties.active"),
                    type: FieldItemType.CHECKBOX,
                    value: legalEntityStore.current?.active,
                    name: "active",
                    fullLine: false,
                },
                {
                    label: t("LegalEntity:properties.fullName"),
                    type: FieldItemType.INPUT,
                    value: legalEntityStore.current?.name ?? "-",
                    name: "name",
                    fullLine: false,
                },
                {
                    label: t("LegalEntity:properties.client"),
                    type: FieldItemType.INPUT,
                    value: legalEntityStore.current?.client.code ?? "-",
                    name: "client",
                    fullLine: false,
                },
            ],
            name: t("Shared:commonInfo"),
        },
        {
            fields: [
                {
                    label: t("LegalEntity:properties.inn"),
                    type: FieldItemType.INPUT,
                    value: legalEntityStore.current?.inn,
                    name: "inn",
                    fullLine: false,
                },
                {
                    label: t("LegalEntity:properties.ogrn"),
                    type: FieldItemType.INPUT,
                    value: legalEntityStore.current?.ogrn,
                    name: "ogrn",
                    fullLine: false,
                },
                {
                    label: t("LegalEntity:properties.kpp"),
                    type: FieldItemType.INPUT,
                    value: legalEntityStore.current?.kpp,
                    name: "kpp",
                    fullLine: false,
                },
                {
                    label: t("LegalEntity:properties.okpo"),
                    type: FieldItemType.INPUT,
                    value: legalEntityStore.current?.okpo,
                    name: "okpo",
                    fullLine: false,
                },
                {
                    label: t("LegalEntity:properties.addressLegal"),
                    type: FieldItemType.INPUT,
                    value: legalEntityStore.current?.addressLegal,
                    name: "addressLegal",
                    fullLine: true,
                },
                {
                    label: t("LegalEntity:properties.addressFact"),
                    type: FieldItemType.INPUT,
                    value: legalEntityStore.current?.addressFact,
                    name: "addressFact",
                    fullLine: true,
                },
                {
                    label: t("LegalEntity:properties.edoId"),
                    type: FieldItemType.INPUT,
                    value: legalEntityStore.current?.edoId,
                    name: "edoId",
                    fullLine: true,
                },
                {
                    label: t("LegalEntity:properties.signatoryPosition"),
                    type: FieldItemType.INPUT,
                    value: legalEntityStore.current?.signatoryPosition,
                    name: "signatoryPosition",
                    fullLine: false,
                },
                {
                    label: t("LegalEntity:properties.signatoryName"),
                    type: FieldItemType.INPUT,
                    value: legalEntityStore.current?.signatoryName,
                    name: "signatoryName",
                    fullLine: false,
                },
            ],
            name: t("LegalEntity:properties.requisites"),
        },
    ];

    return (
        <IFormComponent
            isWaitingStore={legalEntityStore.state.isLoading}
            fields={fields}
            isLoading={false}
            isEditMode={false}
        />
    );
});

export default LegalEntityInfo;
