import { getParent, Instance, types } from "mobx-state-tree";
import { SortingDirection } from "../request/types";

interface Sortable {
    sortingChanged: () => void;
}

const SortingModel = types.model("SortingModel", {
    sortingColumn: types.string,
    sortingDirection: types.enumeration<SortingDirection>(
        "SortingDirection",
        Object.values(SortingDirection)
    ),
});

interface ISortingModel extends Instance<typeof SortingModel> {}

export const Sorting = types.optional(
    types
        .model("Sorting", {
            sorting: types.optional(SortingModel, {
                sortingColumn: "",
                sortingDirection: SortingDirection.NONE,
            }),
            defaultSorting: types.optional(SortingModel, {
                sortingColumn: "",
                sortingDirection: SortingDirection.NONE,
            }),
        })
        .actions((self) => {
            const setSorting = (sortingData: ISortingModel) => {
                self.sorting = sortingData;
                getParent<Sortable>(self).sortingChanged();
            };
            const toggleSorting = (field: string) => {
                if (self.sorting?.sortingDirection === SortingDirection.ASC) {
                    self.sorting = {
                        sortingColumn: field,
                        sortingDirection: SortingDirection.DESC,
                    };
                    getParent<Sortable>(self).sortingChanged();
                    return;
                }

                if (self.sorting?.sortingDirection === SortingDirection.DESC) {
                    self.sorting = {
                        sortingColumn: field,
                        sortingDirection: SortingDirection.NONE,
                    };
                    getParent<Sortable>(self).sortingChanged();
                    return;
                }

                self.sorting = { sortingColumn: field, sortingDirection: SortingDirection.ASC };
                getParent<Sortable>(self).sortingChanged();
            };
            const setNextSorting = (field: string) => {
                if (self.sorting?.sortingColumn !== field) {
                    self.sorting = { sortingColumn: field, sortingDirection: SortingDirection.ASC };
                    getParent<Sortable>(self).sortingChanged();
                    return;
                }

                toggleSorting(field);
            };

            return {
                setSorting,
                toggleSorting,
                setNextSorting,
            };
        })
        .views((self) => ({
            get sortingInfo() {
                if (self.sorting.sortingDirection === SortingDirection.NONE) {
                    return self.defaultSorting;
                }

                if (self.sorting?.sortingDirection && self.sorting?.sortingColumn) {
                    return self.sorting;
                }

                return {};
            },
        })),
    {}
);

export interface Sorting extends Instance<typeof Sorting> {}
