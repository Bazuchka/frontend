import { Instance, getParent, types } from "mobx-state-tree";

interface Paginatable {
    paginationChagned: () => void;
}

export const Pagination = types.optional(
    types
        .model("Pagination", {
            page: types.refinement(types.integer, (value) => value >= 0),
            size: types.refinement(types.integer, (value) => value > 0),
            total: types.refinement(types.integer, (value) => value >= 0),
        })
        .actions((self) => {
            const setUserPagination = (pagination: Partial<IPagination>) => {
                self.page = pagination.page ?? self.page;
                if (pagination.size && pagination.size !== self.size) {
                    self.page = 0;
                }
                self.size = pagination.size ?? self.size;
                getParent<Paginatable>(self).paginationChagned();
            };

            const setTotal = (total: number) => {
                self.total = total;
            };

            return {
                setUserPagination,
                setTotal,
            };
        }),
    {
        page: 0,
        size: 25,
        total: 100,
    }
);

export interface IPagination extends Instance<typeof Pagination> {}
