export interface ResponseErrorType {
    category?: string | null;
    context?: string | null;
    contextObject?: Record<string, object | string> | null;
    errorMessage?: string | null;
    exceptionResult?: string | null;
    integrationMethod?: string | null;
    integrationSystem?: string | null;
    method?: string | null;
    methodName?: string | null;
    operation?: string | null;
    parameterName?: string | null;
    requestUrl?: string | null;
    validationError?: string | null;
    errorCode?: string | null;
}
