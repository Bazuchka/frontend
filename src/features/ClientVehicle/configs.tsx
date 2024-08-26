import { SvgIcon } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { CheckIcon } from "src/assets/svg";
import { getValueForTextField } from "src/shared/helpers";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { IClientVehicle } from "./store/ClientVehicleStore";

const columnHelper = createColumnHelper<WithGridRowId<IClientVehicle>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("code", {
            cell: (params) => params.getValue(),
            header: t("ClientVehicle:properties.code"),
        }),
        columnHelper.accessor("client", {
            cell: getValueForTextField("code"),
            header: t("ClientVehicle:properties.client"),
        }),
        columnHelper.accessor("vehicleType", {
            cell: getValueForTextField("code"),
            header: t("ClientVehicle:properties.vehicleType"),
        }),
        columnHelper.accessor("vehicleBrand", {
            cell: getValueForTextField("code"),
            header: t("ClientVehicle:properties.vehicleBrand"),
        }),
        columnHelper.accessor("refrigerator", {
            cell: (params) => {
                if (params.getValue()) {
                    return <SvgIcon component={CheckIcon} />;
                }
            },
            header: t("ClientVehicle:properties.refrigerator"),
        }),
        columnHelper.accessor("loadingType", {
            cell: getValueForTextField("code"),
            header: t("ClientVehicle:properties.loadingType"),
        }),
        columnHelper.accessor("active", {
            cell: (params) => {
                if (params.getValue()) {
                    return <SvgIcon component={CheckIcon} />;
                }
            },
            header: t("ClientVehicle:properties.active"),
        }),
    ];
};
