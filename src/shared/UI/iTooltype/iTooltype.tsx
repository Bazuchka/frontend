import { FC, MouseEvent, ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Popover, Typography } from "@mui/material";
import { createUseStyles } from "react-jss";

interface ITooltypeProps {
    id: string;
    item?: ReactNode;
    children?: ReactNode;
    label: string;
    isFooterIcon?: boolean;
}

const useStyles = createUseStyles(() => ({
    typography: {
        padding: "8px",
    },
    popover: {
        pointerEvents: "none",
    },
    popoverFooter: {
        marginTop: "-32px",
    },
}));

const ITooltype: FC<ITooltypeProps> = ({
    id,
    item,
    children,
    label,
    isFooterIcon,
}): JSX.Element => {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const classes = useStyles();

    useEffect(() => {
        handlePopoverClose();
    }, [item, children]);

    const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <Typography
                aria-owns={open ? id : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}>
                {item || children}
            </Typography>
            {label && (
                <Popover
                    id={id}
                    className={`${classes.popover} ${
                        isFooterIcon ? classes.popoverFooter : undefined
                    }`}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: isFooterIcon ? "right" : "left",
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus>
                    <Typography className={classes.typography}>{t(label)}</Typography>
                </Popover>
            )}
        </>
    );
};

export default ITooltype;
