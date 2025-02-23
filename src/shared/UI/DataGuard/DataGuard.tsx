import { LinearProgress } from "@mui/material";

interface DataGuardProps<T> {
    whenExist: T | null | undefined;
    children?: (data: NonNullable<T>) => JSX.Element;
}

const DataGuard = <T,>({ whenExist, children }: DataGuardProps<T>) => {
    return whenExist ? children?.(whenExist) : <LinearProgress />;
};

export default DataGuard;
