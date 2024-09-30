import { enUS, ruRU } from "@mui/x-date-pickers/locales";
import { HttpStatusCode } from "axios";
import { enGB, ru } from "date-fns/locale";
import { FieldValues, UseFormReturn } from "react-hook-form";

export interface IdOnly {
    id: string | null;
}
export interface IdSequential {
    id: string;
    sequenceNumber: string;
}
export interface User {
    id: string;
    username: string;
    fullName: string;
}

export interface IdCode extends IdOnly {
    code: string;
}

export interface IdLineNumber extends IdOnly {
    lineNumber: number;
}

export interface IdCodeName extends IdCode {
    name: string;
}

export interface IdCodeActive extends IdCode {
    active: boolean;
}

export interface IdCodeNameActive extends IdCode {
    name: string;
    active: boolean;
}

export type UUID = string;

export interface ResponseTemplate {
    status: HttpStatusCode;
}

export interface ListResponseTemplate<T> extends ResponseTemplate {
    data: {
        content: T[];
    };
    status: HttpStatusCode;
}

export interface DataResponseTemplate<T> extends ResponseTemplate {
    data: T;
}

export enum PermissionLevel {
    NO_ACCESS = "NO_ACCESS",
    READ = "READ",
    WRITE = "WRITE",
    CREATE = "CREATE",
    DELETE = "DELETE",
}

export type ButtonActionType = "create" | "edit" | "delete";

export interface Result {
    success: boolean;
}

export interface IValidateMask {
    mask: string | Array<string | RegExp>;
    pattern: RegExp;
    placeholder: string;
    maskChar?: null; //library feature null = "", undefined = "_"
}

export const Masks = {
    PHONE_MASK: {
        mask: "+7 (999) 999-99-99",
        pattern: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
        placeholder: "+7 (999) 999-99-99",
    },
    VEHICLE_NUMBER_MASK: {
        mask: [
            /^[A-ZА-Я]/,
            /^[0-9]/,
            /^[0-9]/,
            /^[0-9]/,
            /^[A-ZА-Я]/,
            /^[A-ZА-Я]/,
            /^[0-9]/,
            /^[0-9]/,
            /^[0-9]/,
        ],
        pattern: /^[A-ZА-Я]\d{3}[A-ZА-Я]{2}\d{2,3}$/,
        placeholder: "A777AA777",
        maskChar: null,
    },
    TIME_MASK: {
        mask: [/[0-2]/, /[0-9]/, ":", /[0-5]/, /[0-9]/],
        pattern: /^[01][0-9]|2[0-3]:[0-5][0-9]|(24:00)$/,
        placeholder: "00:00",
        maskChar: null,
    },
};

export type AttributeType = {
    id: string;
    code: string;
    valueType: string;
};

export enum FieldType {
    BOOLEAN = "BOOLEAN",
    NUMBER = "NUMBER",
    ENUM = "ENUM",
    ID = "ID",
    TEXT = "TEXT",
    DATE = "DATE",
    ENTITY = "ENTITY",
    FIELD = "FIELD",
}

export type UseForm = UseFormReturn<FieldValues, unknown, FieldValues>;

export enum Locales {
    ru = "ru",
    en = "en",
}

type DatePickerLocaleConfiguration = Record<string, Partial<Locale>>;
export const DATE_PICKER_LOCALE_CONFIGURATION: DatePickerLocaleConfiguration = {
    en: enGB,
    ru: ru,
};

export const DATE_PICKER_TEXT_LOCALE_CONFIGURATION: Record<string, object> = {
    en: enUS.components.MuiLocalizationProvider.defaultProps.localeText,
    ru: ruRU.components.MuiLocalizationProvider.defaultProps.localeText,
};

export type Nullable<T> = T | null;

export enum AlertMode {
    success = "success",
    info = "info",
    warning = "warning",
    error = "error",
}

export type PageResponse<T> = {
    content: T[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    first: boolean;
    size: number;
    number: number;
    sort: Sort[];
    numberOfElements: number;
    empty: boolean;
    pageable: Pageable;
};

export type Pageable = {
    sort: Sort[];
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
};

type Sort = {
    direction: string;
    property: string;
    ignoreCase: boolean;
    nullHandling: string;
    ascending: boolean;
    descending: boolean;
};
