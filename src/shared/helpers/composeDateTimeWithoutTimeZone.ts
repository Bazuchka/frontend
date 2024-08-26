import { addHours, addMinutes } from "date-fns";

export const dateWithoutTimezone = (date: Date) => {
    const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
    const withoutTimezone = new Date(date.valueOf() - tzoffset);
    return withoutTimezone;
};

export const dateWithTimezone = (date: Date) => {
    const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
    const withoutTimezone = new Date(date.valueOf() + tzoffset);
    return withoutTimezone;
};

export const composeDateTimeWithoutTimeZone = (date: Date, time: Date) => {
    return addMinutes(addHours(dateWithoutTimezone(date), time.getHours()), time.getMinutes());
};
