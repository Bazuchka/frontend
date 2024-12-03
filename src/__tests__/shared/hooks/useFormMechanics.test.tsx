import { beforeEach, describe, expect, jest, it } from "@jest/globals";
import { act, renderHook, RenderHookResult } from "@testing-library/react";
import { FieldValues } from "react-hook-form";
import { MemoryRouter } from "react-router-dom";
import useFormMechanics, { FormMechanicsState } from "src/shared/hooks/useFormMechanics";

let hook: RenderHookResult<ReturnType<typeof useFormMechanics>, unknown>;

const hookName = "useFormMechanics";

const renderCustomHook = (
    params = {
        entityId: hookName,
        navigation: {},
        onCreate: (data: FieldValues) => Promise.resolve(JSON.stringify(data)),
        onUpdate: (id: string, data: FieldValues) => Promise.resolve(JSON.stringify(data) + id),
    }
) => {
    hook = renderHook(() => useFormMechanics(params), {
        wrapper: MemoryRouter,
    });
};

describe("isCreate", () => {
    const testNameList = ["", hookName];

    const testCase = (entityId: string) => {
        const onCreate = (data: FieldValues) => Promise.resolve(JSON.stringify(data));
        const onUpdate = (id: string, data: FieldValues) =>
            Promise.resolve(JSON.stringify(data) + id);

        it(`test: ${entityId}`, () => {
            renderCustomHook({
                entityId,
                navigation: {},
                onCreate,
                onUpdate,
            });

            expect(hook.result.current.isCreate).toBe(!entityId);
        });
    };
    testNameList.forEach(testCase);
});

describe("onEdit", () => {
    beforeEach(() => {
        renderCustomHook();
    });

    it("default", () => {
        const { onEdit } = hook.result.current;

        expect(hook.result.current.formState.state).toBe(FormMechanicsState.VIEW);

        act(onEdit);

        expect(hook.result.current.formState.state).toBe(FormMechanicsState.EDIT);
    });
});

describe("onStateFormChanged", () => {
    beforeEach(() => {
        renderCustomHook();
    });

    it("no changes", () => {
        const { onStateFormChanged, formState } = hook.result.current;
        const expectedFormState = { ...formState };

        act(() => onStateFormChanged({ isDirty: formState.isDirty, isValid: formState.isValid }));

        expect(formState).toStrictEqual(expectedFormState);
    });

    it("change isDirty", () => {
        const { onStateFormChanged, formState } = hook.result.current;
        const expectedFormState = { ...formState, isDirty: !formState.isDirty };

        act(() => onStateFormChanged({ isDirty: !formState.isDirty, isValid: formState.isValid }));

        expect(hook.result.current.formState).toStrictEqual(expectedFormState);
    });

    it("change isValid", () => {
        const { onStateFormChanged, formState } = hook.result.current;
        const expectedFormState = { ...formState, isValid: !formState.isValid };

        act(() => onStateFormChanged({ isDirty: formState.isDirty, isValid: !formState.isValid }));

        expect(hook.result.current.formState).toStrictEqual(expectedFormState);
    });
});

describe("onFormEditCancel", () => {
    beforeEach(() => {
        renderCustomHook();
    });

    interface ITestData {
        id: string;
        isDirty: boolean;
        expectedState: FormMechanicsState;
        testDescription: string;
    }

    const testDataList: ITestData[] = [
        {
            id: "some_id",
            isDirty: false,
            expectedState: FormMechanicsState.VIEW,
            testDescription: "with id and !isDirty",
        },
        {
            id: "",
            isDirty: false,
            expectedState: FormMechanicsState.NAVIGATE_TO_LIST,
            testDescription: "without id and !isDirty",
        },
        {
            id: "some_id",
            isDirty: true,
            expectedState: FormMechanicsState.EDIT_CANCEL_AWAIT_CONFIRM,
            testDescription: "with id and isDirty",
        },
    ];

    const testCase = (testData: ITestData) => {
        it(testData.testDescription, () => {
            const { onFormEditCancel } = hook.result.current;

            act(() => {
                hook.result.current.formState.id = testData.id;
                hook.result.current.formState.isDirty = testData.isDirty;

                onFormEditCancel();
            });

            const expectedFormState = {
                ...hook.result.current.formState,
                state: testData.expectedState,
            };

            expect(hook.result.current.formState).toStrictEqual(expectedFormState);
        });
    };

    testDataList.forEach(testCase);
});

describe("onClickSave", () => {
    beforeEach(() => {
        renderCustomHook();
    });

    it("test click with navigation", () => {
        const { onClickSave, formState } = hook.result.current;
        const expectedFormState = {
            ...formState,
            state: FormMechanicsState.SUBMIT_ATTEMPT,
            isValid: true,
            isTabNavigation: true,
        };

        act(() => {
            // mock this for correct work useEffect with positive road
            hook.result.current.formState.isValid = true;

            onClickSave(true);
        });

        expect(hook.result.current.formState).toStrictEqual(expectedFormState);
    });

    // here useEffect rewrite formState with error action
    it("test click with navigation -> error (!isValid form)", () => {
        const { onClickSave, formState } = hook.result.current;
        const expectedFormState = {
            ...formState,
            state: FormMechanicsState.EDIT,
            isTabNavigation: false,
        };

        act(() => {
            onClickSave(true);
        });

        expect(hook.result.current.formState).toStrictEqual(expectedFormState);
    });

    it("test click without navigation", () => {
        const { onClickSave, formState } = hook.result.current;
        const expectedFormState = {
            ...formState,
            isValid: true,
            state: FormMechanicsState.SUBMIT_ATTEMPT,
        };

        act(() => {
            // mock this for correct work useEffect with positive road
            hook.result.current.formState.isValid = true;

            onClickSave(false);
        });

        expect(hook.result.current.formState).toStrictEqual(expectedFormState);
    });

    // here useEffect rewrite formState with error action
    it("test click without navigation -> error (!isValid form)", () => {
        const { onClickSave, formState } = hook.result.current;
        const expectedFormState = {
            ...formState,
            state: FormMechanicsState.EDIT,
            isTabNavigation: false,
        };

        act(() => {
            onClickSave(false);
        });

        expect(hook.result.current.formState).toStrictEqual(expectedFormState);
    });
});

describe("onSubmitStart", () => {
    describe("test positive action when create", () => {
        const navigationData: Record<string, unknown> = {};

        it("with actions", async () => {
            navigationData.navigateActions = jest.fn;

            renderCustomHook({
                entityId: "",
                navigation: navigationData,
                onCreate: () => {
                    return Promise.resolve("");
                },
                onUpdate: (id: string) => {
                    return Promise.resolve(id);
                },
            });

            const mockUpdateData: FieldValues = {
                ["x"]: "mockCreateDataId",
            };

            const { onSubmitStart, formState } = hook.result.current;

            const expectedFormState = {
                ...formState,
                isActionNavigation: true,
                state: FormMechanicsState.NAVIGATE_WITH_ACTION,
            };

            await act(async () => {
                return onSubmitStart(mockUpdateData);
            });

            expect(hook.result.current.formState).toStrictEqual(expectedFormState);
        });

        it("without actions", async () => {
            navigationData.navigateActions = undefined;

            renderCustomHook({
                entityId: "",
                navigation: navigationData,
                onCreate: () => {
                    return Promise.resolve("");
                },
                onUpdate: (id: string) => {
                    return Promise.resolve(id);
                },
            });

            const mockUpdateData: FieldValues = {
                ["x"]: "mockCreateDataId",
            };

            const { onSubmitStart, formState } = hook.result.current;

            const expectedFormState = {
                ...formState,
                state: FormMechanicsState.NAVIGATE_TO_LIST,
            };

            await act(async () => {
                return onSubmitStart(mockUpdateData);
            });

            expect(hook.result.current.formState).toStrictEqual(expectedFormState);
        });
    });

    describe("test positive action when update", () => {
        // be careful, here useEffect working, then state changing :)
        it("isTabNavigation", async () => {
            renderCustomHook({
                entityId: hookName,
                navigation: { nextTabPath: () => jest.fn() },
                onCreate: () => {
                    return Promise.resolve("");
                },
                onUpdate: (id: string) => {
                    return Promise.resolve(id);
                },
            });
            const mockUpdateData: FieldValues = {
                ["x"]: "mockUpdateDataId",
            };

            // change for correct work formReducer with isTabNavigation condition
            hook.result.current.formState.isTabNavigation = true;

            const { onSubmitStart, formState } = hook.result.current;
            const expectedFormState = {
                ...formState,
                isActionNavigation: true,
                state: FormMechanicsState.NAVIGATE_TO_NEXT_TAB,
            };

            await act(async () => {
                return onSubmitStart(mockUpdateData);
            });

            expect(hook.result.current.formState).toStrictEqual(expectedFormState);
        });

        it("!isTabNavigation && action", async () => {
            renderCustomHook({
                entityId: hookName,
                navigation: { navigateActions: jest.fn() },
                onCreate: () => {
                    return Promise.resolve("");
                },
                onUpdate: (id: string) => {
                    return Promise.resolve(id);
                },
            });
            const mockUpdateData: FieldValues = {
                ["x"]: "mockUpdateDataId",
            };

            // change for correct work formReducer without isTabNavigation condition
            hook.result.current.formState.isTabNavigation = false;

            const { onSubmitStart, formState } = hook.result.current;
            const expectedFormState = {
                ...formState,
                state: FormMechanicsState.NAVIGATE_WITH_ACTION,
            };

            await act(async () => {
                return onSubmitStart(mockUpdateData);
            });

            expect(hook.result.current.formState).toStrictEqual(expectedFormState);
        });

        it("default", async () => {
            renderCustomHook();

            const mockUpdateData = {};

            const { onSubmitStart, formState } = hook.result.current;
            const expectedFormState = {
                ...formState,
                state: FormMechanicsState.VIEW,
                isDirty: false,
            };

            await act(async () => {
                return onSubmitStart(mockUpdateData);
            });

            expect(hook.result.current.formState).toStrictEqual(expectedFormState);
        });
    });
});
