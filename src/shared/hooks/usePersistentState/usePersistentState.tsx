import { useCallback, useRef } from "react";

export const usePersistentState = <T,>(initValue: T) => {
    const ref = useRef<T>(initValue);

    const get = useCallback(() => {
        return ref.current;
    }, []);

    const set = useCallback((value: T) => {
        ref.current = value;
    }, []);

    return [get, set] as const;
};
