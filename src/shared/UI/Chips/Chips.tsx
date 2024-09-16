import { Autocomplete, TextField } from "@mui/material";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { AlisChip } from "./Chip";

interface ChipsProps {
    value?: string[];
    onChange: (data: string[]) => void;
    invalid?: boolean;
}

const Chips: FunctionComponent<ChipsProps> = ({ value, onChange, invalid }) => {
    const { t } = useTranslation();
    return (
        <Autocomplete
            clearIcon={false}
            options={[]}
            value={value ?? []}
            freeSolo
            size="small"
            multiple
            sx={{ width: "100%" }}
            noOptionsText={t("Shared:noOptions")}
            loadingText={t("Shared:loading")}
            openText={t("Shared:open")}
            closeText={t("Shared:close")}
            clearText={t("Shared:clear")}
            renderTags={(value, props) =>
                value.map((option, index) => (
                    <AlisChip label={option as string} {...props({ index })} key={index} />
                ))
            }
            onChange={(_, data) => onChange(data)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder={value && value.length > 0 ? "" : t("Shared:chipPlaceholder")}
                    style={{ minWidth: 100 }}
                    error={invalid}
                />
            )}
        />
    );
};

export default Chips;
