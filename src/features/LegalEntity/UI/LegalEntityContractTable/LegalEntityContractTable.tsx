import { useReactTable } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { FunctionComponent, useEffect, useMemo } from "react";
import { DEFAULT_TANSTACK_CONFIG } from "src/shared/configs/table.conf";
import { TSBaseTableUI } from "src/shared/UI/TSBaseTable/TSBaseTableUI";
import { Footer } from "src/shared/UI/TSBaseTable/UI/Footer";
import { PaginationProps } from "src/shared/UI/TSBaseTable/UI/Pagination";
import { ContractStore } from "../../store/ContractStore/ContractStore";
import { getColumns } from "./configs";

interface LegalEntityContractTableProps {
    contractStore: Instance<typeof ContractStore>;
    legalEntityId: string;
}

const LegalEntityContractTable: FunctionComponent<LegalEntityContractTableProps> = observer(
    ({ contractStore, legalEntityId }) => {
        const columns = useMemo(() => getColumns(), []);

        useEffect(() => {
            contractStore?.fetch({ legalEntity: { id: legalEntityId } });
        }, [contractStore, legalEntityId]);

        const pagination: PaginationProps = {
            page: contractStore.pagination.page,
            size: contractStore.pagination.size,
            totalElements: contractStore.pagination.total,
            disabled: contractStore.state.isLoading,
            onChange: contractStore.pagination.setUserPagination,
        };

        const table = useReactTable({
            ...DEFAULT_TANSTACK_CONFIG,
            columns,
            data: contractStore.dataArray,
        });

        return (
            <TSBaseTableUI
                table={table}
                sorting={contractStore.sorting}
                isLoading={contractStore.state.isLoading}
                footer={() => <Footer paginator={pagination} />}
            />
        );
    }
);

export default LegalEntityContractTable;
