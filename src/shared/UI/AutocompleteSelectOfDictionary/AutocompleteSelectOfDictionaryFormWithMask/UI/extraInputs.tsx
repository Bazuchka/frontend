import { ChangeEvent, FC } from "react";
import InputMask from "react-input-mask";
import { AutocompleteRenderInputParams, TextField } from "@mui/material";
import { IValidateMask } from "src/shared/types/types";

type AutocompleteSelectOfDictionaryInputMaskProps = {
    validateMask?: IValidateMask | undefined;
    fieldName: string;
    localValue: string;
    renderParams: AutocompleteRenderInputParams;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error: boolean | undefined;
};

export const AutocompleteSelectOfDictionaryInputMask: FC<
    AutocompleteSelectOfDictionaryInputMaskProps
> = ({ validateMask, fieldName, localValue, renderParams, onChange, error }) => {
    const { disabled, ...rest } = renderParams;

    return (
        <InputMask
            mask={validateMask?.mask as Array<string | RegExp>}
            data-test-id={`value:${fieldName}`}
            disabled={disabled}
            value={localValue}
            maskPlaceholder={validateMask?.maskChar}>
            <TextField
                defaultValue={rest.inputProps.value}
                placeholder={validateMask?.placeholder as string}
                error={Boolean(error)}
                sx={{
                    width: "100%",
                    "& :focus": {
                        background: "#F0EEF3",
                    },
                }}
                {...{ ...rest, inputProps: { ...rest.inputProps, onChange, value: null } }}
            />
        </InputMask>
    );
};

type AutocompleteSelectOfDictionarySimpleInputProps = {
    renderParams: AutocompleteRenderInputParams;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const AutocompleteSelectOfDictionarySimpleInput: FC<
    AutocompleteSelectOfDictionarySimpleInputProps
> = ({ renderParams, onChange }) => (
    <TextField
        {...{
            ...renderParams,
            inputProps: { ...renderParams.inputProps, onChange },
        }}
    />
);
