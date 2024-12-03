/* Checking an array for its length * */
function isArrayWithLength(arr: unknown[]): boolean {
    return Boolean(Array.isArray(arr) && arr.length);
}

export default isArrayWithLength;
