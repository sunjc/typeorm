import {EntityMetadata} from "../metadata/EntityMetadata.ts";
import {TypeORMError} from "./TypeORMError.ts";

export class MissingPrimaryColumnError extends TypeORMError {
    constructor(entityMetadata: EntityMetadata) {
        super(
            `Entity "${entityMetadata.name}" does not have a primary column. Primary column is required to ` +
            `have in all your entities. Use @PrimaryColumn decorator to add a primary column to your entity.`
        );
    }
}
