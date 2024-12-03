import { FC } from "react";

interface FieldLabelProps {
    label: string;
    fieldName: string;
    className: string;
}

const FieldLabel: FC<FieldLabelProps> = (props) => {
    const { fieldName, label, className } = props;
    return (
        <label data-test-id={`label:${fieldName}`} className={className}>
            {label}
        </label>
    );
};

export default FieldLabel;
