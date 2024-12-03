import { types } from "mobx-state-tree";
import { dateWithTimezone } from "../helpers";
import { dateWithoutTimezone } from "../helpers/composeDateTimeWithoutTimeZone";

function validateDate(str: string) {
    const date = Date.parse(str);
    if (isNaN(date)) {
        throw new Error("Invalid date");
    }

    return new Date(date);
}

export const IsoDate = types.custom<string, Date>({
    name: "IsoDate",
    fromSnapshot(value): Date {
        return validateDate(value as string);
    },
    toSnapshot(value): string {
        return value.toISOString();
    },
    isTargetType(maybeDate) {
        return maybeDate instanceof Date;
    },
    getValidationMessage(snapshot: string) {
        try {
            validateDate(snapshot);
            return "";
        } catch (error: unknown) {
            return (error as Error).message;
        }
    },
});

export const IsoUTCDate = types.custom<string, Date>({
    name: "IsoDate",
    fromSnapshot(value): Date {
        const validatedDate = validateDate(value as string);
        return dateWithTimezone(validatedDate);
    },
    toSnapshot(value): string {
        return dateWithoutTimezone(value).toISOString();
    },
    isTargetType(maybeDate) {
        return maybeDate instanceof Date;
    },
    getValidationMessage(snapshot: string) {
        try {
            validateDate(snapshot);
            return "";
        } catch (error: unknown) {
            return (error as Error).message;
        }
    },
});
