import { FC } from "react";
import { IdCode } from "src/shared/types";
import { getFormattedFieldValue } from "./lib/getFormattedFieldValue";

interface FieldValueProps {
    value: string | IdCode[];
    fieldName: string;
    className?: string;
}
const FieldValue: FC<FieldValueProps> = (props) => {
    const { value, className, fieldName } = props;

    const formattedValue = getFormattedFieldValue(value);

    return (
        <span data-test-id={`value:${fieldName}`} className={className}>
            {formattedValue}
        </span>
    );
};

export default FieldValue;
