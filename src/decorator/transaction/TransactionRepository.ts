import {getMetadataArgsStorage} from "../../globals.ts";
import {TransactionRepositoryMetadataArgs} from "../../metadata-args/TransactionRepositoryMetadataArgs.ts";
import {CannotReflectMethodParameterTypeError} from "../../error/CannotReflectMethodParameterTypeError.ts";

/**
 * Injects transaction's repository into the method wrapped with @Transaction decorator.
 */
export function TransactionRepository(entityType?: Function): ParameterDecorator {
    return (object: Object, methodName: string, index: number) => {

        // get repository type
        let repositoryType: Function;
        try {
            repositoryType = Reflect.getOwnMetadata("design:paramtypes", object, methodName)[index];
        } catch (err) {
            throw new CannotReflectMethodParameterTypeError(object.constructor, methodName);
        }

        getMetadataArgsStorage().transactionRepositories.push({
            target: object.constructor,
            methodName,
            index,
            repositoryType,
            entityType,
        } as TransactionRepositoryMetadataArgs);
    };
}
