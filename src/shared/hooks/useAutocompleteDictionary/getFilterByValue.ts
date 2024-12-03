import { SEARCH_TYPE } from "src/shared/enums";

function getFilterByValue(value: string) {
    if (value.includes("*")) {
        return {
            code: {
                type: SEARCH_TYPE.LIKE,
                content: value,
                byOr: true,
            },
            name: {
                type: SEARCH_TYPE.LIKE,
                content: value,
                byOr: true,
            },
        };
    } else {
        return {
            code: {
                type: SEARCH_TYPE.CONTAINS,
                content: value,
                byOr: true,
            },
            name: {
                type: SEARCH_TYPE.CONTAINS,
                content: value,
                byOr: true,
            },
        };
    }
}

export default getFilterByValue;
