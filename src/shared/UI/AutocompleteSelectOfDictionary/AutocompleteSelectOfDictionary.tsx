/* eslint-disable no-prototype-builtins */
/* eslint-disable no-dupe-else-if */
/* eslint-disable react-hooks/exhaustive-deps */
import { Autocomplete, AutocompleteRenderInputParams, Grid, TextField } from "@mui/material";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAutocompleteDictionary } from "src/shared/hooks/useAutocompleteDictionary";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { DictionaryParams } from "src/shared/hooks/useDictionary/types";
import { useInfinityScroll } from "src/shared/hooks/useInfinityScroll";
import { IdCode } from "src/shared/types";
import { itemSelectWrapper } from "src/shared/UI/AutocompleteSelectOfDictionary/styles/styles";
import { AutocompleteInputChangeReason } from "src/shared/UI/AutocompleteSelectOfDictionary/types";
import { ChosenSelectObject } from "../SelectOfDictionaryForm/SelectOfDictionaryForm";
import { getOptionLabel } from "./lib";

export interface AutocompleteSelectOfDictionaryProps {
    dictionaryType?: DictionaryType | null;
    dictionaryParams?: DictionaryParams;
    nullableValueChanger?: IdCode;
    translatePath?: string;
    editValue?: object | string;
    isDisable?: boolean;
    isMock?: boolean;
    useSorting?: boolean;
    renderValuePrimary?: string;
    renderValueSecondary?: string;
    onValueChange: (value: ChosenSelectObject | null) => void;
    onExternalSelectedValueChange?: (value: object | null) => void;
    externalSelectedValue?: object | null;
    value?: ChosenSelectObject;
    externalValue?: Record<string, string | null> | null | undefined;
    fieldName?: string;
    error?: boolean;
    style?: object;
    onClear?: () => void;
    renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
    testFieldName?: string;
}

export const AutocompleteSelectOfDictionary: FC<AutocompleteSelectOfDictionaryProps> = (props) => {
    const {
        isDisable,
        translatePath,
        renderValuePrimary,
        renderValueSecondary,
        editValue,
        onValueChange,
        error,
        onExternalSelectedValueChange,
        externalSelectedValue,
        style,
        value,
        externalValue,
        fieldName,
        dictionaryParams = {},
        dictionaryType,
        nullableValueChanger,
        onClear,
        renderInput,
        testFieldName,
        useSorting,
        isMock = false,
    } = props;

    const variablesParams = dictionaryType ? { type: dictionaryType } : dictionaryParams;
    const { t } = useTranslation();

    const { data, isLoading, update, getIsDataFullyLoaded } = useAutocompleteDictionary({
        ...variablesParams,
        useSorting,
        isMock,
    });

    const [inputValue, setInputValue] = useState<string>("");
    const [selectedValue, setSelectedValue] = useState<object | null>(null);

    const updateSelectedValue = useCallback(
        (value: string | ChosenSelectObject | undefined) => {
            onExternalSelectedValueChange
                ? onExternalSelectedValueChange(value as ChosenSelectObject)
                : setSelectedValue(value as ChosenSelectObject);
        },
        [onExternalSelectedValueChange]
    );

    useEffect(() => {
        if (nullableValueChanger) {
            const nullableItemIndex = data?.findIndex((el: IdCode | null) => el === null);
            if (nullableItemIndex !== -1) {
                data[nullableItemIndex] = nullableValueChanger;
            } else {
                if (nullableValueChanger) {
                    data.unshift(nullableValueChanger);
                }
            }
        }
    }, [data]);

    const { handleItemLoad, handleListLoad, setSearchValue } = useInfinityScroll({
        isLoading,
        getIsDataFullyLoaded,
        update,
    });

    useEffect(() => {
        if (value?.hasOwnProperty("id") || externalValue?.hasOwnProperty("id")) {
            updateSelectedValue((value as ChosenSelectObject) || externalValue);
            if (value && !renderValuePrimary) {
                setInputValue((value as ChosenSelectObject)?.code || "");
            } else if (value && renderValuePrimary) {
                setInputValue(
                    (value[renderValuePrimary as keyof ChosenSelectObject] as string) || ""
                );
            } else if (externalValue) {
                setInputValue((externalValue?.code as string) || "");
            }
        }

        if (value === null && !externalValue) {
            updateSelectedValue(value);
            setInputValue("");
        }
        if (externalValue === null) {
            updateSelectedValue(externalValue as unknown as ChosenSelectObject);
            setInputValue("");
        }
    }, [editValue, onExternalSelectedValueChange, updateSelectedValue, value, externalValue]);

    useEffect(() => {
        setSearchValue(inputValue);
    }, [inputValue, setSearchValue]);

    const renderOption = (props: React.HTMLAttributes<HTMLLIElement>, option: object) => (
        <li
            ref={handleItemLoad}
            {...props}
            style={itemSelectWrapper}
            key={(option as { id: string }).id}>
            <Grid container alignItems="center">
                {getOptionLabel({
                    option: option as ChosenSelectObject,
                    translatePath,
                    renderValuePrimary,
                    renderValueSecondary,
                })}
            </Grid>
        </li>
    );

    const handleValueChange = (value: object | null) => {
        updateSelectedValue(value as ChosenSelectObject);
        onValueChange ? onValueChange(value as ChosenSelectObject | null) : "";
    };

    return (
        <Autocomplete
            defaultChecked={true}
            loading={isLoading}
            sx={{ width: "100%" }}
            size="small"
            disabled={isDisable as boolean}
            // @TODO need to use real type instead of any
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            isOptionEqualToValue={(option: any, value: any) => option.id === value.id}
            options={data}
            inputValue={inputValue}
            value={onExternalSelectedValueChange ? externalSelectedValue : selectedValue}
            onInputChange={(_, value, reason) => {
                if (reason === AutocompleteInputChangeReason.RESET) {
                    return;
                }
                if (reason === AutocompleteInputChangeReason.CLEAR && onClear) {
                    onClear();
                }
                if (!value) {
                    updateSelectedValue("");
                }

                setInputValue(value);
            }}
            noOptionsText={t("Shared:noOptions")}
            loadingText={t("Shared:loading")}
            openText={t("Shared:open")}
            closeText={t("Shared:close")}
            clearText={t("Shared:clear")}
            onChange={(_, value) => handleValueChange(value)}
            getOptionLabel={(option) =>
                getOptionLabel({
                    option: option as ChosenSelectObject,
                    translatePath,
                    renderValuePrimary,
                    renderValueSecondary,
                })
            }
            renderInput={(params) => {
                if (renderInput) {
                    return renderInput(params);
                }
                return <TextField error={error} {...params} fullWidth />;
            }}
            renderOption={renderOption}
            ListboxProps={{
                ref: handleListLoad,
                ...(style && {
                    style,
                }),
            }}
            data-test-id={`value:${testFieldName ?? fieldName}`}
            // Disables default filtering and makes it possible to throw the mask we need
            filterOptions={(options) => options}
        />
    );
};
