import { Box } from "@mui/material";
import { observer } from "mobx-react";
import { useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { DownloadIcon } from "src/assets/svg";
import { useFileDownload } from "src/shared/hooks/useFileDownload";
import { usePermissionService } from "src/shared/services/PermissionService";
import { BaseTabs } from "src/shared/UI/BaseTabs";
import { Button } from "src/shared/UI/Button";
import { ICard } from "src/shared/UI/iCard";
import { containerStore } from "../../store";
import { useStyles } from "./styles";
import { containersTableItemConfiguration } from "./tabsConfiguration";

const ContainerTableItem = observer((): JSX.Element => {
    const { id } = useParams();
    const { getAccessGrantedObjects } = usePermissionService();
    const classes = useStyles();

    const { fetchFile, ref } = useFileDownload({
        apiDefinition: containerStore.getContainerInfoXlsx,
        getFileName: () => `ContainerInfo-${id}.xlsx`,
        additionalBlobData: {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
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
            <a ref={ref}></a>
            <ICard cardSize={12} col={10}>
                <BaseTabs configuration={configuration} navigateUseSearchQuery={true} />
            </ICard>
        </Box>
    );
});

export default ContainerTableItem;
