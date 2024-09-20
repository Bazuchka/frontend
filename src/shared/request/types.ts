import { Method } from "axios";
import { SEARCH_TYPE } from "src/shared/enums";

export enum SortingDirection {
    ASC = "ASC",
    DESC = "DESC",
    NONE = "NONE",
}

export interface PageInfo {
    page: number;
    size: number;
}

export interface Pageable {
    [x: string]: unknown | null | undefined;
    pageInfo: PageInfo;
}

export interface TableLoadParameters {}

export interface SelectOfDictionaryFilterable {
    filter: {
        sortingColumn: string;
        sortingDirection: SortingDirection;
    };
}

export interface IStringFilter {
    type?: SEARCH_TYPE.CONTAINS | SEARCH_TYPE.LIKE | SEARCH_TYPE.EXACTLY_MATCHES | string;
    content: string;
    byOr?: boolean;
}

export interface IdCodeFilter {
    id?: number | string | null;
    code?: IStringFilter;
}

export interface Options {
    url: string;
    baseURL?: string;
    method?: Method;
    responseType?: "blob";
    headers?: Record<string, string>;
    // @TODO need to use real type instead of any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
    // @TODO need to use real type instead of any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: any;
    useMock?: boolean;
    preventDefaultAlert?: boolean;
}

export type BaseActionOptions = Pick<Options, "preventDefaultAlert"> & {
    urlPostfix?: string;
    serviceUrl?: string;
    method?: Method;
    headers?: Record<string, string>;
};
