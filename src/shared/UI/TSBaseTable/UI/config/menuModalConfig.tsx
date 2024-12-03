import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import { t } from "i18next";
import { IMenuModalItemProps } from "src/shared/UI/TSBaseTable/UI/MenuModalItem";

export const menuModalConfig = (
    onColumnManagmentClickHandler: () => void,
    onFilterClickHandler: () => void
): Array<IMenuModalItemProps> => {
    return [
        {
            title: t("Shared:columnManagment"),
            onClickHandler: onColumnManagmentClickHandler,
            icon: <ViewColumnIcon />,
        },
        {
            title: t("Shared:filter"),
            onClickHandler: onFilterClickHandler,
            icon: <FilterAltIcon />,
        },
    ];
};
