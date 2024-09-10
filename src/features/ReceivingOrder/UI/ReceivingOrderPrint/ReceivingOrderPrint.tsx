import { observer } from "mobx-react";
import LocalPrintshop from "@mui/icons-material/LocalPrintshop";
import { FC } from "react";
import { default as ReceivingOrderStore } from "../../store/ReceivingOrderStore/ReceivingOrderStore";
import { Grid, useTheme } from "@mui/material";
import { t } from "i18next";
import useStyles from "./styles";
import { LoadingButton } from "@mui/lab";
import { Instance } from "mobx-state-tree";
import { IFormGroup } from "src/shared/UI/iFormGroup";
import { PermissionLevel, PermissionType } from "src/shared/services/PermissionService/types";
import { permissionService } from "src/shared/services/PermissionService";

interface ReceivingOrderPrintProps {
    store: Instance<typeof ReceivingOrderStore>;
}

const ReceivingOrderPrint: FC<ReceivingOrderPrintProps> = observer(({ store }): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles({ theme });

    return (
        <>
            <IFormGroup
                key={"print_group"}
                label={t("ReceivingOrder:groups.printDocuments")}
                className={classes.group}
                fullHeight={false}>
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
                            onClick={() => store.getReceivingOrderMx1Print()}>
                            {!store.state.isFetching && (
                                <LocalPrintshop
                                    color="secondary"
                                    sx={{ width: "20px", height: "20px" }}
                                />
                            )}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </IFormGroup>
        </>
    );
});

export default ReceivingOrderPrint;
