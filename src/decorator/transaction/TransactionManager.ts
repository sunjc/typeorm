import {getMetadataArgsStorage} from "../../globals.ts";
import {TransactionEntityMetadataArgs} from "../../metadata-args/TransactionEntityMetadataArgs.ts";

/**
 * Injects transaction's entity manager into the method wrapped with @Transaction decorator.
 */
export function TransactionManager(): ParameterDecorator {
    return function (object: Object, methodName: string, index: number) {

        getMetadataArgsStorage().transactionEntityManagers.push({
            target: object.constructor,
            methodName: methodName,
            index: index,
        } as TransactionEntityMetadataArgs);
    };
}
