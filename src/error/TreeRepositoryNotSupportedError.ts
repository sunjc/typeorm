import {Driver} from "../driver/Driver.ts";
import {TypeORMError} from "./TypeORMError.ts";

export class TreeRepositoryNotSupportedError extends TypeORMError {
    constructor(driver: Driver) {
        super(
            `Tree repositories are not supported in ${driver.options.type} driver.`
        );
    }
}
