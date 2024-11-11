import { useReactTable } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { FunctionComponent, useEffect, useMemo } from "react";

import { DEFAULT_TANSTACK_CONFIG } from "src/shared/configs/table.conf";
import { TSBaseTableUI } from "src/shared/UI/TSBaseTable/TSBaseTableUI";
import { getColumns } from "./config";
import { containerMovement } from "src/features/ContainerMovement";

interface IContainerTableItemMoveProps {
    containerId: string;
}

const ContainerTableItemMove: FunctionComponent<IContainerTableItemMoveProps> = observer(
    ({ containerId }) => {
        useEffect(() => {
            containerMovement.fetch({
                container: {
                    id: containerId,
                },
            });
        }, [containerId]);

        const columns = useMemo(() => getColumns(), []);

        const table = useReactTable({
            ...DEFAULT_TANSTACK_CONFIG,
            columns,
            data: containerMovement.dataArray,
        });

        return <TSBaseTableUI table={table} sorting={containerMovement.sorting} />;
    }
);

export default ContainerTableItemMove;
