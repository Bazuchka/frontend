import { ElementRef, useEffect, useMemo, useReducer, useRef } from "react";
import { FieldValues } from "react-hook-form";
import { useBeforeUnload, useNavigate } from "react-router-dom";
import { DIALOG_ACTION } from "src/shared/enums/enums";
import { DialogPrompt, ShowPromptHandle } from "src/shared/UI/DialogPrompt";
import { IFormComponent } from "src/shared/UI/iFormComponent";
import { RouterPrompt } from "src/shared/UI/RouterPrompt/RouterPrompt";

export enum FormMechanicsState {
    VIEW = "VIEW",
    EDIT = "EDIT",
    NAVIGATE_TO_ENTITY = "NAVIGATE_TO_ENTITY",
    NAVIGATE_TO_LIST = "NAVIGATE_TO_LIST",
    NAVIGATE_TO_NEXT_TAB = "NAVIGATE_TO_NEXT_TAB",
    NAVIGATE_WITH_ACTION = "NAVIGATE_WITH_ACTION",
    EDIT_CANCEL_AWAIT_CONFIRM = "EDIT_CANCEL_AWAIT_CONFIRM",
    SUBMIT_ATTEMPT = "SUBMIT_ATTEMPT",
    SUBMIT_IN_PROGRESS = "SUBMIT_IN_PROGRESS",
}

export enum FormMecanicsAction {
    FORM_STATE_CHANGED = "FORM_STATE_CHANGED",
    EDIT_START = "EDIT_START",
    ENTITY_CREATED = "ENTITY_CREATED",
    ENTITY_UPDATED = "ENTITY_UPDATED",
    EDIT_CANCEL = "EDIT_CANCEL",
    EDIT_CANCEL_CONFIRM = "EDIT_CANCEL_CONFIRM",
    EDIT_CANCEL_RESET = "EDIT_CANCEL_RESET",
    FORM_SUBMIT_ATTEMPT_NEXT_TAB = "FORM_SUBMIT_NEXT_TAB",
    FORM_SUBMIT_ATTEMPT = "FORM_SUBMIT_ATTEMPT",
    FORM_SUBMIT_START = "FORM_SUBMIT_START",
    FORM_SUBMIT_ERROR = "FORM_SUBMIT_ERROR",
    FORM_RESET = "FORM_RESET",
}

interface ReducerState {
    state: FormMechanicsState;
    id?: string;
    isDirty?: boolean;
    isValid?: boolean;
    isTabNavigation?: boolean;
    isActionNavigation?: boolean;
}

interface ReducerAction {
    type: FormMecanicsAction;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action?: any;
}

function formReducer(state: ReducerState, action: ReducerAction) {
    switch (action.type) {
        case FormMecanicsAction.FORM_STATE_CHANGED:
            return { ...state, isDirty: action.payload.isDirty, isValid: action.payload.isValid };
        case FormMecanicsAction.EDIT_START:
            return { ...state, state: FormMechanicsState.EDIT };
        case FormMecanicsAction.ENTITY_CREATED:
            if (action.action) {
                return handleEntityCreated(
                    {
                        ...state,
                        isActionNavigation: true,
                        state: FormMechanicsState.NAVIGATE_WITH_ACTION,
                    },
                    action.payload
                );
            }
            return handleEntityCreated(state, action.payload);

        case FormMecanicsAction.EDIT_CANCEL:
            return handleEditCancel(state);

        case FormMecanicsAction.EDIT_CANCEL_CONFIRM:
            if (action.payload.navigateActions) {
                return { ...state, state: FormMechanicsState.NAVIGATE_WITH_ACTION };
            } else if (!state.id) {
                return { ...state, state: FormMechanicsState.NAVIGATE_TO_LIST };
            } else {
                return { ...state, state: FormMechanicsState.VIEW, isDirty: false };
            }
        case FormMecanicsAction.EDIT_CANCEL_RESET:
            return { ...state, state: FormMechanicsState.EDIT };
        case FormMecanicsAction.ENTITY_UPDATED:
            if (state.isTabNavigation) {
                return {
                    ...state,
                    isActionNavigation: true,
                    state: FormMechanicsState.NAVIGATE_TO_NEXT_TAB,
                    id: action.payload,
                };
            }
            if (action.action) {
                return {
                    ...state,
                    state: FormMechanicsState.NAVIGATE_WITH_ACTION,
                    id: action.payload,
                };
            }
            return { ...state, state: FormMechanicsState.VIEW, isDirty: false };

        case FormMecanicsAction.FORM_SUBMIT_ATTEMPT:
            return {
                ...state,
                state: FormMechanicsState.SUBMIT_ATTEMPT,
            };
        case FormMecanicsAction.FORM_SUBMIT_ATTEMPT_NEXT_TAB:
            return {
                ...state,
                state: FormMechanicsState.SUBMIT_ATTEMPT,
                isTabNavigation: true,
            };
        case FormMecanicsAction.FORM_SUBMIT_START:
            return {
                ...state,
                state: FormMechanicsState.SUBMIT_IN_PROGRESS,
            };
        case FormMecanicsAction.FORM_SUBMIT_ERROR:
            return {
                ...state,
                state: FormMechanicsState.EDIT,
                isTabNavigation: false,
            };
        case FormMecanicsAction.FORM_RESET:
            return {
                ...state,
                state: FormMechanicsState.VIEW,
                isTabNavigation: false,
                isDirty: false,
                isValid: false,
            };
        default:
            return state;
    }
}

function handleEditCancel(state: ReducerState): ReducerState {
    if (!state.isDirty && state.id) {
        return { ...state, state: FormMechanicsState.VIEW };
    } else if (!state.isDirty && !state.id) {
        return { ...state, state: FormMechanicsState.NAVIGATE_TO_LIST };
    } else {
        return { ...state, state: FormMechanicsState.EDIT_CANCEL_AWAIT_CONFIRM };
    }
}

function handleEntityCreated(state: ReducerState, id?: string) {
    if (state.isTabNavigation) {
        return {
            ...state,
            state: FormMechanicsState.NAVIGATE_TO_NEXT_TAB,
            id,
        };
    }
    if (state.isActionNavigation) {
        return {
            ...state,
            state: FormMechanicsState.NAVIGATE_WITH_ACTION,
            id,
        };
    }
    if (id) {
        return {
            ...state,
            state: FormMechanicsState.NAVIGATE_TO_ENTITY,
            id,
        };
    } else {
        return { ...state, state: FormMechanicsState.NAVIGATE_TO_LIST };
    }
}

export interface IUseFormMechanicsParams {
    entityId?: string;
    navigation: {
        listPath?: string;
        entityPath?: (id: string) => string;
        createLeadsToList?: boolean;
        nextTabPath?: (id: string) => string;
        navigateActions?: (submited?: boolean, data?: unknown) => void;
    };
    onCreate: (data: FieldValues) => Promise<string>;
    onUpdate: (id: string, data: FieldValues) => Promise<string | void>;
    onDestroy?: () => void;
}

const useFormMechanics = ({
    entityId,
    navigation,
    onCreate,
    onUpdate,
    onDestroy,
}: IUseFormMechanicsParams) => {
    const isCreate = useMemo(() => {
        return !entityId;
    }, [entityId]);
    const navigate = useNavigate();
    const editPromptModalRef = useRef<ShowPromptHandle>(null);
    const formComponentRef = useRef<ElementRef<typeof IFormComponent>>(null);

    const [formState, dispatch] = useReducer<typeof formReducer>(formReducer, {
        state: entityId ? FormMechanicsState.VIEW : FormMechanicsState.EDIT,
        isDirty: false,
        isValid: false,
        id: entityId,
    });

    const onEdit = () => dispatch({ type: FormMecanicsAction.EDIT_START });
    const onEntityCreated = (navigateId: string) => {
        dispatch({
            type: FormMecanicsAction.ENTITY_CREATED,
            payload: navigation.createLeadsToList ? undefined : navigateId,
            action: navigation.navigateActions,
        });
    };

    const onEntityUpdated = (navigateId?: string) =>
        dispatch({
            type: FormMecanicsAction.ENTITY_UPDATED,
            payload: navigateId,
            action: navigation.navigateActions,
        });

    const onStateFormChanged = (payload: { isDirty: boolean; isValid: boolean }) => {
        if (formState.isDirty === payload.isDirty && formState.isValid === payload.isValid) {
            return;
        }
        dispatch({ type: FormMecanicsAction.FORM_STATE_CHANGED, payload });
    };

    const onFormEditCancel = () => {
        dispatch({ type: FormMecanicsAction.EDIT_CANCEL });
        onDestroy?.();
    };

    const onSubmitStart = async (data: FieldValues) => {
        dispatch({ type: FormMecanicsAction.FORM_SUBMIT_START });
        try {
            if (isCreate) {
                const navigationId = await onCreate(data);
                onEntityCreated(navigationId);
            } else {
                const navigationId = await onUpdate(entityId!, data);
                onEntityUpdated(navigationId ?? undefined);
            }
        } catch {
            onErrorSubmit();
        }
    };

    const onEditCancelConfirm = () => {
        dispatch({
            type: FormMecanicsAction.EDIT_CANCEL_CONFIRM,
            payload: { navigateActions: navigation.navigateActions },
        });
    };

    const onEditCancelReset = () => {
        dispatch({ type: FormMecanicsAction.EDIT_CANCEL_RESET });
    };

    const onClickSave = (withNavigation?: boolean) => {
        if (withNavigation) {
            dispatch({ type: FormMecanicsAction.FORM_SUBMIT_ATTEMPT_NEXT_TAB });
        } else {
            dispatch({ type: FormMecanicsAction.FORM_SUBMIT_ATTEMPT });
        }
    };

    const onErrorSubmit = () => {
        dispatch({ type: FormMecanicsAction.FORM_SUBMIT_ERROR });
    };

    const onNextClick = () => {
        navigate(navigation.nextTabPath!(formState.id));
        onDestroy?.();
    };

    useEffect(() => {
        if (formState.state === FormMechanicsState.NAVIGATE_TO_ENTITY) {
            if (!navigation.entityPath) {
                console.info("entityPath not defined for navigation");
            } else {
                navigate(navigation.entityPath(formState.id));
            }
            dispatch({ type: FormMecanicsAction.FORM_RESET });
            onDestroy?.();
        }

        if (formState.state === FormMechanicsState.NAVIGATE_WITH_ACTION) {
            navigation.navigateActions!(true, { id: formState.id });
            onDestroy?.();
        }

        if (formState.state === FormMechanicsState.NAVIGATE_TO_LIST) {
            if (!navigation.listPath) {
                console.info("listPath not defined for navigation");
            } else {
                navigate(navigation.listPath);
            }

            onDestroy?.();
        }

        if (formState.state === FormMechanicsState.EDIT_CANCEL_AWAIT_CONFIRM) {
            editPromptModalRef.current?.show(DIALOG_ACTION.EDIT_CANCEL);
        }

        if (formState.state === FormMechanicsState.SUBMIT_ATTEMPT) {
            formComponentRef.current?.submitForm();
            if (!formState.isValid) {
                dispatch({ type: FormMecanicsAction.FORM_SUBMIT_ERROR });
            }
        }

        if (formState.state === FormMechanicsState.NAVIGATE_TO_NEXT_TAB) {
            navigate(navigation.nextTabPath!(formState.id));
            onDestroy?.();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formState.state]);

    useBeforeUnload(
        (e) => {
            if (formState.isDirty) {
                e.preventDefault();
            }
        },
        { capture: true }
    );

    const PromptElements = useMemo(() => {
        return (
            <>
                <DialogPrompt
                    onProceed={onEditCancelConfirm}
                    ref={editPromptModalRef}
                    onReset={onEditCancelReset}
                />
                <RouterPrompt
                    when={formState.isDirty && formState.state === FormMechanicsState.EDIT}
                />
            </>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formState.isDirty, formState.state]);

    return {
        isCreate,
        formState,
        formComponentRef,
        onEdit,
        onStateFormChanged,
        onFormEditCancel,
        onClickSave,
        onSubmitStart,
        onNextClick,
        PromptElements,
        isEditFormMode: formState.state !== FormMechanicsState.VIEW,
        isLoading:
            formState.state === FormMechanicsState.SUBMIT_IN_PROGRESS ||
            formState.state === FormMechanicsState.NAVIGATE_TO_LIST ||
            formState.state === FormMechanicsState.NAVIGATE_TO_NEXT_TAB,
    };
};

export default useFormMechanics;
