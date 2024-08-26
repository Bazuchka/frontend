export const timeFormatter = (totalMinutes: number) => {
    if (isNaN(totalMinutes) || !totalMinutes) {
        return "0:00";
    }
    const absTotalMinutes = Math.abs(totalMinutes);
    const hours = Math.floor(absTotalMinutes / 60);
    const minutes = absTotalMinutes % 60;

    const formattedHours = hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return totalMinutes > 0
        ? `${formattedHours}:${formattedMinutes}`
        : `-${formattedHours}:${formattedMinutes}`;
};
