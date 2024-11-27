import { Box } from "@mui/material";
import { observer } from "mobx-react";
import { useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { useFileDownload } from "src/shared/hooks/useFileDownload";
import { usePermissionService } from "src/shared/services/PermissionService";
import { BaseTabs } from "src/shared/UI/BaseTabs";
import { ICard } from "src/shared/UI/iCard";
import { containerStore } from "../../store";
import { useStyles } from "./styles";
import { containersTableItemConfiguration } from "./tabsConfiguration";
import { TSTableDownloadButton } from "src/shared/UI/TSTableDownloadButton";
import { getNowDate } from "src/shared/helpers/dateFormatter";

const ContainerTableItem = observer((): JSX.Element => {
    const { id } = useParams();
    const { getAccessGrantedObjects } = usePermissionService();
    const classes = useStyles();

    const getFileName = (): string => {
        return `Контейнер №${containerStore.current?.code} ${getNowDate()}.xlsx`;
    };

    const { fetchFile, ref } = useFileDownload({
        apiDefinition: containerStore.getContainerInfoXlsx,
        getFileName,
        additionalBlobData: {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
        beforeDownloadCallback: containerStore.beforeDownloadCallback,
        onError: containerStore.onErrorDownload,
        onFinally: containerStore.onFinallyDownload,
    });

    useLayoutEffect(() => {
        containerStore.setCurrent(id);

        return () => {
            containerStore.setCurrent(null);
        };
    }, [id]);

    const configuration = {
        items: getAccessGrantedObjects(containersTableItemConfiguration().items),
    };

    return (
        <Box component="div" className={classes.container}>
            <TSTableDownloadButton
                id={"path_download_container_item_info"}
                canShowButton={!containerStore.state.isFetching}
                fetchFileCallback={fetchFile}
                customClasses={classes.button}
                linkReference={ref}
            />
            <ICard cardSize={12} col={10}>
                <BaseTabs configuration={configuration} navigateUseSearchQuery={true} />
            </ICard>
        </Box>
    );
});

export default ContainerTableItem;
