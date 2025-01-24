import React from "react";
import { FIELD_TYPE, FieldItemType } from "./const";
import { getTypeMapping } from "./lib/getTypeMapping";
import { FieldItemProps } from "./types";

const IFieldItemReadOnly: React.FC<FieldItemProps> = (props) => {
    const { type } = props;

    const typeMapping = getTypeMapping(props);

    const fieldMapping: Record<FieldItemType, JSX.Element> = {
        [FieldItemType.CHECKBOX]: typeMapping[FIELD_TYPE.CHECKBOX],
        [FieldItemType.DATE]: typeMapping[FIELD_TYPE.DATE],
        [FieldItemType.ENUM_SELECT]: typeMapping[FIELD_TYPE.SELECT],
        [FieldItemType.AUTOCOMPLETE]: typeMapping[FIELD_TYPE.SELECT],
        [FieldItemType.AUTOCOMPLETE_WITH_MASK]: typeMapping[FIELD_TYPE.SELECT],
        [FieldItemType.AUTOCOMPLETE_MULTISELECT]: typeMapping[FIELD_TYPE.DEFAULT],
        [FieldItemType.SELECT]: typeMapping[FIELD_TYPE.SELECT],
        [FieldItemType.RATING]: typeMapping[FIELD_TYPE.RATING],
        [FieldItemType.STATIC]: typeMapping[FIELD_TYPE.STATIC],
        [FieldItemType.INPUT]: typeMapping[FIELD_TYPE.DEFAULT],
        [FieldItemType.INPUT_NUMBER]: typeMapping[FIELD_TYPE.DEFAULT],
        [FieldItemType.LINK]: typeMapping[FIELD_TYPE.LINK],
        [FieldItemType.VALIDATE_INPUT]: typeMapping[FIELD_TYPE.DEFAULT],
        [FieldItemType.TIME]: typeMapping[FIELD_TYPE.TIME],
        [FieldItemType.BUTTON]: typeMapping[FIELD_TYPE.BUTTON],
        [FieldItemType.PASSWORD]: typeMapping[FIELD_TYPE.PASSWORD],
        [FieldItemType.TABLE]: typeMapping[FIELD_TYPE.TABLE],
    };

    return fieldMapping[type] ?? typeMapping[FIELD_TYPE.DEFAULT];
};

export default IFieldItemReadOnly;
