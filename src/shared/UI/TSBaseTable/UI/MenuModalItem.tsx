import { ListItem, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import { t } from "i18next";
import { ColumnFormatType } from "src/shared/UI/TSBaseTable/types/columnFormatTypes";
import useStyles from "src/shared/UI/TSBaseTable/UI/styles";

export interface IMenuModalItemProps {
    title: string;
    onClickHandler: () => void;
    icon: JSX.Element;
    meta?: Record<string, string>;
}

export const MenuModalItem = (props: IMenuModalItemProps): JSX.Element => {
    const { onClickHandler, title, icon, meta } = props;
    const theme = useTheme();
    const classes = useStyles({ theme });

    if (title === t("Shared:filter")) {
        if (
            meta?.format &&
            meta.format !== ColumnFormatType.STRING &&
            meta.format !== ColumnFormatType.BOOLEAN
        ) {
            return <></>;
        }
        if (!meta?.format && !meta?.filterable) {
            return <></>;
        }
    }
    return (
        <ListItem
            key={title}
            disableGutters
            onClick={onClickHandler}
            className={classes.menuModalItem}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{title}</ListItemText>
        </ListItem>
    );
};
