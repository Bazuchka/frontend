import { useReactTable } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { FunctionComponent, useEffect, useMemo } from "react";
import { TSBaseTableUI } from "src/shared/UI/TSBaseTable/TSBaseTableUI";
import { Footer } from "src/shared/UI/TSBaseTable/UI/Footer";
import { PaginationProps } from "src/shared/UI/TSBaseTable/UI/Pagination";
import { ICard } from "src/shared/UI/iCard";
import { DEFAULT_TANSTACK_CONFIG } from "src/shared/configs/table.conf";
import unitOfMeasureStore from "../../store/UnitOfMeasureStore";
import { getColumns } from "./configs";

interface UnitOfMeasureTableProps {}

const UnitOfMeasureTable: FunctionComponent<UnitOfMeasureTableProps> = observer(() => {
    const columns = useMemo(() => getColumns(), []);
    useEffect(() => {
        unitOfMeasureStore.fetch();
    }, []);

    const pagination: PaginationProps = {
        page: unitOfMeasureStore.filters.page,
        size: unitOfMeasureStore.filters.size,
        totalElements: unitOfMeasureStore.filters.total,
        disabled: unitOfMeasureStore.state.isLoading,
        onChange: unitOfMeasureStore.filters.setUserPagination,
    };

    const table = useReactTable({
        ...DEFAULT_TANSTACK_CONFIG,
        columns,
        data: unitOfMeasureStore.dataArray,
    });

    return (
        <ICard cardSize={12} col={10}>
            <TSBaseTableUI
                table={table}
                isLoading={unitOfMeasureStore.state.isLoading}
                footer={() => <Footer paginator={pagination} />}
            />
        </ICard>
    );
});

export default UnitOfMeasureTable;
