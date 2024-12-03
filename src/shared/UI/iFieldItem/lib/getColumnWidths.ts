export const getColumnWidths = (
    isLabelNarrow: boolean | undefined,
    withDescription: boolean | undefined
) => {
    return {
        labelWidth: isLabelNarrow ? (withDescription ? 4 : 2) : 4,
        valueWidth: isLabelNarrow ? (withDescription ? 8 : 10) : 8,
    };
};
