import {
    Autocomplete,
    AutocompleteRenderGetTagProps,
    AutocompleteRenderInputParams,
    Checkbox,
    Chip,
    TextField,
} from "@mui/material";
import React, { FC, useState } from "react";

import { useTranslation } from "react-i18next";
import { useAutocompleteDictionary } from "src/shared/hooks/useAutocompleteDictionary";
import { DictionaryParams } from "src/shared/hooks/useDictionary/types";
import { useInfinityScroll } from "src/shared/hooks/useInfinityScroll";
import { IdCode } from "src/shared/types";
import { getOptionLabel } from "src/shared/UI/AutocompleteSelectOfDictionary/lib";
import {
    itemSelectWrapper,
    tableStyle,
} from "src/shared/UI/AutocompleteSelectOfDictionary/styles/styles";
import { AutocompleteInputChangeReason } from "src/shared/UI/AutocompleteSelectOfDictionary/types";
import { ChosenSelectObject } from "src/shared/UI/SelectOfDictionaryForm/SelectOfDictionaryForm";
import { useMenuStyles } from "./styles";

interface AutocompleteMultiSelectOfDictionaryProps {
    fieldName: string;
    dictionaryParams: DictionaryParams;
    translatePath?: string;
    value?: IdCode[];
    defaultValue?: IdCode[];
    error?: boolean;
    isDisable?: boolean;
    onSelectValue: (value: IdCode[]) => void;
}

export const AutocompleteMultiSelectOfDictionary: FC<AutocompleteMultiSelectOfDictionaryProps> = (
    props
) => {
    const { t } = useTranslation();
    const {
        fieldName,
        dictionaryParams,
        translatePath,
        value = [],
        defaultValue = [],
        error = false,
        isDisable,
        onSelectValue,
    } = props;
    const [selectedValue, setSelectedValue] = useState<object[]>(
        value.map((o) => ({ ...o, selected: true }))
    );
    const { data, isLoading, getIsDataFullyLoaded, update } = useAutocompleteDictionary({
        type: dictionaryParams.type,
        filter: dictionaryParams.filter,
    });
    const { handleItemLoad, handleListLoad, setSearchValue } = useInfinityScroll({
        isLoading,
        getIsDataFullyLoaded,
        update,
    });
    const classes = useMenuStyles();

    const handleChange = (_event: React.SyntheticEvent, value: object[]) => {
        if (onSelectValue) {
            onSelectValue(value as IdCode[]);
        }
        setSelectedValue(value);
    };

    const handleInputChange = (
        event: React.SyntheticEvent,
        value: string,
        reason: string
    ): void => {
        if (reason === AutocompleteInputChangeReason.CLEAR) {
            handleChange(event, []);
        }
        if (reason === AutocompleteInputChangeReason.INPUT) {
            setSearchValue(value);
        }
    };

    const renderInput = (params: AutocompleteRenderInputParams): React.ReactNode => {
        return <TextField error={error} {...params} fullWidth />;
    };

    const renderOption = (
        props: React.HTMLAttributes<HTMLLIElement>,
        option: object,
        { selected: selected }: { selected: boolean }
    ) => {
        return (
            <li ref={handleItemLoad} {...props} style={itemSelectWrapper}>
                <Checkbox checked={selected} />
                {getOptionLabel({ option: option as ChosenSelectObject, translatePath })}
            </li>
        );
    };

    const renderTags = (value: object[], getTagProps: AutocompleteRenderGetTagProps) =>
        value.map((option, index) => (
            // eslint-disable-next-line react/jsx-key
            <Chip
                variant="outlined"
                label={(option as ChosenSelectObject).code}
                size="small"
                {...getTagProps({ index })}
            />
        ));

    return (
        <Autocomplete
            disabled={isDisable}
            className={classes.autocomplete}
            multiple
            limitTags={1}
            disableCloseOnSelect
            sx={{ width: "100%" }}
            size="small"
            defaultValue={defaultValue}
            value={selectedValue}
            loading={isLoading}
            options={data}
            noOptionsText={t("Shared:noOptions")}
            loadingText={t("Shared:loading")}
            openText={t("Shared:open")}
            closeText={t("Shared:close")}
            clearText={t("Shared:clear")}
            onChange={handleChange}
            onInputChange={handleInputChange}
            renderInput={renderInput}
            renderOption={renderOption}
            renderTags={renderTags}
            getOptionLabel={(option) =>
                getOptionLabel({
                    option: option as ChosenSelectObject,
                    translatePath,
                })
            }
            ListboxProps={{
                ref: handleListLoad,
                ...tableStyle,
            }}
            data-test-id={`value:${fieldName}`}
            isOptionEqualToValue={(option, value) =>
                (option as ChosenSelectObject).code === (value as ChosenSelectObject).code
            }
            filterOptions={(options) => options}
        />
    );
};
