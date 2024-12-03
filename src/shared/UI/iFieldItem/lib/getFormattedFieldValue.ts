import { IdCode } from "src/shared/types";

export function getFormattedFieldValue(value?: string | number | Partial<IdCode>[] | null) {
    let formattedValue;
    if (value) {
        if (value instanceof Array) {
            formattedValue = value.map((v) => v.code || v.id).join(", ");
        } else {
            formattedValue = value.toLocaleString();
        }
    } else {
        formattedValue = "";
    }
    return formattedValue;
}
