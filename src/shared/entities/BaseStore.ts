import { toJS } from "mobx";
import { IAnyType, Instance, flow, getSnapshot, types } from "mobx-state-tree";
import { getBaseActions } from "../request/baseActions";
import { BaseActionOptions } from "../request/types";
import ViewMediator, { IViewMediator } from "../store/ViewMediator";
import { Pagination } from "./Pagination";

type ViewMediator = IViewMediator & ReturnType<typeof createBaseStore>;

interface BaseStoreProps<StoreListModel extends IAnyType, StoreModel extends IAnyType> {
    storeName: string;
    storeListModel: StoreListModel;
    storeMainInfoModel: StoreModel;
    useMock?: boolean;
}

const StoreState = types
    .model("StoreState", {
        isInitialized: types.optional(types.boolean, false),
        isFetching: types.optional(types.boolean, false),
        isUpdating: types.optional(types.boolean, false),
        isDeleting: types.optional(types.boolean, false),
        isCreating: types.optional(types.boolean, false),
        isError: types.optional(types.boolean, false),
    })
    .views((self) => {
        return {
            get isLoading() {
                return self.isFetching || self.isUpdating || self.isCreating || self.isDeleting;
            },
        };
    });

export const createBaseStore = <StoreListModel extends IAnyType, StoreModel extends IAnyType>({
    storeName,
    storeListModel,
    storeMainInfoModel,
    useMock,
}: BaseStoreProps<StoreListModel, StoreModel>) =>
    types
        .model(`${storeName}Store`, {
            state: types.optional(StoreState, {}),
            data: types.array(storeListModel),
            filters: Pagination,
            current: types.maybeNull(storeMainInfoModel),
        })
        .views((self) => ({
            get dataArray() {
                return Array.from(self.data.values());
            },
            get dataMap() {
                return new Map(self.data.map((item) => [item.id, item]));
            },

            get url() {
                return storeName.toLowerCase();
            },
        }))
        .actions((self) => {
            const getById = flow(function* (id: string) {
                const response = yield getBaseActions(storeName.toLowerCase(), useMock).getById(id);
                return response.data;
            });

            const fetch = flow(function* (
                filters?: Record<string, unknown>,
                options?: BaseActionOptions
            ) {
                try {
                    self.state.isFetching = true;

                    const response = yield getBaseActions(
                        useMock ? storeName.toLowerCase() : `${storeName.toLowerCase()}/page`,
                        useMock
                    ).fetch<Instance<typeof storeListModel>[]>(
                        useMock
                            ? {
                                  _page: self.filters.page + 1,
                                  _per_page: self.filters.size,
                              }
                            : {
                                  pageInfo: { size: self.filters.size, page: self.filters.page },
                                  filter: filters,
                              },
                        options
                    );

                    self.data.clear();
                    response.data[useMock ? "data" : "content"].forEach(
                        (item: Instance<typeof storeListModel>) => {
                            try {
                                const mobxItem = storeListModel.create(item);
                                self.data.push(mobxItem);
                            } catch (error) {
                                (self as unknown as ViewMediator).onSnapshotConvertionError?.(
                                    storeListModel.name,
                                    item.id
                                );
                                console.error(`Error in mapping data: ${error}`);
                                throw error;
                            }
                        }
                    );

                    self.filters.setTotal(
                        useMock ? response.data.items : response.data.totalElements
                    );
                } catch {
                    self.state.isError = true;
                } finally {
                    self.state.isFetching = false;
                    self.state.isInitialized = true;
                }
            });

            const paginationChagned = () => {
                fetch();
            };

            const setCurrent = flow(function* (
                id: string | null = null,
                options?: BaseActionOptions & { tryGetFromDataList?: boolean }
            ) {
                if (id === null) {
                    self.current = null;
                    (self as unknown as ViewMediator).onCurrentModelDestroy?.();
                    self.state.isInitialized = true;
                    return;
                }

                if (options?.tryGetFromDataList) {
                    const current = self.dataMap.get(id) ?? null;
                    if (current) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        self.current = getSnapshot(current);
                        (self as unknown as ViewMediator).onCurrentModelSet?.(self.current!);
                        return;
                    }
                }

                self.state.isFetching = true;
                try {
                    const response = yield getBaseActions(storeName.toLowerCase(), useMock).getById<
                        Instance<typeof storeMainInfoModel>
                    >(id, options);
                    try {
                        const mobxItem = storeMainInfoModel.create(response.data);
                        self.current = mobxItem;
                        (self as unknown as ViewMediator).onCurrentModelSet?.(self.current!);
                    } catch (err: unknown) {
                        (self as unknown as ViewMediator).onSnapshotConvertionError?.(
                            storeMainInfoModel.name,
                            response.data.id
                        );
                        console.error(err);
                    }
                } catch {
                    self.state.isError = true;
                } finally {
                    self.state.isFetching = false;
                    self.state.isInitialized = true;
                }
            });

            const update = flow(function* (
                model: { id: string } & (
                    | Instance<StoreModel>
                    | Record<string, number | string | boolean | object | null>
                )
            ) {
                try {
                    self.state.isUpdating = true;
                    const current = self.current ? getSnapshot(self.current) : null;

                    const previous =
                        current ??
                        toJS(self.data.find((item) => item.id === (model as { id: string }).id));

                    const result = yield getBaseActions(storeName.toLowerCase()).update(
                        (model as { id: string }).id,
                        {
                            ...previous,
                            ...model,
                        }
                    );
                    return result.data as Instance<StoreModel>;
                } catch (err) {
                    self.state.isError = true;
                    throw new Error(err as string);
                } finally {
                    self.state.isUpdating = false;
                }
            });

            const create = flow(function* (
                model:
                    | Record<string, number | string | boolean | object | null>
                    | Instance<StoreModel>
            ) {
                try {
                    self.state.isCreating = true;
                    const response = yield getBaseActions(storeName.toLowerCase()).create<
                        Instance<typeof storeListModel>
                    >(model);

                    return response.data as Instance<StoreModel>;
                } catch (err) {
                    self.state.isError = true;
                    throw new Error(err as string);
                } finally {
                    self.state.isCreating = false;
                }
            });

            const remove = flow(function* (
                model: { id: string } & (
                    | Instance<StoreModel>
                    | Record<string, number | string | boolean | object | null>
                )
            ) {
                try {
                    self.state.isDeleting = true;
                    yield getBaseActions(storeName.toLowerCase()).delete(
                        (model as { id: string }).id
                    );
                } catch (err) {
                    self.state.isError = true;
                    throw new Error(err as string);
                } finally {
                    self.state.isDeleting = false;
                }
            });

            return {
                fetch,
                paginationChagned,
                setCurrent,
                getById,
                update,
                create,
                remove,
            };
        });

export const createBaseStoreWithViewMediator = <
    StoreListModel extends IAnyType,
    StoreModel extends IAnyType,
>(
    props: BaseStoreProps<StoreListModel, StoreModel>
) => types.compose(createBaseStore(props), ViewMediator).named(`${props.storeName}Store`);

export interface IBaseStore extends Instance<ReturnType<typeof createBaseStore>> {}
