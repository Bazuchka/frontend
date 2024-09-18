import { observer } from "mobx-react";
import LocalPrintshop from "@mui/icons-material/LocalPrintshop";
import { FC } from "react";
import { default as ReceivingOrderStore } from "../../store/ShippingOrderStore/ShippingOrderStore";
import { Grid, useTheme } from "@mui/material";
import { t } from "i18next";
import useStyles from "./styles";
import { LoadingButton } from "@mui/lab";
import { Instance } from "mobx-state-tree";
import { IFormGroup } from "src/shared/UI/iFormGroup";
import { PermissionLevel, PermissionType } from "src/shared/services/PermissionService/types";
import { permissionService } from "src/shared/services/PermissionService";

interface ShippingOrderPrintProps {
    store: Instance<typeof ReceivingOrderStore>;
}

const ShippingOrderPrint: FC<ShippingOrderPrintProps> = observer(({ store }): JSX.Element => {
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
                    <Grid container xs={3}>
                        <Grid xs={7}>
                            <label data-test-id={`label:print_mx1`} className={classes.label}>
                                {t("ShippingOrder:actions.printMx3Form")}
                            </label>
                        </Grid>
                        <Grid xs={5}>
                            <LoadingButton
                                disabled={
                                    store.state.isFetching ||
                                    !permissionService.check({
                                        path: "ShippingOrder.Report.MX3",
                                        level: PermissionLevel.READ,
                                        type: PermissionType.BUTTON,
                                    })
                                }
                                className={classes.button}
                                loading={store.state.isFetching}
                                onClick={() => store.getShippingOrderMx3Print()}>
                                {!store.state.isFetching && (
                                    <LocalPrintshop
                                        color="secondary"
                                        sx={{ width: "20px", height: "20px" }}
                                    />
                                )}
                            </LoadingButton>
                        </Grid>
                    </Grid>
                    <Grid container xs={3}>
                        <Grid xs={7}>
                            <label data-test-id={`label:print_th`} className={classes.label}>
                                {t("ShippingOrder:actions.printThForm")}
                            </label>
                        </Grid>
                        <Grid xs={5}>
                            <LoadingButton
                                disabled={
                                    store.state.isFetching ||
                                    !permissionService.check({
                                        path: "ShippingOrder.Report.TH",
                                        level: PermissionLevel.READ,
                                        type: PermissionType.BUTTON,
                                    })
                                }
                                className={classes.button}
                                loading={store.state.isFetching}
                                onClick={() => store.getShippingOrderTHPrint()}>
                                {!store.state.isFetching && (
                                    <LocalPrintshop
                                        color="secondary"
                                        sx={{ width: "20px", height: "20px" }}
                                    />
                                )}
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Grid>
            </IFormGroup>
        </>
    );
});

export default ShippingOrderPrint;
