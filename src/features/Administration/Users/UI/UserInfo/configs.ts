import { t } from "i18next";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { FieldGroup } from "src/shared/UI/iFieldItem/types";
import userStore from "src/features/Administration/Users/store/UserStore";
import { DictionaryType } from "src/shared/hooks/useDictionary";

export const fieldsConfiguration = () =>
    [
        {
            fields: [
                {
                    label: t("User:properties.active"),
                    type: FieldItemType.CHECKBOX,
                    value: userStore.current?.active || true,
                    name: "active",
                    fullLine: true,
                },
                {
                    label: t("User:properties.username"),
                    type: FieldItemType.INPUT,
                    value: userStore.current?.username,
                    name: "username",
                    fullLine: true,
                    required: true,
                },
                {
                    label: t("User:properties.password"),
                    type: FieldItemType.PASSWORD,
                    value: userStore.current?.password,
                    name: "password",
                    fullLine: true,
                    required: true,
                },
                {
                    label: t("User:properties.fullName"),
                    type: FieldItemType.INPUT,
                    value: userStore.current?.fullName,
                    name: "fullName",
                    fullLine: true,
                    required: false,
                },
                {
                    label: t("User:properties.type"),
                    type: FieldItemType.ENUM_SELECT,
                    value: userStore.current?.type ?? "INTERNAL",
                    name: "type",
                    fullLine: true,
                    required: true,
                    dictionaryType: DictionaryType.USERTYPE,
                    translatePath: "User:types",
                },
            ],
            name: t("User:properties.miscellaneous"),
        },
        {
            fields: [
                {
                    label: t("User:properties.lastName"),
                    type: FieldItemType.INPUT,
                    value: userStore.current?.lastName,
                    name: "lastName",
                    fullLine: true,
                },
                {
                    label: t("User:properties.firstName"),
                    type: FieldItemType.INPUT,
                    value: userStore.current?.firstName,
                    name: "firstName",
                    fullLine: true,
                },
                {
                    label: t("User:properties.middleName"),
                    type: FieldItemType.INPUT,
                    value: userStore.current?.middleName,
                    name: "middleName",
                    fullLine: true,
                },
                {
                    label: t("User:properties.city"),
                    type: FieldItemType.INPUT,
                    value: userStore.current?.city,
                    name: "city",
                    fullLine: false,
                },
                {
                    label: t("User:properties.phoneNumber"),
                    type: FieldItemType.VALIDATE_INPUT,
                    value: userStore.current?.phoneNumber,
                    name: "phoneNumber",
                    fullLine: false,
                    validateMask: { mask: "+9 (999) 9999999" },
                },
                {
                    label: t("User:properties.email"),
                    type: FieldItemType.INPUT,
                    value: userStore.current?.email,
                    name: "email",
                    fullLine: false,
                },
                {
                    label: t("User:properties.additionalEmail"),
                    type: FieldItemType.INPUT,
                    value: userStore.current?.additionalEmail,
                    name: "additionalEmail",
                    fullLine: false,
                },
            ],
            name: t("User:properties.employee"),
        },
    ] as FieldGroup[];
