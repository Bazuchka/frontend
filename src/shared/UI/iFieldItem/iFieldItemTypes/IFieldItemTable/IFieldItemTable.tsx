import { FunctionComponent } from "react";
import { useIFieldStyles } from "../../styles";
import { Grid, useTheme } from "@mui/material";

interface IFieldItemTableProps {
    tableComponent: React.ReactNode;
}

const IFieldItemTable: FunctionComponent<IFieldItemTableProps> = (props) => {
    const theme = useTheme();
    const classes = useIFieldStyles({ theme });

    return (
        <Grid className={classes.field} container columns={12} xs={12}>
            {props.tableComponent}
        </Grid>
    );
};

export default IFieldItemTable;
