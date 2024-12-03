import { types } from "mobx-state-tree";

export const ForeignKeyWithName = types.model({
    id: types.string,
    code: types.string,
    name: types.string,
});
