import {TypeORMError} from "./TypeORMError.ts";

export class NestedSetMultipleRootError extends TypeORMError {
    constructor() {
        super(
            `Nested sets do not support multiple root entities.`
        );
    }
}
