/* eslint-disable react-hooks/exhaustive-deps */
import { SelectChangeEvent, TextField, AutocompleteRenderInputParams } from "@mui/material";
import InputMask from "react-input-mask";
import { FC, useEffect } from "react";
import { GridRenderEditCellParams, useGridApiContext } from "@mui/x-data-grid";

interface IValidateMaskProps extends GridRenderEditCellParams {
    mask: string | Array<string | RegExp>;
    pattern: RegExp;
    placeholder: string;
    maskChar?: null; //library feature null = "", undefined = "_"
    editValue?: string;
    params?: AutocompleteRenderInputParams;
    type?: "string" | "IdCode";
}

const MaskedInputTable: FC<IValidateMaskProps> = ({
    placeholder,
    mask,
    maskChar,
    id,
    value,
    field,
    row,
    error,
    editValue,
    params,
    type = "string",
}) => {
    const apiRef = useGridApiContext();
    const { disabled, ...rest } = params ?? {};

    useEffect(() => {
        if (editValue) {
            apiRef.current.setEditCellValue({ id, field, value: editValue });
            apiRef.current.updateRows([{ ...row, field: editValue }]);
        }
    }, [editValue]);

    const handleValueChange = (event: SelectChangeEvent) => {
        const value = event.target.value;

        const formValue = type === "IdCode" ? { code: value } : value;
        apiRef.current.setEditCellValue({ id, field, value: formValue });
        apiRef.current.updateRows([{ ...row, field: formValue }]);
    };
    return (
        <InputMask
            mask={mask as Array<string | RegExp>}
            placeholder={placeholder}
            disabled={disabled}
            maskPlaceholder={maskChar}
            onChange={handleValueChange}>
            <TextField
                size={"small"}
                defaultValue={value?.code ?? value}
                error={error}
                sx={{
                    width: "100%",
                    "& :focus": {
                        background: "#F0EEF3",
                    },
                    "& .MuiInputBase-input": {
                        fontSize: "14px",
                    },
                }}
                {...rest}
            />
        </InputMask>
    );
};

export default MaskedInputTable;
