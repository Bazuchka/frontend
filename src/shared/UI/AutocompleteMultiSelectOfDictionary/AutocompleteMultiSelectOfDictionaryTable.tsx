import { FC } from "react";

import { GridRowId, GridRowModel, useGridApiContext } from "@mui/x-data-grid";
import { DictionaryParams } from "src/shared/hooks/useDictionary/types";
import { IdCode } from "src/shared/types";
import { AutocompleteMultiSelectOfDictionary } from "src/shared/UI/AutocompleteMultiSelectOfDictionary/AutocompleteMultiSelectOfDictionary";

interface AutocompleteMultiSelectOfDictionaryTableProps {
    id: GridRowId;
    row: GridRowModel;
    field: string;
    dictionaryParams: DictionaryParams;
    translatePath?: string;
    value?: IdCode[];
    defaultValue?: IdCode[];
    error?: boolean;
    isDisable?: boolean;
}

export const AutocompleteMultiSelectOfDictionaryTable: FC<
    AutocompleteMultiSelectOfDictionaryTableProps
> = (props) => {
    const {
        id,
        row,
        field,
        dictionaryParams,
        translatePath,
        value,
        defaultValue,
        error,
        isDisable,
    } = props;
    const apiRef = useGridApiContext();

    const handleChange = (value: object[]) => {
        apiRef.current.setEditCellValue({ id, field, value: value });
        apiRef.current.updateRows([{ ...row, [field]: [...value] }]);
    };

    return (
        <AutocompleteMultiSelectOfDictionary
            key={JSON.stringify(value)}
            fieldName={field}
            dictionaryParams={dictionaryParams}
            translatePath={translatePath}
            value={value}
            defaultValue={defaultValue}
            error={error}
            isDisable={isDisable}
            onSelectValue={handleChange}
        />
    );
};
