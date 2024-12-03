import { SvgIcon } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { CheckIcon } from "src/assets/svg";
import { WithGridRowId } from "src/shared/UI/TSBaseTable/types";
import { IUnitOfMeasure } from "../../store/UnitOfMeasureStore";

const columnHelper = createColumnHelper<WithGridRowId<IUnitOfMeasure>>();

export const getColumns = () => {
    return [
        columnHelper.accessor("codeOkei", {
            cell: (params) => params.getValue(),
            header: t("UnitOfMeasure:properties.codeOkei"),
        }),
        columnHelper.accessor("unitOfMeasureType", {
            cell: (params) => t("UnitOfMeasure:types." + params.getValue()),
            header: t("UnitOfMeasure:properties.unitOfMeasureType"),
        }),
        columnHelper.accessor("code", {
            cell: (params) => params.getValue(),
            header: t("UnitOfMeasure:properties.code"),
        }),
        columnHelper.accessor("name", {
            cell: (params) => params.getValue(),
            header: t("UnitOfMeasure:properties.name"),
        }),
        columnHelper.accessor("active", {
            cell: (params) => {
                if (params.getValue()) {
                    return <SvgIcon component={CheckIcon} />;
                }
            },
            header: t("UnitOfMeasure:properties.active"),
        }),
    ];
};
