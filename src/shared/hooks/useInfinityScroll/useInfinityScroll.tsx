import { useCallback, useEffect, useRef, useState } from "react";
import { usePersistentState } from "../usePersistentState";

const THRESHOLD = 25;

type Props = {
    isLoading: boolean;
    getIsDataFullyLoaded: () => boolean;
    update: ({ value, page }: { value?: string | undefined; page?: number | undefined }) => void;
};

export const useInfinityScroll = (props: Props) => {
    const { getIsDataFullyLoaded, isLoading, update } = props;

    const [page, setPage] = useState(0);
    const lastItem = useRef<HTMLElement | null>(null);
    const list = useRef<HTMLElement | null>(null);
    const [refCounter, setRefCounter] = useState(0);
    const [getIsLoadingAllowed, setIsLoadingAllowed] = usePersistentState(true);

    const handleItemLoad = useCallback((element: HTMLElement | null) => {
        lastItem.current = element;
        setRefCounter((prev) => prev + 1);
    }, []);

    const handleListLoad = useCallback((element: HTMLElement) => {
        list.current = element;
        setRefCounter((prev) => prev + 1);
    }, []);

    const [getPrevInputValue, setPrevInputValue] = usePersistentState("");
    const [getShouldPageTriggerUpdate, setShouldPageTriggerUpdate] = usePersistentState(true);
    const [inputValue, setInputValue] = useState<string>("");

    const setSearchValue = (value: string) => setInputValue(value);

    useEffect(() => {
        if (!getShouldPageTriggerUpdate) {
            return setShouldPageTriggerUpdate(true);
        }
        if (inputValue !== getPrevInputValue()) {
            setPage(0);
            setPrevInputValue(inputValue);
            return update({ value: inputValue, page: 0 });
        }
        update({ value: inputValue, page });
    }, [
        update,
        inputValue,
        page,
        getShouldPageTriggerUpdate,
        getPrevInputValue,
        setShouldPageTriggerUpdate,
        setPrevInputValue,
    ]);

    useEffect(() => {
        if (isLoading) {
            return;
        }
        setIsLoadingAllowed(true);
    }, [isLoading, setIsLoadingAllowed]);

    const handleListScroll = useCallback(() => {
        if (!list.current || !lastItem.current) {
            return;
        }

        const listHeight = list.current.offsetHeight;
        const lastItemHeight = lastItem.current.offsetHeight;
        const listPosition = (list.current?.getBoundingClientRect().top ?? 0) + listHeight;

        const lastItemPosition =
            (lastItem.current?.getBoundingClientRect().top ?? 0) + lastItemHeight;
        const diff = Math.abs(listPosition - lastItemPosition);

        const shouldUpdatePage =
            diff < THRESHOLD && getIsLoadingAllowed() && !getIsDataFullyLoaded();

        if (shouldUpdatePage) {
            setIsLoadingAllowed(false);
            setPage((prev) => prev + 1);
        }
    }, [getIsDataFullyLoaded, getIsLoadingAllowed, setIsLoadingAllowed]);

    useEffect(() => {
        if (!list.current) {
            return;
        }

        list.current.addEventListener("wheel", handleListScroll);

        return () => {
            if (list.current) {
                list.current.removeEventListener("wheel", handleListScroll);
            }
        };
    }, [handleListScroll, refCounter]);

    return { handleListLoad, handleItemLoad, setSearchValue };
};
