import { useReactTable } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { FunctionComponent, useEffect, useMemo } from "react";
import { DEFAULT_TANSTACK_CONFIG } from "src/shared/configs/table.conf";
import { TSBaseTableUI } from "src/shared/UI/TSBaseTable/TSBaseTableUI";
import { Footer } from "src/shared/UI/TSBaseTable/UI/Footer";
import { PaginationProps } from "src/shared/UI/TSBaseTable/UI/Pagination";
import legalEntityStore from "../../store/LegalEntityStore";
import { getColumns } from "./configs";

interface LegalEntityContractTableProps {}

const LegalEntityContractTable: FunctionComponent<LegalEntityContractTableProps> = observer(() => {
    const columns = useMemo(() => getColumns(), []);

    if (!legalEntityStore.current) {
        return null;
    }

    const contractStore = legalEntityStore.current.contracts;

    useEffect(() => {
        contractStore?.fetch({ legalEntity: { id: legalEntityStore.current!.id } });
    }, [contractStore]);

    const pagination: PaginationProps = {
        page: contractStore.filters.page,
        size: contractStore.filters.size,
        totalElements: contractStore.filters.total,
        disabled: contractStore.state.isLoading,
        onChange: contractStore.filters.setUserPagination,
    };

    const table = useReactTable({
        ...DEFAULT_TANSTACK_CONFIG,
        columns,
        data: contractStore.dataArray,
    });

    return (
        <TSBaseTableUI
            table={table}
            isLoading={legalEntityStore.state.isLoading}
            footer={() => <Footer paginator={pagination} />}
        />
    );
});

export default LegalEntityContractTable;
