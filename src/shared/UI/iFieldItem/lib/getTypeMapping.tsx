import { IFieldItemLink } from "src/shared/UI/iFieldItem/iFieldItemTypes/iFieldItemLink";
import { FIELD_TYPE } from "../const";
import { IFieldItemButton } from "../iFieldItemTypes/iFieldItemButton";
import { IFieldItemCheckbox } from "../iFieldItemTypes/iFieldItemCheckbox";
import { IFieldItemDate } from "../iFieldItemTypes/iFieldItemDate";
import { IFieldItemDateTime } from "../iFieldItemTypes/iFieldItemDateTime";
import { IFieldItemInput } from "../iFieldItemTypes/iFieldItemInput";
import { IFieldItemPassword } from "../iFieldItemTypes/iFieldItemPassword";
import { IFieldItemRating } from "../iFieldItemTypes/iFieldItemRating";
import { IFieldItemSelect } from "../iFieldItemTypes/iFieldItemSelect";
import { IFieldItemStatic } from "../iFieldItemTypes/iFieldItemStatic";
import { IFieldItemTime } from "../iFieldItemTypes/iFieldItemTime";
import { FieldItemProps, renderSelectValueProps } from "../types";
import { getColumnWidths } from "./getColumnWidths";
import { useRenderSelectValue } from "./useRenderSelectValue";

const Component = ({
    isDisable,
    isReadOnly,
    renderValuePrimary,
    renderValueSecondary,
    translatePath,
    value,
    fieldName,
}: renderSelectValueProps) =>
    useRenderSelectValue({
        isDisable,
        isReadOnly,
        renderValuePrimary,
        renderValueSecondary,
        translatePath,
        value,
        fieldName,
    });

export const getTypeMapping = (props: FieldItemProps) => {
    const {
        fullLine,
        label,
        value,
        withDescription,
        description,
        isReadOnly,
        isLabelNarrow,
        component,
        renderValuePrimary,
        renderValueSecondary,
        isDisable,
        translatePath,
        fieldName,
        linkTo,
        testFieldName,
        events,
    } = props;

    const { labelWidth, valueWidth } = getColumnWidths(isLabelNarrow, withDescription);

    const typeMapping: Record<FIELD_TYPE, JSX.Element> = {
        [FIELD_TYPE.PASSWORD]: (
            <IFieldItemPassword
                fullLine={fullLine}
                labelWidth={labelWidth}
                valueWidth={valueWidth}
                label={label}
                fieldName={fieldName}
                testFieldName={testFieldName}
            />
        ),
        [FIELD_TYPE.CHECKBOX]: (
            <IFieldItemCheckbox
                fullLine={fullLine}
                labelWidth={labelWidth}
                valueWidth={valueWidth}
                label={label}
                value={value}
                withDescription={withDescription}
                description={description}
                fieldName={fieldName}
                testFieldName={testFieldName}
            />
        ),
        [FIELD_TYPE.DATE]: (
            <IFieldItemDate
                fullLine={fullLine}
                labelWidth={labelWidth}
                valueWidth={valueWidth}
                label={label}
                value={value}
                fieldName={fieldName}
                isDisable={isDisable}
                testFieldName={testFieldName}
            />
        ),
        [FIELD_TYPE.DATE_TIME]: (
            <IFieldItemDateTime
                fullLine={fullLine}
                labelWidth={labelWidth}
                valueWidth={valueWidth}
                label={label}
                value={value}
                fieldName={fieldName}
                isDisable={isDisable}
                testFieldName={testFieldName}
            />
        ),
        [FIELD_TYPE.SELECT]: (
            <IFieldItemSelect
                fullLine={fullLine}
                labelWidth={labelWidth}
                valueWidth={valueWidth}
                label={label}
                value={value}
                fieldName={fieldName}
                testFieldName={testFieldName}
                renderSelectValue={(value) =>
                    Component({
                        isDisable,
                        isReadOnly,
                        renderValuePrimary,
                        renderValueSecondary,
                        translatePath,
                        value,
                        fieldName,
                    })
                }
            />
        ),
        [FIELD_TYPE.RATING]: (
            <IFieldItemRating
                fullLine={fullLine}
                labelWidth={labelWidth}
                valueWidth={valueWidth}
                label={label}
                value={value}
                fieldName={fieldName}
                isDisable={isDisable}
                testFieldName={testFieldName}
            />
        ),
        [FIELD_TYPE.STATIC]: (
            <IFieldItemStatic
                testFieldName={testFieldName}
                fullLine={fullLine}
                component={component}
                fieldName={fieldName}
            />
        ),
        [FIELD_TYPE.LINK]: (
            <IFieldItemLink
                fullLine={fullLine}
                labelWidth={labelWidth}
                valueWidth={valueWidth}
                label={label}
                value={value}
                fieldName={fieldName}
                withDescription={withDescription}
                description={description}
                linkTo={linkTo as string}
                testFieldName={testFieldName}
            />
        ),
        [FIELD_TYPE.DEFAULT]: (
            <IFieldItemInput
                fullLine={fullLine}
                labelWidth={labelWidth}
                valueWidth={valueWidth}
                label={label}
                value={value}
                fieldName={fieldName}
                withDescription={withDescription}
                description={description}
                isDisable={isDisable}
                testFieldName={testFieldName}
            />
        ),
        [FIELD_TYPE.BUTTON]: (
            <IFieldItemButton
                valueWidth={valueWidth}
                disabled={isDisable}
                label={label}
                onButtonClick={events?.onButtonClick}
                fullLine={fullLine}
            />
        ),
        [FIELD_TYPE.TIME]: (
            <IFieldItemTime
                fullLine={fullLine}
                labelWidth={labelWidth}
                valueWidth={valueWidth}
                label={label}
                value={value}
                fieldName={fieldName}
                isDisable={isDisable}
                testFieldName={testFieldName}
            />
        ),
    };

    return typeMapping;
};
