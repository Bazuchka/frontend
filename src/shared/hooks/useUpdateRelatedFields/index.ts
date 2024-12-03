import { useCallback, useRef } from "react";

const createdIdDefaultElement = "-1";

export const useUpdateRelatedFields = (depth: number, prevIds?: Array<string | undefined>) => {
    const fieldsInfo = useRef(
        new Map(
            Array(depth)
                .fill(createdIdDefaultElement)
                .map((prevId, index) => [
                    index,
                    { prevId: prevIds?.[index] ?? prevId, shouldUpdate: false },
                ])
        )
    );

    const updateNextFieldData = useCallback((index: number, valueId: string) => {
        if (fieldsInfo.current.size < index + 1) {
            return;
        }

        if (fieldsInfo.current.size === index + 1) {
            fieldsInfo.current.get(index)!.prevId = valueId;
            return;
        }

        const current = fieldsInfo.current.get(index);

        const shouldUpdateNextFieldCondition =
            !current?.shouldUpdate &&
            (current?.prevId !== createdIdDefaultElement || valueId === null) && // in case some other fields of form changes it should not update next field
            current?.prevId !== valueId;

        if (shouldUpdateNextFieldCondition) {
            fieldsInfo.current.set(index + 1, {
                shouldUpdate: true,
                prevId: fieldsInfo.current.get(index + 1)?.prevId,
            });
        }
        fieldsInfo.current.get(index)!.prevId =
            valueId === null ? null : valueId || createdIdDefaultElement;
    }, []);

    const shouldUpdate = (level: number) => {
        return fieldsInfo.current.get(level)?.shouldUpdate;
    };

    const resetShouldUpdateFlag = (level: number) => {
        fieldsInfo.current.get(level)!.shouldUpdate = false;
    };

    const reset = useCallback(() => {
        fieldsInfo.current = new Map(
            Array(depth)
                .fill(createdIdDefaultElement)
                .map((prevId, index) => [
                    index,
                    { prevId: prevIds?.[index] ?? prevId, shouldUpdate: false },
                ])
        );
    }, [depth, prevIds]);

    return {
        updateNextFieldData,
        shouldUpdate,
        fieldsInfo,
        resetShouldUpdateFlag,
        reset,
    };
};
