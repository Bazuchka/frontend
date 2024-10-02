/* eslint-disable no-prototype-builtins */
/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress, FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { toJS } from "mobx";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DictionaryParams, DictionaryType } from "src/shared/hooks/useDictionary/types";
import { useDictionary } from "../../hooks/useDictionary";

export interface ChosenSelectObject {
    active?: boolean;
    code?: string;
    id: string;
    name?: string | null;
}

interface SelectOfDictionaryFormProps {
    dictionaryType?: DictionaryType | null;
    dictionaryParams?: DictionaryParams;
    value?: string | ChosenSelectObject;
    fieldName: string;
    onChange?: (arg: ChosenSelectObject) => void;
    disableCondition?: boolean;
    translatePath?: string;
    error?: boolean;
    testFieldName?: string;
}

const SelectOfDictionaryForm: FC<SelectOfDictionaryFormProps> = ({
    dictionaryType,
    dictionaryParams,
    value,
    fieldName,
    onChange,
    disableCondition,
    translatePath,
    error,
    testFieldName,
}) => {
    const { data, isLoading, isDisable } = useDictionary(
        (dictionaryParams || { type: dictionaryType }) as DictionaryParams,
        disableCondition
    );
    const defaultValue = data.filter((el) => el.id === value)[0] as ChosenSelectObject;
    const [selectedValue, setSelectedValue] = useState(defaultValue);
    const { t } = useTranslation();
    const handleSelectChange = (event: SelectChangeEvent<ChosenSelectObject>) => {
        setSelectedValue(event?.target?.value as ChosenSelectObject);
        onChange && onChange(event?.target?.value as ChosenSelectObject);
    };
    useEffect(() => {
        if (typeof value === "object") {
            const el = toJS(data?.filter((el) => el.id === value?.id)[0]);
            setSelectedValue(el as ChosenSelectObject);
            onChange && onChange(el as ChosenSelectObject);
        } else if (data && !data[0]?.hasOwnProperty("type")) {
            const el = toJS(data?.filter((el) => el.id === value)[0]);
            setSelectedValue(el as ChosenSelectObject);
        }
    }, [data]);

    // @TODO need to use real type instead of any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderMenuItem = (item: any, index: number) => {
        return (
            <MenuItem key={`dictionary-${index}-${item.code}`} value={item}>
                {translatePath ? t(`${translatePath}.${item.code}`) : item.code}
                {item.name ? "_" : ""}
                {item.name ? item.name : ""}
            </MenuItem>
        );
    };

    return (
        <>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <FormControl variant="outlined" fullWidth>
                    <Select
                        size="small"
                        fullWidth
                        error={error}
                        onChange={handleSelectChange}
                        value={selectedValue ? selectedValue : ""}
                        disabled={isDisable || (disableCondition as boolean)}
                        MenuProps={{
                            style: { height: "205px", padding: "15px" },
                        }}
                        data-test-id={`select:${testFieldName ?? fieldName}`}>
                        {data.map(renderMenuItem)}
                    </Select>
                </FormControl>
            )}
        </>
    );
};

export default SelectOfDictionaryForm;
