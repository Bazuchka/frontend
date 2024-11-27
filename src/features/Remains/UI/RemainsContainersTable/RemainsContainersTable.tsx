import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { FunctionComponent, useEffect, useMemo } from "react";
import { remainsContainersStore } from "../../store";
import { TSBaseTableUI } from "src/shared/UI/TSBaseTable/TSBaseTableUI";
import { Footer } from "src/shared/UI/TSBaseTable/UI/Footer";
import { PaginationProps } from "src/shared/UI/TSBaseTable/UI/Pagination";
import { DEFAULT_TANSTACK_CONFIG } from "src/shared/configs/table.conf";
import { useReactTable } from "@tanstack/react-table";
import { ICard } from "src/shared/UI/iCard";
import { getColumns } from "./config";
import { Box } from "@mui/material";
import { useStyles } from "./styles";
import { useFileDownload } from "src/shared/hooks/useFileDownload";
import { TSTableDownloadButton } from "src/shared/UI/TSTableDownloadButton";
import { getNowDate } from "src/shared/helpers/dateFormatter";

interface RemainsContainersTableProps {
    store: Instance<typeof remainsContainersStore>;
}

const RemainsContainersTable: FunctionComponent<RemainsContainersTableProps> = observer(
    ({ store }) => {
        const columns = useMemo(() => getColumns(), []);
        const classes = useStyles();

        const getFileName = (): string => {
            return `Остатки контейнеров ${getNowDate()}.xlsx`;
        };

        const { fetchFile, ref } = useFileDownload({
            apiDefinition: store.getContainerRemainsInfoXlsx,
            getFileName,
            additionalBlobData: {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            },
            beforeDownloadCallback: store.beforeDownloadCallback,
            onError: store.onErrorDownload,
            onFinally: store.onFinallyDownload,
        });

        useEffect(() => {
            store?.fetch();
        }, [store]);

        const pagination: PaginationProps = {
            page: store.pagination.page,
            size: store.pagination.size,
            totalElements: store.pagination.total,
            disabled: store.state.isLoading,
            onChange: store.pagination.setUserPagination,
        };

        const table = useReactTable({
            ...DEFAULT_TANSTACK_CONFIG,
            columns,
            data: store.dataArray,
        });

        return (
            <Box component="div" className={classes.container}>
                <TSTableDownloadButton
                    id={"path_download_remains_containers"}
                    canShowButton={!store.state.isFetching}
                    fetchFileCallback={fetchFile}
                    customClasses={classes.button}
                    linkReference={ref}
                />
                <ICard cardSize={12} col={10}>
                    <TSBaseTableUI
                        table={table}
                        sorting={store.sorting}
                        isLoading={store.state.isLoading}
                        footer={() => <Footer paginator={pagination} />}
                    />
                </ICard>
            </Box>
        );
    }
);

export default RemainsContainersTable;
