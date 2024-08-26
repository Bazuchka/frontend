import { observer } from "mobx-react";
import { t } from "i18next";
import { FC, JSX, useEffect } from "react";
import { BaseTabs } from "src/shared/UI/BaseTabs";
import { usePermissionService } from "src/shared/services/PermissionService";
import { goodVariantConfiguration } from "./tabsConfiguration";
import { Typography } from "@mui/material";
import { IDrawerForm } from "src/shared/hooks/useDrawerForm";

interface GoodVariantProps extends IDrawerForm {}

const GoodVariant: FC<GoodVariantProps> = observer(
    ({ id, store, fieldOptions, onClose }): JSX.Element => {
        const { getAccessGrantedObjects } = usePermissionService();

        useEffect(() => {
            store.setCurrent(id);
            return () => {
                store.setCurrent(null);
            };
        }, [id, store]);

        const configuration = {
            items: getAccessGrantedObjects(
                goodVariantConfiguration(!id, store, fieldOptions, id, onClose).items
            ),
        };

        return (
            <>
                <Typography variant="h4">
                    {store.current?.code ?? `${t("Shared:menu.new.masculine")}*`} (
                    {t("GoodVariant:drawerHeader")})
                </Typography>
                <BaseTabs tabQueryName={"variant_tab"} configuration={configuration} />
            </>
        );
    }
);

export default GoodVariant;
