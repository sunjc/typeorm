import {TypeORMError} from "./TypeORMError.ts";

export class QueryRunnerAlreadyReleasedError extends TypeORMError {
    constructor() {
        super(
            `Query runner already released. Cannot run queries anymore.`
        );
    }
}
