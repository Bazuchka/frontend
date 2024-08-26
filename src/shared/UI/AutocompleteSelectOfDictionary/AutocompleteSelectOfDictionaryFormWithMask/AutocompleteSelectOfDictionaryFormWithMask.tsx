/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, FC, useEffect, useState } from "react";

import { AutocompleteRenderInputParams } from "@mui/material";
import { ChosenSelectObject } from "src/shared/UI/SelectOfDictionaryForm/SelectOfDictionaryForm";
import { DictionaryParams, DictionaryType } from "src/shared/hooks/useDictionary/types";
import { formStyle } from "src/shared/UI/AutocompleteSelectOfDictionary/styles/styles";
import { IValidateMask } from "src/shared/types/types";
import { ITriggerType, IRegisterType } from "../../iFieldItem/types";
import { AutocompleteSelectOfDictionary } from "../AutocompleteSelectOfDictionary";
import {
    AutocompleteSelectOfDictionaryInputMask,
    AutocompleteSelectOfDictionarySimpleInput,
} from "./UI";

interface AutocompleteSelectOfDictionaryFormProps {
    dictionaryType?: DictionaryType | null;
    dictionaryParams?: DictionaryParams;
    value?: ChosenSelectObject;
    fieldName: string;
    onChange?: (arg: ChosenSelectObject | null) => void;
    disableCondition?: boolean;
    translatePath?: string;
    error?: boolean;
    renderValuePrimary?: string;
    renderValueSecondary?: string;
    renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
    validateMask?: IValidateMask;
    trigger?: ITriggerType;
    register?: IRegisterType;
    externalValue?: Record<string, string | null> | null | undefined;
    testFieldName?: string;
}

const AutocompleteSelectOfDictionaryFormWithMask: FC<AutocompleteSelectOfDictionaryFormProps> = (
    props
) => {
    const [isInputWithMask, setIsInputWithMask] = useState(false);
    const [localValue, setLocalValue] = useState("");

    const { fieldName, validateMask, trigger, error } = props;

    const handleValueChange = (value: ChosenSelectObject | null) => {
        setIsInputWithMask(!value?.id);
        props.onChange && props?.onChange(value);
        setLocalValue(value?.code || "");
        trigger?.(fieldName);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleValueChange({ code: e.target.value, id: "" } as ChosenSelectObject);
    };

    useEffect(() => {
        if (props?.externalValue !== undefined) {
            handleValueChange({ code: props?.externalValue?.code, id: "" } as ChosenSelectObject);
        }
    }, [props.externalValue]);

    useEffect(() => {
        if (isInputWithMask) {
            trigger?.(fieldName);
        }
    }, [trigger, isInputWithMask]);

    const renderInput = (renderParams: AutocompleteRenderInputParams) => {
        if (!isInputWithMask) {
            return (
                <AutocompleteSelectOfDictionarySimpleInput
                    renderParams={renderParams}
                    onChange={handleInputChange}
                />
            );
        }

        return (
            <AutocompleteSelectOfDictionaryInputMask
                renderParams={renderParams}
                onChange={handleInputChange}
                localValue={localValue}
                validateMask={validateMask}
                error={error}
                fieldName={fieldName}
            />
        );
    };

    return (
        <AutocompleteSelectOfDictionary
            onValueChange={handleValueChange}
            style={formStyle}
            {...props}
            renderInput={renderInput}
        />
    );
};

export default AutocompleteSelectOfDictionaryFormWithMask;
