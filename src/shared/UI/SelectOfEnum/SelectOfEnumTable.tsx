import { FC } from "react";
import {
    GridColTypeDef,
    GridRenderEditCellParams,
    GridRowId,
    useGridApiContext,
    GridRowModel,
} from "@mui/x-data-grid";
import { ValueOption } from "src/shared/hooks/useDictionary/config";
import { DictionaryParams } from "src/shared/hooks/useDictionary/types";
import { getTranslatedValue } from "./utils/utils";
import SelectOfEnum from "./SelectOfEnum";

import { GetSelectOfEnumProps, SelectOfEnumProps } from "./types";

// TODO: move somewhere else this function
export const getSelectOfEnum = (props: GetSelectOfEnumProps): GridColTypeDef => {
    const { translatePath, dictionaryType, options } = props;

    return {
        renderEditCell: (params: GridRenderEditCellParams) => (
            <SelectOfEnumTable
                {...params}
                options={options}
                dictionaryType={dictionaryType}
                translatePath={translatePath}
            />
        ),
        valueFormatter: (params) =>
            getTranslatedValue((params as { value: string })?.value, translatePath),
    };
};

interface SelectOfEnumTableProps extends Omit<SelectOfEnumProps, "onChange"> {
    id: GridRowId;
    row: GridRowModel;
    field: string;
    dictionaryParams?: DictionaryParams;
    translatePath?: string;
}

const SelectOfEnumTable: FC<SelectOfEnumTableProps> = (props) => {
    const { field, id, row, dictionaryParams, ...rest } = props;

    const apiRef = useGridApiContext();

    const onChange = (value: string | ValueOption) => {
        apiRef.current.setEditCellValue({ id, field, value });
        apiRef.current.updateRows([{ ...row, [field]: value }]);
    };

    return (
        <SelectOfEnum
            onChange={onChange}
            fieldName={field}
            dictionaryParams={dictionaryParams as DictionaryParams}
            {...rest}
        />
    );
};

export default SelectOfEnumTable;
