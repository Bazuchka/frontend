import { FunctionComponent } from "react";
import { Control, Controller } from "react-hook-form";
import { IGoodPackage } from "src/features/ClientGood/store/GoodPackageStore";
import { DictionaryType } from "src/shared/hooks/useDictionary";
import { AutocompleteSelectOfDictionary } from "src/shared/UI/AutocompleteSelectOfDictionary/AutocompleteSelectOfDictionary";

interface GoodPackageGridProps {
    control: Control;
    row: {
        getValue: (key: string) => unknown;
        setValue: (key: string, value: unknown) => void;
    };
    isDisablePropName: string;
}

const GoodPackageColumn: FunctionComponent<GoodPackageGridProps> = ({
    control,
    row: { getValue, setValue },
    isDisablePropName,
}) => {
    return (
        <Controller
            name="goodPackage"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { invalid } }) => (
                <AutocompleteSelectOfDictionary
                    isDisable={!getValue(isDisablePropName)}
                    error={invalid}
                    value={value}
                    onValueChange={(data) => {
                        setValue(
                            "conversionQuantity",
                            (data as IGoodPackage).conversionQty ?? 1 // TODO Create ticket if goodpacakge/all doesn't have this field
                        );
                        setValue("dimensions", data);
                        onChange(data);
                    }}
                    dictionaryParams={{
                        type: DictionaryType.GOOD_PACKAGE,
                    }}
                />
            )}
        />
    );
};

export default GoodPackageColumn;
