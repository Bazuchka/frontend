import { Instance, types } from "mobx-state-tree";

export const ForeignKey = types.model({
    id: types.string,
    code: types.string,
});

export const ForeignKeyWithName = types.model({
    id: types.string,
    code: types.string,
    name: types.maybeNull(types.string),
});

export const ForeignKeyShort = types.model({
    id: types.string,
});

export interface IForeignKey extends Instance<typeof ForeignKey> {}
