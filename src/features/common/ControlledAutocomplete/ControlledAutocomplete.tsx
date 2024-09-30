import { Control, Controller, FieldValues, RegisterOptions } from "react-hook-form";
import {
    AutocompleteSelectOfDictionary,
    AutocompleteSelectOfDictionaryProps,
} from "src/shared/UI/AutocompleteSelectOfDictionary/AutocompleteSelectOfDictionary";
import { ChosenSelectObject } from "src/shared/UI/SelectOfDictionaryForm/SelectOfDictionaryForm";

interface ControlledAutoCompleteProps<T extends ChosenSelectObject> {
    name: string;
    control: Control;
    rules:
        | Omit<
              RegisterOptions<FieldValues, string>,
              "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
          >
        | undefined;
    autoCompleteProps: Partial<AutocompleteSelectOfDictionaryProps<T>>;
}

const ControlledAutoComplete = <T extends ChosenSelectObject>({
    name,
    control,
    rules,
    autoCompleteProps,
}: ControlledAutoCompleteProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, value }, fieldState: { invalid } }) => (
                <AutocompleteSelectOfDictionary
                    value={value}
                    onValueChange={(data) => {
                        onChange(data);
                        autoCompleteProps?.onValueChange?.(data);
                    }}
                    dictionaryParams={autoCompleteProps.dictionaryParams}
                    dictionaryType={autoCompleteProps.dictionaryType}
                    error={invalid}
                />
            )}
        />
    );
};

export default ControlledAutoComplete;
