import { TextField } from "@mui/material";
import { FC } from "react";
import useInputNumberStyles from "src/shared/UI/IFieldItemInputNumber/styles/styles";
import { IRegisterType, ITriggerType } from "src/shared/UI/iFieldItem/types";

interface IFieldItemInputNumber {
    error: boolean;
    fieldName: string;
    type?: string;
    register?: IRegisterType;
    trigger?: ITriggerType;
    min?: number;
    max?: number;
    testFieldName?: string;
}

const IFieldItemInputNumber: FC<IFieldItemInputNumber> = ({
    error,
    fieldName,
    type = "number",
    register,
    trigger,
    min,
    max,
    testFieldName,
}): JSX.Element => {
    const styles = useInputNumberStyles();

    return (
        <TextField
            {...register?.(fieldName, {
                min: min,
                max: max,
                onChange: () => {
                    trigger?.(fieldName);
                },
            })}
            size="small"
            className={styles.wrapper}
            type={type}
            error={error}
            data-test-id={`value:${testFieldName ?? fieldName}`}
        />
    );
};

export default IFieldItemInputNumber;
