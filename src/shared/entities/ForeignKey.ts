import { types } from "mobx-state-tree";

export const ForeignKey = types.model({
    id: types.string,
    code: types.string,
});

export const ForeignKeyShort = types.model({
    id: types.string,
});
