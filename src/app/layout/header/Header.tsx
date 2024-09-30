import { AppBar, Box, ButtonBase, Grid, Toolbar, useTheme } from "@mui/material";
import { observer } from "mobx-react";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { useStyles } from "src/app/layout/header/styles/styles";
import { viewStore } from "src/app/store";
import { AlertList } from "src/features/AlertList";
import { UserBar } from "src/features/User/UserBar";
import { IForeignKey } from "src/shared/entities/ForeignKey";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { AutocompleteSelectOfDictionary } from "src/shared/UI/AutocompleteSelectOfDictionary/AutocompleteSelectOfDictionary";
import { IBreadcrumbs } from "src/shared/UI/iBreadcrumbs";
import { getObjectByPath } from "src/shared/UI/iBreadcrumbs/utils";
import { menuConfiguration } from "../sidebar/menu/config/menuConfiguration";

const Header: FC = observer(() => {
    const theme = useTheme();
    const classes = useStyles({ theme });
    const { t } = useTranslation();
    const location = useLocation();

    const filtersDisabled = useMemo(() => {
        return (
            location.pathname !== "/" &&
            !getObjectByPath(menuConfiguration(viewStore.menuParams), location.pathname)?.filterable
        );
    }, [location.pathname]);

    return (
        <AppBar className={classes.appBar}>
            <AlertList />
            <Toolbar className={classes.toolbar}>
                <Box className={classes.container}>
                    <Box className={classes.logoPanel}>
                        <Box className={classes.logoWrap}>
                            <Link to="/">
                                <img src="/images/logo.png" alt="img" className={classes.logo} />
                            </Link>
                        </Box>
                    </Box>
                    <Box className={classes.leftPanel}>
                        <ButtonBase className={classes.icons}>
                            {/* <ITooltype
                                id={"mouse-over-reload"}
                                item={<CachedOutlinedIcon className={classes.icon} />}
                                label={"Shared:Reload.label"}
                            /> */}
                        </ButtonBase>
                        <IBreadcrumbs />
                    </Box>
                </Box>
                <Box className={classes.rightPanel}>
                    {/* //TODO add question mark button */}
                    <Grid
                        container
                        sx={{ width: 420, justifyContent: "space-between", marginRight: 2 }}>
                        <Grid item sx={{ background: "white", width: 200 }}>
                            <AutocompleteSelectOfDictionary
                                value={viewStore.globalFilters.client}
                                onValueChange={(value) => {
                                    viewStore.globalFilters.setClient(
                                        (value as IForeignKey) ?? undefined
                                    );
                                }}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                dictionaryParams={{
                                    type: DictionaryType.CLIENT,
                                    filter: {
                                        active: true,
                                    },
                                }}
                                placeholder={t("Shared:filters.client")}
                                isDisable={filtersDisabled}
                            />
                        </Grid>
                        <Grid item sx={{ background: "white", width: 200 }}>
                            <AutocompleteSelectOfDictionary
                                value={viewStore.globalFilters.legalEntity}
                                onValueChange={(value) => {
                                    viewStore.globalFilters.setLegalEntity(
                                        (value as IForeignKey) ?? undefined
                                    );
                                }}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                dictionaryParams={{
                                    type: DictionaryType.LEGAL_ENTITY,
                                    filter: {
                                        active: true,
                                    },
                                }}
                                placeholder={t("Shared:filters.legalEntity")}
                                isDisable={filtersDisabled}
                            />
                        </Grid>
                    </Grid>

                    <UserBar />
                </Box>
            </Toolbar>
        </AppBar>
    );
});

export default Header;
