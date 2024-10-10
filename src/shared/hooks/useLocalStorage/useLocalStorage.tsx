import { useEffect, useState } from "react";
import { lsKeys } from "./types";

function useLocalStorage<V>(lsKey: lsKeys) {
    const [lsData, setLsData] = useState<V | null>(null);

    useEffect(() => {
        const oldData = getItem();

        oldData && setLsData(oldData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!lsData) {
            localStorage.removeItem(lsKey);
            return;
        }

        localStorage.setItem(lsKey, JSON.stringify(lsData));
    }, [lsKey, lsData]);

    const getItem = (): V | null => {
        const data = localStorage.getItem(lsKey);
        return data ? JSON.parse(data) : null;
    };

    const setItem = (value: V): void => {
        setLsData(value);
    };

    const clearItem = () => {
        setLsData(null);
    };

    return {
        lsData,
        setItem,
        clearItem,
    };
}

export default useLocalStorage;
