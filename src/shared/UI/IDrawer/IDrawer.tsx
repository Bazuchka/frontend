import CloseIcon from "@mui/icons-material/Close";
import { Drawer, DrawerProps, IconButton } from "@mui/material";
import { FunctionComponent } from "react";
import { useStyles } from "./styles";

interface IIDrawerProps extends DrawerProps {
    onCloseIconClick?: () => void;
    cssClasses?: string;
}

const IDrawer: FunctionComponent<IIDrawerProps> = (props) => {
    const classes = useStyles();
    return (
        <Drawer {...props} classes={{ paper: props.cssClasses || classes.paper }} anchor="right">
            <IconButton
                size="large"
                className={classes.closeIcon}
                onClick={() => props.onCloseIconClick?.()}>
                <CloseIcon />
            </IconButton>
            {props.children}
        </Drawer>
    );
};

export default IDrawer;
