import React from "react";
import {
    FieldPath,
    FieldValues,
    RegisterOptions,
    TriggerConfig,
    UseFormRegisterReturn,
} from "react-hook-form";
import { ChosenSelectObject } from "src/shared/UI/SelectOfDictionaryForm/SelectOfDictionaryForm";
import { ValueOption } from "src/shared/hooks/useDictionary/config";
import { DictionaryParams } from "src/shared/hooks/useDictionary/types";
import { IValidateMask } from "src/shared/types/types";
import { DictionaryType } from "../../hooks/useDictionary";
import { FieldItemType } from "./const";

export type IRegisterType = (
    name: string,
    options?: RegisterOptions<FieldValues, string>
) => UseFormRegisterReturn<string>;

export type ITriggerType = (
    name?: FieldPath<FieldValues> | FieldPath<FieldValues>[],
    options?: TriggerConfig
) => Promise<boolean>;

export interface FieldItemProps {
    label: string;
    isReadOnly: boolean;
    // @TODO need to use real type instead of any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: any;
    // @TODO need to use real type instead of any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: string | any;
    type: FieldItemType;
    fieldName: string;
    id?: string | ChosenSelectObject;
    dictionaryType?: DictionaryType | null;
    requestParams?: DictionaryParams;
    fullLine?: boolean;
    translatePath?: string;
    isDisable?: boolean;
    component?: React.ReactNode;
    isLabelNarrow?: boolean;
    withDescription?: boolean;
    description?: string;
    required?: boolean;
    error?: boolean;
    fieldError?: boolean;
    renderValuePrimary?: string;
    renderValueSecondary?: string;
    nonEditableValue?: string;
    withClearButton?: boolean;
    register?: IRegisterType;
    validateMask?: IValidateMask;
    options?: string[] | ValueOption[];
    trigger?: ITriggerType;
    externalValue?: Record<string, string | null> | null | undefined;
    onClear?: () => void;
    min?: number;
    max?: number;
    validate?: (value: string | number | Record<string, string>) => boolean;
    linkTo?: string;
    testFieldName?: string;
    events?: {
        onButtonClick?: (event: React.MouseEvent) => void;
        mapDataCallback?: <T>(list: T[]) => T[];
    };
}

export interface FieldItem {
    label: string;
    // @TODO need to use real type instead of any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: string | any;
    type: FieldItemType;
    name: string;
    id?: string | ChosenSelectObject;
    dictionaryType?: DictionaryType | null;
    requestParams?: DictionaryParams;
    readOnly?: boolean;
    fullLine?: boolean;
    translatePath?: string;
    isDisable?: boolean;
    component?: React.ReactNode;
    withDescription?: boolean;
    description?: string;
    required?: boolean;
    error?: boolean;
    fieldError?: boolean;
    renderValuePrimary?: string;
    renderValueSecondary?: string;
    nonEditableValue?: string;
    withClearButton?: boolean;
    register?: IRegisterType;
    validateMask?: IValidateMask;
    trigger?: ITriggerType;
    externalValue?: Record<string, string | null> | null | undefined;
    onClear?: () => void;
    min?: number;
    max?: number;
    options?: string[] | ValueOption[];
    validate?: (value: string | number | Record<string, string>) => boolean;
    linkTo?: string;
    testFieldName?: string;
    events?: {
        onButtonClick?: (event: React.MouseEvent) => void;
        mapDataCallback?: <T>(list: T[]) => T[];
    };
}

export interface FieldGroup {
    name?: string;
    fields: FieldItem[];
}

export type RenderSelectValueProps = {
    value:
        | {
              code?: string;
              name?: string;
              renderValuePrimary?: string;
              renderValueSecondary?: string;
          }
        | string;
    fieldName: string;
    translatePath: string | undefined;
    isDisable: boolean | undefined;
    isReadOnly: boolean;
    renderValuePrimary: string | undefined;
    renderValueSecondary: string | undefined;
    nonEditableValue: string | undefined;
};
