import {EntityMetadata} from "../metadata/EntityMetadata.ts";
import {TypeORMError} from "./TypeORMError.ts";

export class MissingDeleteDateColumnError extends TypeORMError {
    constructor(entityMetadata: EntityMetadata) {
        super(
            `Entity "${entityMetadata.name}" does not have delete date columns.`
        );
    }
}
