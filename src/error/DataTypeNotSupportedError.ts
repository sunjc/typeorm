import {ColumnType} from "../driver/types/ColumnTypes.ts";
import {DatabaseType} from "../driver/types/DatabaseType.ts";
import {ColumnMetadata} from "../metadata/ColumnMetadata.ts";
import {TypeORMError} from "./TypeORMError.ts";

export class DataTypeNotSupportedError extends TypeORMError {
    constructor(column: ColumnMetadata, dataType: ColumnType, database?: DatabaseType) {
        super();

        const type = typeof dataType === "string" ? dataType : (<any>dataType).name;
        this.message = `Data type "${type}" in "${column.entityMetadata.targetName}.${column.propertyName}" is not supported by "${database}" database.`;
    }
}
