import { t } from "i18next";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { FieldGroup } from "src/shared/UI/iFieldItem/types";
import roleStore from "../../store/RoleStore";

export const fieldsConfiguration = () =>
    [
        {
            fields: [
                {
                    label: t("Role:properties.code"),
                    type: FieldItemType.INPUT,
                    value: roleStore.current?.code,
                    name: "code",
                    fullLine: true,
                    required: true,
                },
                {
                    label: t("Role:properties.name"),
                    type: FieldItemType.INPUT,
                    value: roleStore.current?.name,
                    name: "name",
                    fullLine: true,
                    required: true,
                },
            ],
            name: t("Shared:commonInfo"),
        },
    ] as FieldGroup[];
