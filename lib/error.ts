export class ParamsInvalidError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = 'ParamsInvalidError';
    }
}

export class PermissionError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = 'AuthenticatedError';
    }
}

type ErrorType = typeof ParamsInvalidError | typeof PermissionError;


export function assert(condition: boolean, message: string, Err: ErrorType = ParamsInvalidError): asserts condition {
    if (!condition) {
        throw new Err(message);
    }
}