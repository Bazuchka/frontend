import LocalPrintshop from "@mui/icons-material/LocalPrintshop";
import { LoadingButton } from "@mui/lab";
import { Grid, useTheme } from "@mui/material";
import { t } from "i18next";
import { observer } from "mobx-react";
import { Instance } from "mobx-state-tree";
import { FC } from "react";
import { IFormGroup } from "src/shared/UI/iFormGroup";
import { permissionService } from "src/shared/services/PermissionService";
import { PermissionLevel, PermissionType } from "src/shared/services/PermissionService/types";
import { default as ReceivingOrderStore } from "../../store/ReceivingOrderStore/ReceivingOrderStore";
import useStyles from "./styles";
import { useFileDownload } from "src/shared/hooks/useFileDownload";

interface ReceivingOrderPrintProps {
    store: Instance<typeof ReceivingOrderStore>;
    isWarehouse: boolean;
}

const ReceivingOrderPrint: FC<ReceivingOrderPrintProps> = observer(
    ({ store, isWarehouse: isWharehouse }): JSX.Element => {
        const theme = useTheme();
        const classes = useStyles({ theme });

        const { fetchFile } = useFileDownload({
            apiDefinition: store.getReceivingOrderMx1Print,
            getFileName: () => `Акт приема-передачи (MX-1) по заявке ${store.current?.code}`,
            additionalBlobData: store.getAdditionalBlobData(),
            beforeDownloadCallback: store.beforeDownloadCallback,
            successEndCallback: store.onSuccesLoadBlobData,
            onError: store.onErrorDownload,
            onFinally: store.onFinallyDownload,
        });

        return (
            <>
                <IFormGroup
                    key={"print_group"}
                    label={t("ReceivingOrder:groups.printDocuments")}
                    className={classes.group}
                    fullHeight={false}>
                    {isWharehouse && (
                        <Grid container xs={3}>
                            <Grid xs={8}>
                                <label data-test-id={`label:print_mx1`} className={classes.label}>
                                    {t("ReceivingOrder:actions.printMxForm")}
                                </label>
                            </Grid>
                            <Grid xs={4}>
                                <LoadingButton
                                    disabled={
                                        store.state.isFetching ||
                                        !permissionService.check({
                                            path: "ReceivingOrder.Report.MX1",
                                            level: PermissionLevel.READ,
                                            type: PermissionType.BUTTON,
                                        })
                                    }
                                    className={classes.button}
                                    loading={store.state.isFetching}
                                    onClick={fetchFile}>
                                    {!store.state.isFetching && (
                                        <LocalPrintshop
                                            color="secondary"
                                            sx={{ width: "20px", height: "20px" }}
                                        />
                                    )}
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    )}
                </IFormGroup>
            </>
        );
    }
);

export default ReceivingOrderPrint;
