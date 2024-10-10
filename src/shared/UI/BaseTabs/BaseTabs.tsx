/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Tab, Tabs } from "@mui/material";
import { observer } from "mobx-react";
import React, { FC, ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { permissionService } from "src/shared/services/PermissionService";
import { PermissionLevel } from "src/shared/services/PermissionService/types";
import { TabPanel } from "./index";
import { useStyles } from "./styles";
import { TabItem, TabsConfiguration } from "./types";

interface BaseTabsProps {
    navigateUseSearchQuery?: boolean;
    configuration: TabsConfiguration;
    onTabChange?: (tabIndex: number, tab: TabItem) => void;
    isHeightFixed?: boolean;
    tabQueryName?: string;
}

const BaseTabs: FC<BaseTabsProps> = observer((props) => {
    const {
        configuration,
        onTabChange,
        isHeightFixed = true,
        navigateUseSearchQuery,
        tabQueryName = "tab",
    } = props;

    const [searchParams, setSearchParams] = useSearchParams();
    const fromQueryTab = searchParams.get(tabQueryName);
    const classes = useStyles();
    const tabs = configuration.items.filter(
        (e) =>
            (!e.visibleRule || e.visibleRule()) &&
            (!e.permission ||
                permissionService.check({
                    path: e.permission.path,
                    type: e.permission.type,
                    level: PermissionLevel.READ,
                }))
    );

    const tabIndex = tabs.findIndex((item) => item.id === fromQueryTab);
    const targetTab = tabIndex !== -1 ? tabIndex : 0;
    const [activeTab, setActiveTab] = useState<string | number>(targetTab);

    useEffect(() => {
        if (navigateUseSearchQuery && !fromQueryTab && tabs.length > 1) {
            setSearchParams("tab=0");
        }
    }, []);

    useEffect(() => {
        navigateUseSearchQuery && fromQueryTab && setActiveTab(parseInt(fromQueryTab, 10));
    }, [fromQueryTab]);

    useLayoutEffect(() => {
        const initTab = tabs[targetTab];
        onTabChange && onTabChange(targetTab, initTab);
    }, [targetTab]);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        const tab = tabs[Number(newValue)];
        if (navigateUseSearchQuery) {
            setSearchParams("?tab=" + newValue);
        } else {
            setActiveTab(newValue);
        }

        onTabChange && onTabChange(newValue, tab);
    };

    const renderTabHeader = (tab: TabItem, index: number): ReactNode => {
        return (
            <Tab
                key={`${tab.label}-${index}`}
                label={tab.label}
                disabled={tab.disabled}
                data-test-id={`tab-header:${tab.label}`}
            />
        );
    };

    const renderTabContent = (item: TabItem, key: number) => {
        return (
            <TabPanel
                key={`item-${item.label}=${key}`}
                value={activeTab}
                index={key}
                styles={{ height: "calc(90% - 60px)" }}
                isHeightFixed={isHeightFixed}>
                {item.component}
            </TabPanel>
        );
    };

    return (
        <Box className={classes.root}>
            <Box className={classes.borderBottom}>
                <Tabs
                    className={classes.tabs}
                    value={activeTab}
                    onChange={handleChange}
                    aria-label="basic tabs">
                    {tabs.map(renderTabHeader)}
                </Tabs>
            </Box>
            {tabs.map(renderTabContent)}
        </Box>
    );
});

export default BaseTabs;
