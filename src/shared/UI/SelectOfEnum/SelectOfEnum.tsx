import { FC } from "react";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { ValueOption, enumsConfig } from "src/shared/hooks/useDictionary/config";
import { DictionaryParams } from "src/shared/hooks/useDictionary/types";
import { addEmptyValue, getTranslatedValue } from "./utils/utils";
import { styles } from "./style";
import { SelectOfEnumProps } from "./types";

const SelectOfEnum: FC<SelectOfEnumProps> = (props) => {
    const {
        error,
        isDisable,
        dictionaryParams,
        dictionaryType,
        translatePath,
        translate,
        value,
        onChange,
        options,
        withEmptyValue,
        withClearButton,
        fieldName,
        testFieldName,
    } = props;

    const params = (dictionaryParams || {
        type: dictionaryType,
    }) as DictionaryParams;

    // TODO: This component should not receive "options" props from external sources.
    const rawData = options ?? enumsConfig(params);

    const data = withEmptyValue ? addEmptyValue(rawData) : rawData;

    const handleValueSelect = ({ target: { value } }: SelectChangeEvent<string>) =>
        onChange && onChange(value);

    const renderMenuItem = (item: ValueOption | string, index: number) => {
        const key: string = (item as ValueOption).value || (item as string);
        const option: string = translate ? translate(key) : getTranslatedValue(key, translatePath);

        return (
            <MenuItem style={{ minHeight: "36px" }} key={`enum-${index}-${key}`} value={key}>
                {option}
            </MenuItem>
        );
    };

    const handleClearClick = () => {
        onChange("");
    };

    return (
        <Select
            className="select"
            size="small"
            error={error}
            fullWidth
            onChange={handleValueSelect}
            value={value}
            disabled={isDisable}
            MenuProps={styles}
            endAdornment={
                withClearButton && (
                    <IconButton onClick={handleClearClick} sx={{ marginRight: 1 }}>
                        <CloseIcon color="secondary" sx={{ width: "20px", height: "20px" }} />
                    </IconButton>
                )
            }
            data-test-id={`value:${testFieldName ?? fieldName}`}>
            {data.map(renderMenuItem)}
        </Select>
    );
};

export default SelectOfEnum;
