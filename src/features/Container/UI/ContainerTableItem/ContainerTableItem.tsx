import { observer } from "mobx-react";
import { useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { usePermissionService } from "src/shared/services/PermissionService";
import { BaseTabs } from "src/shared/UI/BaseTabs";
import { ICard } from "src/shared/UI/iCard";
import { containerStore } from "../../store";
import { containersTableItemConfiguration } from "./tabsConfiguration";
import { DownloadIcon } from "src/assets/svg";
import { useStyles } from "./styles";
import { Box } from "@mui/material";
import { Button } from "src/shared/UI/Button";
import { useFileDownload } from "src/shared/hooks/useFileDownload";

const ContainerTableItem = observer((): JSX.Element => {
    const { id } = useParams();
    const { getAccessGrantedObjects } = usePermissionService();
    const classes = useStyles();

    const { fetchFile, ref, url } = useFileDownload({
        apiDefinition: containerStore.getContainerInfoXlsx,
        getFileName: () => `ContainerInfo-${id}`,
        additionalBlobData: { type: "xlsx" },
        beforeDownloadCallback: containerStore.beforeDownloadCallback,
        successEndCallback: () => {
            console.log("successEndCallback");
        },
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
            <Button onClick={fetchFile} className={classes.button}>
                <DownloadIcon />
            </Button>
            <a href={url} download ref={ref}></a>
            <ICard cardSize={12} col={10}>
                <BaseTabs configuration={configuration} navigateUseSearchQuery={true} />
            </ICard>
        </Box>
    );
});

export default ContainerTableItem;
