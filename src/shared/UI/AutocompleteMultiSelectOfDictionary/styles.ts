import { createUseStyles } from "react-jss";

export const useMenuStyles = createUseStyles(() => ({
    autocomplete: {
        "& .MuiAutocomplete-inputRoot": {
            display: "flex",
            flexWrap: "nowrap",
        },
    },
}));
