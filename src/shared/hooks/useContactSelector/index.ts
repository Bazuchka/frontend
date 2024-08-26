import { useEffect, useState } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import { useUpdateRelatedFields } from "../useUpdateRelatedFields";

type BasicEntity = { id: string; code: string } | null;

const useContractSelector = (
    isEditFormMode: boolean,
    defaultSelectedValues?: { client: BasicEntity; legalEntity: BasicEntity; contract: BasicEntity }
) => {
    const [selectedData, setSelectedData] = useState<{
        legalEntity: BasicEntity;
        client: BasicEntity;
        contract: BasicEntity;
    }>(
        defaultSelectedValues ?? {
            legalEntity: null,
            client: null,
            contract: null,
        }
    );

    const { updateNextFieldData, shouldUpdate, resetShouldUpdateFlag, reset } =
        useUpdateRelatedFields(3, [
            selectedData.client?.id,
            selectedData.legalEntity?.id,
            selectedData.contract?.id,
        ]);
    const onClientChange = (values: FieldValues, setValue: UseFormSetValue<FieldValues>) => {
        const clientId = values?.client === null ? null : values?.client?.id;

        updateNextFieldData(0, clientId);

        if (shouldUpdate(1)) {
            resetShouldUpdateFlag(1);
            setValue("legalEntity", null);
        }
    };

    const onLegalEntityChange = (values: FieldValues, setValue: UseFormSetValue<FieldValues>) => {
        const legalEntityId = values?.legalEntity === null ? null : values?.legalEntity?.id;
        updateNextFieldData(1, legalEntityId);

        if (shouldUpdate(2)) {
            resetShouldUpdateFlag(2);
            setValue("contract", null);
        }
    };

    const onContractChange = (values: FieldValues) => {
        const legalEntity = values?.legalEntity;
        const client = values?.client;
        const contract = values?.contract;

        setSelectedData({ legalEntity, client, contract });

        const contractId = contract?.id;
        updateNextFieldData(2, contractId);
    };

    useEffect(() => {
        if (!isEditFormMode) {
            setSelectedData(
                defaultSelectedValues ?? { legalEntity: null, client: null, contract: null }
            );
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditFormMode]);

    return {
        onClientChange,
        onLegalEntityChange,
        onContractChange,
        selectedData,
    };
};

export default useContractSelector;
