/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from "react";
import { GridRenderEditCellParams, useGridApiContext } from "@mui/x-data-grid";
import { CircularProgress, FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useTranslation } from "react-i18next";
import { DictionaryParams } from "src/shared/hooks/useDictionary/types";
import { DictionaryType, useDictionary } from "../../hooks/useDictionary";

interface SelectOfDictionaryProps extends GridRenderEditCellParams {
    dictionaryType?: DictionaryType | null;
    dictionaryParams?: DictionaryParams;
    isTranslate?: boolean;
    translatePath?: string;
    isDisable?: boolean;
    editValue?: object | string;
    returnCode?: boolean;
}

const SelectOfDictionary: FC<SelectOfDictionaryProps> = (props) => {
    const {
        id,
        value,
        field,
        row,
        error,
        isDisableCondition,
        // TODO dictionaryType is superfluous, redo to use only dictionary Params
        dictionaryParams,
        dictionaryType,
        editValue,
        returnCode,
    } = props;
    const { data, isLoading, getRecord, isDisable } = useDictionary(
        (dictionaryParams || { type: dictionaryType }) as DictionaryParams,
        !!isDisableCondition
    );
    const apiRef = useGridApiContext();
    const { t } = useTranslation();

    useEffect(() => {
        if (editValue) {
            apiRef.current.setEditCellValue({ id, field, value: editValue });
            apiRef.current.updateRows([{ ...row, field: editValue }]);
        }
    }, [editValue]);

    const handleValueChange = (event: SelectChangeEvent) => {
        const newValueId = event.target.value;
        const value = returnCode ? newValueId : getRecord(newValueId);
        // update value for select
        // apiRef.current.setEditCellValue({ id, field, value: newValueId });
        apiRef.current.setEditCellValue({ id, field, value: value });
        // update data in grid
        apiRef.current.updateRows([{ ...row, field: value }]);
    };

    // @TODO need to use real type instead of any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderMenuItem = (item: any, index: number) => {
        return (
            <MenuItem
                key={`dictionary-${index}-${item.code}`}
                value={returnCode ? item.code : item.id}>
                {item.name
                    ? props.isTranslate
                        ? `${props.translatePath}${item.code}_${props.translatePath}${item.name}`
                        : `${item.code}_${item.name}`
                    : props.isTranslate
                      ? t(`${props.translatePath}${item.code}`)
                      : `${item.code}`}
            </MenuItem>
        );
    };

    return (
        <FormControl fullWidth>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <Select
                    error={error}
                    size="small"
                    value={value.id}
                    onChange={handleValueChange}
                    displayEmpty
                    disabled={!!isDisableCondition || isDisable}>
                    {data.map(renderMenuItem)}
                </Select>
            )}
        </FormControl>
    );
};

export default SelectOfDictionary;
