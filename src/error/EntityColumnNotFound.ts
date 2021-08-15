import {TypeORMError} from "./TypeORMError.ts";

export class EntityColumnNotFound extends TypeORMError {
    constructor(propertyPath: string) {
        super(
            `No entity column "${propertyPath}" was found.`
        );
    }
}
