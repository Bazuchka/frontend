/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { Checkbox, TextField } from "@mui/material";
import { useEffect } from "react";
import InputMask from "react-input-mask";
import { AutocompleteMultiSelectOfDictionaryForm } from "src/shared/UI/AutocompleteMultiSelectOfDictionary";
import {
    AutocompleteSelectOfDictionaryForm,
    AutocompleteSelectOfDictionaryFormWithMask,
} from "src/shared/UI/AutocompleteSelectOfDictionary";
import IFieldItemInputNumber from "src/shared/UI/IFieldItemInputNumber/InputNumber";
import { SelectOfDictionaryForm } from "src/shared/UI/SelectOfDictionaryForm";
import { ChosenSelectObject } from "src/shared/UI/SelectOfDictionaryForm/SelectOfDictionaryForm";
import { SelectOfEnumForm } from "src/shared/UI/SelectOfEnum";
import { TimePicker } from "src/shared/UI/TimePicker";
import { IDatePicker } from "src/shared/UI/iDatePicker";
import { FieldItemType } from "src/shared/UI/iFieldItem/const";
import { IRegisterType, ITriggerType } from "src/shared/UI/iFieldItem/types";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { ValueOption } from "src/shared/hooks/useDictionary/config";
import { DictionaryParams } from "src/shared/hooks/useDictionary/types";
import { IValidateMask, IdCode } from "src/shared/types/types";

const createComponentByType = (
    fieldName: string,
    testFieldName: string,
    type: FieldItemType,
    value: string | boolean | ChosenSelectObject | IdCode[] | Date | number,
    dictionaryType?: DictionaryType | null,
    dictionaryParams?: DictionaryParams,
    isDisable?: boolean,
    translatePath?: string,
    required?: boolean,
    error?: boolean,
    renderValuePrimary?: string,
    renderValueSecondary?: string,
    withClearButton?: boolean,
    register?: IRegisterType,
    validateMask?: IValidateMask,
    externalValue?: Record<string, string | null> | null | undefined,
    onClear?: () => void,
    trigger?: ITriggerType,
    min?: number,
    max?: number,
    options?: string[] | ValueOption[]
) => {
    switch (type) {
        case FieldItemType.CHECKBOX: {
            return (
                <Checkbox
                    defaultChecked={!!value}
                    data-test-id={`value:${testFieldName}`}
                    disabled={isDisable}
                />
            );
        }
        case FieldItemType.INPUT: {
            return (
                <TextField
                    size="small"
                    multiline={true}
                    error={Boolean(error)}
                    disabled={isDisable}
                    sx={{
                        width: "100%",
                        "& .MuiOutlinedInput-root": {
                            "& > textarea": {
                                zIndex: 5,
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#32386D",
                                background: "#F0EEF3",
                                color: "red",
                            },
                        },
                    }}
                    data-test-id={`value:${testFieldName}`}
                />
            );
        }
        case FieldItemType.VALIDATE_INPUT:
            {
                useEffect(() => {
                    trigger?.(fieldName);
                }, []);
                return (
                    <InputMask
                        mask={validateMask?.mask as Array<string | RegExp>}
                        data-test-id={`value:${testFieldName}`}
                        {...register?.(fieldName, {
                            pattern: validateMask?.pattern,
                            onChange: () => {
                                trigger?.(fieldName);
                            },
                        })}
                        maskPlaceholder={validateMask?.maskChar}>
                        <TextField
                            placeholder={validateMask?.placeholder as string}
                            size={"small"}
                            error={Boolean(error)}
                            sx={{
                                width: "100%",
                                "& :focus": {
                                    background: "#F0EEF3",
                                },
                            }}
                        />
                    </InputMask>
                );
            }
            fieldName;
        case FieldItemType.INPUT_NUMBER: {
            return (
                <IFieldItemInputNumber
                    error={Boolean(error)}
                    fieldName={fieldName}
                    register={register}
                    trigger={trigger}
                    max={max}
                    min={min}
                    testFieldName={testFieldName}
                />
            );
        }
        case FieldItemType.SELECT: {
            return (
                <SelectOfDictionaryForm
                    dictionaryType={dictionaryType}
                    value={value as string}
                    fieldName={fieldName}
                    disableCondition={isDisable as boolean}
                    dictionaryParams={dictionaryParams}
                    translatePath={translatePath}
                    error={Boolean(required && error)}
                    testFieldName={testFieldName}
                />
            );
        }
        case FieldItemType.DATE: {
            return (
                <IDatePicker
                    value={value as string}
                    fieldName={fieldName}
                    error={Boolean(required && error)}
                    testFieldName={testFieldName}
                    disableCondition={isDisable as boolean}
                />
            );
        }
        case FieldItemType.TIME: {
            return (
                <TimePicker
                    value={value as string}
                    fieldName={fieldName}
                    error={Boolean(required && error)}
                    testFieldName={testFieldName}
                    disableCondition={isDisable as boolean}
                />
            );
        }
        case FieldItemType.AUTOCOMPLETE: {
            return (
                <AutocompleteSelectOfDictionaryForm
                    dictionaryType={dictionaryType}
                    value={value as ChosenSelectObject}
                    externalValue={externalValue}
                    fieldName={fieldName}
                    isDisable={isDisable as boolean}
                    dictionaryParams={dictionaryParams}
                    translatePath={translatePath}
                    error={Boolean(required && error)}
                    renderValuePrimary={renderValuePrimary}
                    renderValueSecondary={renderValueSecondary}
                    onClear={onClear}
                    testFieldName={testFieldName}
                />
            );
        }
        case FieldItemType.AUTOCOMPLETE_MULTISELECT: {
            return (
                <AutocompleteMultiSelectOfDictionaryForm
                    value={value as IdCode[]}
                    fieldName={fieldName}
                    isDisable={isDisable as boolean}
                    dictionaryParams={dictionaryParams as DictionaryParams}
                    translatePath={translatePath}
                    error={Boolean(required && error)}
                />
            );
        }
        case FieldItemType.AUTOCOMPLETE_WITH_MASK: {
            return (
                <AutocompleteSelectOfDictionaryFormWithMask
                    dictionaryType={dictionaryType}
                    value={value as ChosenSelectObject}
                    fieldName={fieldName}
                    disableCondition={isDisable as boolean}
                    dictionaryParams={dictionaryParams}
                    translatePath={translatePath}
                    error={Boolean(required && error)}
                    renderValuePrimary={renderValuePrimary}
                    renderValueSecondary={renderValueSecondary}
                    validateMask={validateMask}
                    trigger={trigger}
                    register={register}
                    externalValue={externalValue}
                    testFieldName={testFieldName}
                />
            );
        }
        case FieldItemType.ENUM_SELECT: {
            return (
                <SelectOfEnumForm
                    options={options}
                    dictionaryType={dictionaryType as DictionaryType}
                    value={value as string}
                    fieldName={fieldName}
                    isDisable={isDisable as boolean}
                    translatePath={translatePath}
                    dictionaryParams={dictionaryParams}
                    error={Boolean(required && error)}
                    withClearButton={!!withClearButton}
                    testFieldName={testFieldName}
                />
            );
        }
        default:
            return <>{value as string}</>;
    }
};

export default createComponentByType;
