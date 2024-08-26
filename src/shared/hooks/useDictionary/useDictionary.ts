/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";

import { IdCode } from "../../types";
import { actions } from "../../UI/SelectOfDictionary/actions";
import { getConfiguration } from "./src/getConfiguration";
import { DictionaryParams } from "./types";

type Reponse = {
    data: {
        content: unknown;
    };
};

const useDictionary = (params: DictionaryParams, disable?: boolean) => {
    const { type, urlParams, filter } = params;
    const [data, setData] = useState<IdCode[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setLoading] = useState(!disable);
    const [isDisable, setIsDisable] = useState(false);

    // @TODO need to use real type instead of any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getRecord = (id: string): any => {
        const record = data.filter((e) => e.id === id);
        return record.length === 1 ? record[0] : null;
    };

    const getDictionaries = useCallback(
        (params: DictionaryParams) => {
            const { url } = getConfiguration(params);

            if (url) {
                setIsDisable(true);
                actions
                    .getAll(url, filter)
                    .then((response) => {
                        if ((response as Reponse).data.content) {
                            setData((response as Reponse).data.content as unknown as IdCode[]);
                        } else {
                            setData((response as Reponse).data as unknown as IdCode[]);
                        }
                    })
                    //TODO mock error
                    .catch((error) => setError(error.message))
                    .finally(() => {
                        setLoading(false);
                        setIsDisable(false);
                    });
            }
        },
        [type, JSON.stringify(filter)]
    );

    useEffect(() => {
        if (!disable) {
            getDictionaries(params);
        }
    }, [type, urlParams, disable, getDictionaries, JSON.stringify(params)]);

    return { data, error, isLoading, getRecord, isDisable };
};

export default useDictionary;
