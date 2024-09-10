/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { Box, CircularProgress, Grid, useTheme } from "@mui/material";
import { ForwardedRef, forwardRef, memo, useEffect, useImperativeHandle, useRef } from "react";
import { useForm } from "react-hook-form";
import { FieldGroup, FieldItem } from "src/shared/UI/iFieldItem/types";
import IFormField from "../iFieldItem/IFieldItem";
import { IFormGroup } from "../iFormGroup";
import { useIFormStyles } from "./styles";
import { FormProps } from "./types";

export type SubmitHandle = {
    submitForm: () => void;
};

const IFormComponentForwarded = (
    {
        setEditRowNext,
        isWaitingStore,
        onSubmit,
        fields,
        setEditRow,
        editRow,
        editRowExtraSync,
        setEditRowExtraSync,
        requestParamsField,
        setRequestParams,
        setIsDisable,
        disableField,
        isHorizontalDirection,
        onTriggerFieldsChange,
        isLoading,
        name,
        isEditMode,
        onLoad,
        onFormStateChange,
    }: FormProps,
    ref: ForwardedRef<SubmitHandle>
) => {
    const theme = useTheme();
    const classes = useIFormStyles({ theme });
    const form = useForm();
    const {
        handleSubmit,
        control,
        getValues,
        watch,
        setValue,
        formState: { errors, isValid, isDirty },
        register,
        trigger,
        reset,
    } = form;

    useEffect(() => {
        onLoad && onLoad(form);
    }, [form]);

    const requestParamsValue = watch(requestParamsField as string);
    const disableValue = watch(disableField as string);

    const triggerValues = Object.keys(onTriggerFieldsChange ?? {}).map((key) => ({
        key,
        value: watch(key),
    }));

    const dependencies = triggerValues?.map(({ value }) => value ?? "") || [];

    useEffect(() => {
        if (onTriggerFieldsChange && isEditMode) {
            const values = triggerValues.reduce<{ [x: string]: object }>(
                (acc, { key, value }) => ({
                    ...acc,
                    [key]: value,
                }),
                {}
            );
            triggerValues?.forEach(({ key }) => {
                const cb = onTriggerFieldsChange[key];
                cb(values, setValue);
            });
        }
    }, [...dependencies]);

    useEffect(() => {
        if (setRequestParams && !!requestParamsField) {
            const params: Record<string, object> = {};
            params[requestParamsField] = requestParamsValue;
            setRequestParams(params);
        }
    }, [requestParamsValue]);

    useEffect(() => {
        if (typeof disableValue === "boolean" && setIsDisable) {
            setIsDisable(disableValue);
        }
    }, [disableValue]);

    const getFormFields = () => {
        const args = getValues();
        for (const item in args) {
            if (args[item] === undefined || args[item] === "") {
                delete args[item];
            }
        }
        // Needed for extra tabs synchronization (when mainInfo is split into several tabs)
        if (!editRowExtraSync && name) {
            setEditRowNext && setEditRowNext({ ...editRow, ...args }, name);
        } else {
            setEditRow && setEditRow({ ...editRow, ...args });
            setEditRowExtraSync && setEditRowExtraSync({ ...editRowExtraSync, ...args });
        }
    };

    useEffect(() => {
        if (!isEditMode) {
            reset();
        }
        return () => {
            if (isEditMode) {
                getFormFields();
            }
        };
    }, [isEditMode, isWaitingStore]);

    useEffect(() => {
        onFormStateChange?.({ isValid, isDirty, errors });
    }, [isValid, isDirty, errors, onFormStateChange]);

    useImperativeHandle(ref, () => {
        return {
            submitForm,
        };
    });

    const submitForm = handleSubmit((data) => {
        if (!isFormValidateErrors) {
            onSubmit && onSubmit(data);
        }
    });

    const boxRef = useRef<HTMLDivElement>(null);

    const isFormValidateErrors = Boolean(Object.keys(errors).length);

    const getFormField = (field: FieldItem) => {
        return (
            <IFormField
                key={field.label}
                label={field.label}
                isReadOnly={!isEditMode || !!field.readOnly}
                control={control}
                value={field.value}
                externalValue={field.externalValue}
                type={field.type}
                fieldName={field.name}
                id={field.id}
                dictionaryType={field.dictionaryType}
                fullLine={field.fullLine}
                translatePath={field.translatePath}
                isDisable={field.isDisable}
                requestParams={field.requestParams}
                component={field.component}
                isLabelNarrow={isHorizontalDirection ? !field.fullLine : field.fullLine}
                withDescription={field.withDescription}
                description={field.description}
                required={field.required}
                error={Boolean(errors[field.name])}
                renderValuePrimary={field.renderValuePrimary}
                renderValueSecondary={field.renderValueSecondary}
                nonEditableValue={field.nonEditableValue}
                withClearButton={field.withClearButton}
                register={register}
                validateMask={field.validateMask}
                options={field.options}
                trigger={trigger}
                onClear={field.onClear}
                min={field?.min}
                max={field?.max}
                validate={field.validate}
                linkTo={field.linkTo}
                testFieldName={field.testFieldName}
                events={field.events}
            />
        );
    };
    const getFormGroup = (group: FieldGroup) => {
        return group.name ? (
            <Grid
                item
                key={group.name}
                className={
                    isHorizontalDirection ? classes.horizontalDirection : classes.verticalDirection
                }>
                <IFormGroup key={group.name} label={group.name}>
                    <Grid container>{group.fields.map((field) => getFormField(field))}</Grid>
                </IFormGroup>
            </Grid>
        ) : (
            <Grid container columns={12} key={group.name}>
                {group.fields.map((field) => getFormField(field))}
            </Grid>
        );
    };

    if (isWaitingStore) {
        return (
            <Box sx={{ height: "248px", display: "flex", alignItems: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box ref={boxRef} sx={{ overflowY: "auto", overflowX: "hidden", paddingRight: "3px" }}>
            <form className={classes.form}>
                {isLoading ? (
                    <Grid item xs={12} className={classes.loadContainer}>
                        <CircularProgress />
                    </Grid>
                ) : fields && !Object.prototype.hasOwnProperty.call(fields[0], "fields") ? (
                    <Grid container columns={12}>
                        {fields.map((field) => getFormField(field as FieldItem))}
                    </Grid>
                ) : (
                    <Grid container columns={12}>
                        {fields.map((field) => getFormGroup(field as FieldGroup))}
                    </Grid>
                )}
            </form>
        </Box>
    );
};

export const IFormComponent = memo(forwardRef(IFormComponentForwarded));
