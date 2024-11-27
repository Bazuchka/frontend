import { format } from "date-fns";
import { ru } from "date-fns/locale";

import i18next from "i18next";
import { Locales } from "src/shared/types";

export const dateFormatter = (dateValue: Date) => {
    const currentLocale = i18next.language;

    if (!dateValue) {
        return "";
    }

    const date = new Date(dateValue);

    const currentFormat: Record<string, string> = {
        ru: "dd.MM.yyyy HH:mm:ss",
        en: "MM/dd/yyyy, HH:mm:ss",
        locale: "MM/dd/yyyy, HH:mm:ss",
    };

    const dateFormat = currentFormat[currentLocale];

    return format(date, dateFormat, { locale: currentLocale === Locales.ru ? ru : undefined });
};

export const getNowDate = (dateFormat = "dd-MM-yyyy_HH-mm") => {
    return format(new Date(), dateFormat);
};
