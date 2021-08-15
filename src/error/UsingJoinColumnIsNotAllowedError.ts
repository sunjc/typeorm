import {EntityMetadata} from "../metadata/EntityMetadata.ts";
import {RelationMetadata} from "../metadata/RelationMetadata.ts";
import {TypeORMError} from "./TypeORMError.ts";

export class UsingJoinColumnIsNotAllowedError extends TypeORMError {
    constructor(entityMetadata: EntityMetadata, relation: RelationMetadata) {
        super(
            `Using JoinColumn on ${entityMetadata.name}#${relation.propertyName} is wrong. ` +
            `You can use JoinColumn only on one-to-one and many-to-one relations.`
        );
    }
}
