import {TypeORMError} from "./TypeORMError.ts";

/**
 * Thrown when consumer tries to get connection that does not exist.
 */
export class ConnectionNotFoundError extends TypeORMError {
    constructor(name: string) {
        super(
            `Connection "${name}" was not found.`
        );
    }
}
