import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Header } from "@tanstack/react-table";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { SortingDirection } from "src/shared/request/types";
import { MenuModalItem } from "src/shared/UI/TSBaseTable/UI/MenuModalItem";
import { ITSSorting } from "../store/TSSorting";

type SortingMenuProps<T> = {
    tsSorting: ITSSorting;
    header: Header<T, unknown>;
};

export const SortingMenu = observer(<T,>({ tsSorting, header }: SortingMenuProps<T>) => {
    const { t } = useTranslation();

    if (!header.column.getCanSort()) {
        return null;
    }

    const handleSortClick = (direction: SortingDirection) => () => {
        tsSorting.setSorting({ sortingColumn: header.id, sortingDirection: direction });
    };

    const isIconVisible = tsSorting.sorting.sortingColumn === header.id;

    const isSortDirectionAscVisible = !(
        isIconVisible && tsSorting.sorting.sortingDirection === SortingDirection.ASC
    );

    const isSortDirectionDescVisible = !(
        isIconVisible && tsSorting.sorting.sortingDirection === SortingDirection.DESC
    );

    const isSortDirectionNoneVisible =
        isIconVisible &&
        (tsSorting.sorting.sortingDirection === SortingDirection.DESC ||
            tsSorting.sorting.sortingDirection === SortingDirection.ASC);

    return (
        <>
            {isSortDirectionAscVisible && (
                <MenuModalItem
                    onClickHandler={handleSortClick(SortingDirection.ASC)}
                    icon={<ArrowUpwardIcon />}
                    title={t("Shared:sortingDirections.asc")}
                />
            )}
            {isSortDirectionDescVisible && (
                <MenuModalItem
                    onClickHandler={handleSortClick(SortingDirection.DESC)}
                    icon={<ArrowDownwardIcon />}
                    title={t("Shared:sortingDirections.desc")}
                />
            )}
            {isSortDirectionNoneVisible && (
                <MenuModalItem
                    onClickHandler={handleSortClick(SortingDirection.NONE)}
                    icon={<></>}
                    title={t("Shared:sortingDirections.none")}
                />
            )}
        </>
    );
});
