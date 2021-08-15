import {TypeORMError} from "./TypeORMError.ts";

export class PrimaryColumnCannotBeNullableError extends TypeORMError {
    constructor(object: Object, propertyName: string) {
        super(
            `Primary column ${(<any>object.constructor).name}#${propertyName} cannot be nullable. ` +
            `Its not allowed for primary keys. Try to remove nullable option.`
        );
    }
}
