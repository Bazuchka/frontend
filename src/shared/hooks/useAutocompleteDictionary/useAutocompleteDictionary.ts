/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useState } from "react";
import { IUseAutocompleteDictionary } from "src/shared/hooks/useDictionary/types";
import { IdCode } from "../../types";
import { getConfiguration } from "../useDictionary/src/getConfiguration";
import { usePersistentState } from "../usePersistentState";
import { actions } from "./actions";
import getFilterByValue from "./getFilterByValue";
import { Payload } from "./types";

const DEFAULT_LIMIT = 20;

const arePayloadsEqual = (prev: Payload, current: Pick<Payload, "page" | "value">) =>
    JSON.stringify(prev) === JSON.stringify(current);

const useAutocompleteDictionary = (params: IUseAutocompleteDictionary) => {
    const { type, filter, useSorting, isMock, useDefaultFilter = true } = params || {};

    const { url } = useMemo(() => getConfiguration(params), [params]);

    const [data, setData] = useState<IdCode[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [getIsDataFullyLoaded, setIsDataFullyLoaded] = usePersistentState(false);

    const [getPrevPayload, setPrevPayload] = usePersistentState({
        value: "",
        page: -1,
    });

    const getCode = (id: string): string => {
        const record = data.filter((e) => e.id === id);

        return record.length === 1 ? record[0].code : "";
    };

    const update = useCallback(
        ({ value = "", page = 0 }: Partial<Pick<Payload, "page" | "value">>) => {
            const currentPayload = { value, page, filter };
            const isRequestNew = page === 0;

            const isPayloadEqual = arePayloadsEqual(getPrevPayload(), currentPayload);

            if (isPayloadEqual) {
                return;
            }

            setPrevPayload(currentPayload);
            setLoading(true);

            actions
                .getAll(
                    url,
                    Object.assign(
                        useDefaultFilter ? getFilterByValue(value) : {},
                        typeof filter === "function" ? filter(value) : filter
                    ),
                    page,
                    DEFAULT_LIMIT,
                    useSorting,
                    isMock
                )
                .then((response) => {
                    const newData = (response as { data: IdCode[] }).data;

                    setIsDataFullyLoaded(!newData.length);
                    setData((state) => (isRequestNew ? newData : [...state, ...newData]));
                })
                //TODO mock error
                .catch((error) => setError(error.message))
                .finally(() => setLoading(false));
        },
        [getPrevPayload, setIsDataFullyLoaded, setPrevPayload, url, JSON.stringify(filter)]
    );

    useEffect(() => {
        if (url) {
            update({});
        }
    }, [update, type, url]);

    return {
        data,
        error,
        isLoading,
        update,
        getCode,
        getIsDataFullyLoaded,
    };
};

export default useAutocompleteDictionary;
