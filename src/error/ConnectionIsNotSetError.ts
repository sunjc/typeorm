import {TypeORMError} from "./TypeORMError.ts";

/**
 * Thrown when user tries to execute operation that requires connection to be established.
 */
export class ConnectionIsNotSetError extends TypeORMError {
    constructor(dbType: string) {
        super(
            `Connection with ${dbType} database is not established. Check connection configuration.`
        );
    }
}
