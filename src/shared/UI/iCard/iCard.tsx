import { Card, CardContent, Grid, Typography, useTheme } from "@mui/material";
import { FC, ReactNode } from "react";
import { createUseStyles } from "react-jss";

interface ICardProps {
    children: ReactNode;
    header?: ReactNode | string;
    cardSize?: number;
    col?: number;
}

const useStyles = createUseStyles({
    cardContent: {
        padding: "16px !important",
        height: "100%",
    },
    cardWrapper: {
        border: "none",
        backgroundColor: "inherit",
    },
});

const ICard: FC<ICardProps> = ({ children, cardSize = 12, header, col = 10 }) => {
    const theme = useTheme();
    const classes = useStyles({ theme });
    const renderHeader = (title: ReactNode | string | undefined) => {
        if (title === undefined) {
            return <></>;
        }

        return (
            <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">{title}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        );
    };

    return (
        <Grid item xs={cardSize} sx={{ height: "100%" }}>
            <Grid item xs={col || 12} md={col || 12} sx={{ height: "100%" }}>
                <Card variant="outlined" className={classes.cardWrapper} sx={{ height: "100%" }}>
                    <CardContent className={classes.cardContent}>
                        <Grid container spacing={3} sx={{ height: "100%" }}>
                            {header && renderHeader(header)}
                            <Grid item xs={12} sx={{ height: "100%" }}>
                                <Grid item sx={{ height: "100%" }}>
                                    {children}
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ICard;
