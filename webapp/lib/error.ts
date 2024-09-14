export class ParamsInvalidError extends Error {
    static errorName: string = 'ParamsInvalidError';
    constructor(message?: string) {
        super(message);
        this.name = ParamsInvalidError.errorName;
    }
}

export class PermissionError extends Error {
    static errorName: string = 'PermissionError';
    constructor(message?: string) {
        super(message);
        this.name = PermissionError.errorName;
    }
}

type ErrorType = typeof ParamsInvalidError | typeof PermissionError;


export function assert(condition: unknown, message: string = "Request illegal", Err: ErrorType = ParamsInvalidError): asserts condition {
    if (!condition) {
        throw new Err(message);
    }
}
/**
 * Use in client because error thrown in server is only instance of Error
 */
export function isErr(err: Error, type: ErrorType) {
    return err.stack?.includes(type.errorName);
}