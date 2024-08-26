import { GridRowId } from "@mui/x-data-grid";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { FunctionComponent } from "react";
import clientGoodStore from "../../../store/ClientGoodStore";
import { getColumns } from "./configs";
import { IClientDriver } from "src/features/ClientDriverTable/store/ClientDriverStore";
import { TableWithDrawer } from "src/features/TableWithDrawer";
import { GoodVariant } from "../index";
import { useStyles } from "./styles";

interface GoodVariantTableProps {}

const GoodVariantTable: FunctionComponent<GoodVariantTableProps> = observer(() => {
    const classes = useStyles();

    const fieldOptions = {
        client: {
            value: clientGoodStore.current?.client,
        },
        clientGood: {
            value: {
                id: clientGoodStore.current?.id,
                code: clientGoodStore.current?.code,
            },
        },
    };

    return (
        <TableWithDrawer
            cssClasses={classes.variant_paper as string}
            withoutCard={true}
            getColumns={getColumns as () => ColumnDef<{ id: GridRowId }, IClientDriver>[]}
            permissionPath="ClientGood"
            fetchParams={{
                client: {
                    id: clientGoodStore.current?.client?.id,
                },
                clientGood: {
                    id: clientGoodStore.current?.id,
                },
            }}
            store={clientGoodStore.current!.variants}>
            {(props) => (
                <GoodVariant
                    {...props}
                    store={clientGoodStore.current!.variants}
                    fieldOptions={fieldOptions}
                />
            )}
        </TableWithDrawer>
    );
});

export default GoodVariantTable;
