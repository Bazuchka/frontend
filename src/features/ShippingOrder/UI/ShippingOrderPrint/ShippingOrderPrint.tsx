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
import { default as ReceivingOrderStore } from "../../store/ShippingOrderStore/ShippingOrderStore";
import useStyles from "./styles";
import { useFileDownload } from "src/shared/hooks/useFileDownload";

interface ShippingOrderPrintProps {
    store: Instance<typeof ReceivingOrderStore>;
    isWarehouse: boolean;
    isVehicle: boolean;
}

const Mx3DownloadButton = ({
    store,
    classes,
}: {
    store: Instance<typeof ReceivingOrderStore>;
    classes: string;
}) => {
    const { fetchFile } = useFileDownload({
        apiDefinition: store.getShippingOrderMx3Print,
        getFileName: () => `Акт о возврате (MX-3) по заявке ${store.current?.code}`,
        additionalBlobData: store.getAdditionalBlobData(),
        beforeDownloadCallback: store.beforeDownloadCallback,
        successEndCallback: store.onSuccesLoadBlobData,
        onError: store.onErrorDownload,
        onFinally: store.onFinallyDownload,
    });

    return (
        <LoadingButton
            disabled={
                store.state.isFetching ||
                !permissionService.check({
                    path: "ShippingOrder.Report.MX3",
                    level: PermissionLevel.READ,
                    type: PermissionType.BUTTON,
                })
            }
            className={classes}
            loading={store.state.isFetching}
            onClick={fetchFile}>
            {!store.state.isFetching && (
                <LocalPrintshop color="secondary" sx={{ width: "20px", height: "20px" }} />
            )}
        </LoadingButton>
    );
};

const THDownloadButton = ({
    store,
    classes,
}: {
    store: Instance<typeof ReceivingOrderStore>;
    classes: string;
}) => {
    const { fetchFile } = useFileDownload({
        apiDefinition: store.getShippingOrderTHPrint,
        getFileName: () => `Транспортная накладная по заявке ${store.current?.code}`,
        additionalBlobData: store.getAdditionalBlobData(),
        beforeDownloadCallback: store.beforeDownloadCallback,
        successEndCallback: store.onSuccesLoadBlobData,
        onError: store.onErrorDownload,
        onFinally: store.onFinallyDownload,
    });

    return (
        <LoadingButton
            disabled={
                store.state.isFetching ||
                !permissionService.check({
                    path: "ShippingOrder.Report.TH",
                    level: PermissionLevel.READ,
                    type: PermissionType.BUTTON,
                })
            }
            className={classes}
            loading={store.state.isFetching}
            onClick={fetchFile}>
            {!store.state.isFetching && (
                <LocalPrintshop color="secondary" sx={{ width: "20px", height: "20px" }} />
            )}
        </LoadingButton>
    );
};

const ShippingOrderPrint: FC<ShippingOrderPrintProps> = observer(
    ({ store, isWarehouse, isVehicle }): JSX.Element => {
        const theme = useTheme();
        const classes = useStyles({ theme });

        return (
            <>
                <IFormGroup
                    key={"print_group"}
                    label={t("ShippingOrder:groups.printDocuments")}
                    className={classes.group}
                    fullHeight={false}>
                    <Grid container>
                        {isWarehouse && (
                            <Grid container xs={3}>
                                <Grid xs={7}>
                                    <label
                                        data-test-id={`label:print_mx1`}
                                        className={classes.label}>
                                        {t("ShippingOrder:actions.printMx3Form")}
                                    </label>
                                </Grid>
                                <Grid xs={5}>
                                    <Mx3DownloadButton store={store} classes={classes.button} />
                                </Grid>
                            </Grid>
                        )}
                        {isVehicle && (
                            <Grid container xs={3}>
                                <Grid xs={7}>
                                    <label
                                        data-test-id={`label:print_th`}
                                        className={classes.label}>
                                        {t("ShippingOrder:actions.printThForm")}
                                    </label>
                                </Grid>
                                <Grid xs={5}>
                                    <THDownloadButton store={store} classes={classes.button} />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </IFormGroup>
            </>
        );
    }
);

export default ShippingOrderPrint;
