export type Payload = {
    value: string;
    page: number;
    filter?: Record<string, object | string | boolean>;
};
