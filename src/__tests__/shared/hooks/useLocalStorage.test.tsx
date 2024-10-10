import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { renderHook, RenderHookResult } from "@testing-library/react";
import { act } from "react";
import { lsKeys, useLocalStorage } from "src/shared/hooks/useLocalStorage";

let hook: RenderHookResult<ReturnType<typeof useLocalStorage>, unknown>;

const defaultValue = { key: "value" };

describe("Test LS actions", () => {
    beforeEach(() => {
        hook = renderHook(() => useLocalStorage(lsKeys.breadKrumbs));
    });

    afterEach(() => {
        const { clearItem } = hook.result.current;

        act(clearItem);

        expect(hook.result.current.lsData).toBe(null);
    });

    it("test empty ls key", () => {
        hook = renderHook(() => useLocalStorage(lsKeys.breadKrumbs));

        expect(hook.result.current.lsData).toStrictEqual(null);
    });

    it("test Set data by key", () => {
        hook = renderHook(() => useLocalStorage(lsKeys.breadKrumbs));

        const { setItem } = hook.result.current;

        expect(hook.result.current.lsData).toBe(null);

        act(() => setItem(defaultValue));

        expect(hook.result.current.lsData).toStrictEqual(defaultValue);
    });

    it("test reWrite data by key", () => {
        hook = renderHook(() => useLocalStorage(lsKeys.breadKrumbs));

        const { lsData, setItem } = hook.result.current;

        expect(lsData).toBe(null);

        act(() => setItem(defaultValue));

        expect(hook.result.current.lsData).toBe(defaultValue);

        const newLsValue = { key: "new ls value" };

        act(() => setItem(newLsValue));

        expect(hook.result.current.lsData).toBe(newLsValue);
    });
});
