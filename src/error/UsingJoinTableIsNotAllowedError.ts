import {EntityMetadata} from "../metadata/EntityMetadata.ts";
import {RelationMetadata} from "../metadata/RelationMetadata.ts";
import {TypeORMError} from "./TypeORMError.ts";

export class UsingJoinTableIsNotAllowedError extends TypeORMError {
    constructor(entityMetadata: EntityMetadata, relation: RelationMetadata) {
        super(
            `Using JoinTable on ${entityMetadata.name}#${relation.propertyName} is wrong. ` +
            `${entityMetadata.name}#${relation.propertyName} has ${relation.relationType} relation, ` +
            `however you can use JoinTable only on many-to-many relations.`
        );
    }
}
