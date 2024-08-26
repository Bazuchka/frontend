import { Pageable, SelectOfDictionaryFilterable, SortingDirection } from "src/shared/request/types";

export const DefaultPageableHTTPRequestObject: Pageable = {
    pageInfo: {
        page: 0,
        size: 500,
    },
};

export const DefaultSelectOfDictionaryHTTPRequestObject: SelectOfDictionaryFilterable & Pageable = {
    pageInfo: {
        page: 1000,
        size: 0,
    },
    filter: {
        sortingColumn: "code",
        sortingDirection: SortingDirection.ASC,
    },
};
