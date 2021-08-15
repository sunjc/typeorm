import {FindOperator} from "./FindOperator.ts";

/**
 * Used for find operations.
 */
export type FindConditions<T> = {
    [P in keyof T]?: FindConditions<T[P]> | FindOperator<FindConditions<T[P]>>;
};
