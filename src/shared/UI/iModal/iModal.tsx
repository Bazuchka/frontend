import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { FC, ReactElement } from "react";

import { useStyles } from "./styles";
import { DialogAction } from "./types";

export interface IModalProps {
    open: boolean;
    title?: ReactElement | string;
    onClose?: () => void;
    contentText?: string;
    content?: ReactElement;
    dialogActions?: DialogAction[];
    dialogButtons?: JSX.Element[];
    settings?: object;
    selectValues?: string[];
    selectLabel?: string;
}

const IModal: FC<IModalProps> = (props) => {
    const {
        open,
        title,
        contentText,
        content,
        dialogActions = [],
        dialogButtons = [],
        settings,
    } = props;
    const defaultSetting = { fullWidth: true, ...settings };
    const classes = useStyles();

    const renderActions = (action: DialogAction) => {
        return (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            <Button
                key={action.label}
                type={action.type ? action.type : "button"}
                form={action.form ? action.form : null}
                onClick={action.onClick}>
                {action.label}
            </Button>
        );
    };

    return (
        <Dialog {...defaultSetting} open={open}>
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContentText className={classes.textContent}>{contentText}</DialogContentText>
            <DialogContent>{content}</DialogContent>
            {dialogActions && dialogActions.length > 0 && (
                <DialogActions>{dialogActions.map(renderActions)}</DialogActions>
            )}
            {dialogButtons && dialogButtons.length > 0 && (
                <DialogActions>{dialogButtons}</DialogActions>
            )}
        </Dialog>
    );
};

export default IModal;
