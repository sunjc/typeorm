import {RelationMetadata} from "../metadata/RelationMetadata.ts";
import {TypeORMError} from "./TypeORMError.ts";

/**
 * Thrown when relation has array initialized which is forbidden my ORM.
 *
 * @see https://github.com/typeorm/typeorm/issues/1319
 * @see http://typeorm.io/#/relations-faq/avoid-relation-property-initializers
 */
export class InitializedRelationError extends TypeORMError {
    constructor(relation: RelationMetadata) {
        super(
            `Array initializations are not allowed in entity relations. ` +
            `Please remove array initialization (= []) from "${relation.entityMetadata.targetName}#${relation.propertyPath}". ` +
            `This is ORM requirement to make relations to work properly. Refer docs for more information.`
        );
    }
}
