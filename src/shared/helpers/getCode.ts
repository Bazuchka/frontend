export const getValueForTextField =
    <T extends Record<string, string> | string>(fieldName?: string) =>
    (params: { getValue: () => T | null }) =>
        fieldName
            ? (params.getValue() as Record<string, string> | null)?.[fieldName] ?? "-"
            : params.getValue() ?? "-";
