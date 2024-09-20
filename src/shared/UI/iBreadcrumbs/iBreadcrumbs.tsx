import ChevronRight from "@mui/icons-material/ChevronRight";
import { Breadcrumbs, useTheme } from "@mui/material";
import { observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    MenuConfiguration,
    MenuItem,
    menuConfiguration,
} from "src/app/layout/sidebar/menu/config/menuConfiguration";
import { viewStore } from "src/app/store";
import { useIBreadcrumbsStyles } from "./style/style";
import { getObjectByPath } from "./utils";

const IBreadcrumbs: FC = observer((): JSX.Element => {
    const theme = useTheme();
    const classes = useIBreadcrumbsStyles({ theme });
    const location = useLocation();
    const path = location.pathname;
    const [pathName, setPathName] = useState(path);
    const { setPageTitle, menuParams } = viewStore;
    const [newWay, setNewWay] = useState<Array<MenuItem> | null>(null);

    const findLastBetweenSlashes = (string: string) => {
        const regex = /\/([^/]+)\//g;
        const matches = string.match(regex);

        if (matches && matches.length > 0) {
            const lastMatch = matches[matches.length - 1];
            return lastMatch.slice(1, -1);
        }

        return null;
    };

    useEffect(() => {
        let usingBreadCrumbs = JSON.parse(localStorage.getItem("breadCrumbs") as string);

        if (Array.isArray(usingBreadCrumbs)) {
            usingBreadCrumbs = usingBreadCrumbs.filter((path: MenuItem | null) => !!path);
        }

        const lastUrlTerm = path.split("/").pop();
        if (lastUrlTerm?.length !== 36 && lastUrlTerm !== "create") {
            if (!newWay?.filter((el: MenuItem) => el.path === path)) {
                localStorage.clear();
            }

            if (newWay !== null) {
                setNewWay(null);
                localStorage.setItem("breadCrumbs", "null");
            }

            setPathName(path);
        } else {
            if (usingBreadCrumbs && usingBreadCrumbs.filter((el: MenuItem) => el?.path === path)) {
                const elIndex = usingBreadCrumbs.findIndex((el: MenuItem) => el?.path === path);
                const lastId = usingBreadCrumbs[elIndex]?.id;

                if (lastId) {
                    localStorage.setItem("lastId", lastId);

                    delete usingBreadCrumbs[elIndex].id;

                    localStorage.setItem("breadCrumbs", JSON.stringify(usingBreadCrumbs));
                }
            }

            const newItem =
                getObjectByPath(menuConfiguration(menuParams), path) ||
                getObjectByPath(menuConfiguration(menuParams), "/" + findLastBetweenSlashes(path));

            const isItemInBreadCrumbs = usingBreadCrumbs?.filter(
                (el: MenuItem) => el.key === newItem?.key
            ).length;

            if (usingBreadCrumbs && isItemInBreadCrumbs) {
                const index = usingBreadCrumbs.findIndex((el: MenuItem) => el.key === newItem?.key);
                const newBread = [...usingBreadCrumbs].slice(0, index + 1);

                newBread[index] = newItem;

                localStorage.setItem("breadCrumbs", JSON.stringify(newBread));
                setNewWay(newBread);
            } else if (path && newItem && newItem.path) {
                const newItemWithId = {
                    ...newItem,
                    path: path ? newItem?.path + "/" + path?.split("/")?.pop() : newItem?.path,
                };

                const breadcrumbs = getBreadCrumbs(pathName);
                localStorage.setItem(
                    "breadCrumbs",
                    JSON.stringify([...breadcrumbs, newItemWithId as MenuItem])
                );

                setNewWay([...breadcrumbs, newItem as MenuItem]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path, menuParams]);

    const hasChildWithPath = (item: MenuItem, path: string): boolean => {
        const stack = [item];

        while (stack.length) {
            const item = stack.pop();

            if (item?.path === path) {
                return true;
            }

            if (item?.children) {
                stack.push(...item.children);
            }
        }

        return false;
    };

    const getBreadCrumbs = (pathName: string): MenuConfiguration => {
        const menuPart = menuConfiguration(menuParams).filter((el) =>
            hasChildWithPath(el, pathName)
        )[0];

        function getBreadcrumbItems(menuItem: MenuItem, arr: MenuItem[]) {
            arr.push(menuItem);
            const { children } = menuItem || {};

            if (children) {
                const childrenItem = children.filter((el) => el?.path === pathName);

                if (childrenItem.length) {
                    arr.push(childrenItem[0]);

                    return arr;
                }

                for (const child in children) {
                    if (hasChildWithPath(children[child], pathName)) {
                        getBreadcrumbItems(children[child], arr);
                    }
                }
            }

            return arr;
        }

        return getBreadcrumbItems(menuPart, []);
    };

    const breadcrumbs = getBreadCrumbs(pathName);
    const usingArr = newWay || breadcrumbs;

    useEffect(() => {
        if (usingArr[0]) {
            const changingArr = [...usingArr];
            const title = changingArr.splice(-1, 1)[0].label;
            setPageTitle(title);
        } else {
            setPageTitle("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usingArr]);

    return (
        <Breadcrumbs aria-label="breadcrumb" className={classes.root} separator={<ChevronRight />}>
            {usingArr
                .filter((el) => el?.key)
                .map((el, index: number) => {
                    return (
                        <Link
                            to={
                                index === 0
                                    ? "/"
                                    : index === usingArr.length - 1
                                      ? "#"
                                      : (el?.path as string)
                            }
                            key={`breadcrumbs-${el.key}`}
                            className={
                                (el?.path === pathName && !newWay) ||
                                (newWay && index === newWay.length - 1)
                                    ? classes.activeLink
                                    : classes.link
                            }>
                            {el?.breadCrumbsLabel ?? el?.label}
                        </Link>
                    );
                })}
        </Breadcrumbs>
    );
});

export default IBreadcrumbs;
