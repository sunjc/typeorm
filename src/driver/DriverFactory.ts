import {MissingDriverError} from "../error/MissingDriverError.ts";
import {CockroachDriver} from "./cockroachdb/CockroachDriver.ts";
import {MongoDriver} from "./mongodb/MongoDriver.ts";
import {SqlServerDriver} from "./sqlserver/SqlServerDriver.ts";
import {OracleDriver} from "./oracle/OracleDriver.ts";
import {SqliteDriver} from "./sqlite/SqliteDriver.ts";
import {CordovaDriver} from "./cordova/CordovaDriver.ts";
import {ReactNativeDriver} from "./react-native/ReactNativeDriver.ts";
import {NativescriptDriver} from "./nativescript/NativescriptDriver.ts";
import {SqljsDriver} from "./sqljs/SqljsDriver.ts";
import {MysqlDriver} from "./mysql/MysqlDriver.ts";
import {PostgresDriver} from "./postgres/PostgresDriver.ts";
import {ExpoDriver} from "./expo/ExpoDriver.ts";
import {AuroraDataApiDriver} from "./aurora-data-api/AuroraDataApiDriver.ts";
import {AuroraDataApiPostgresDriver} from "./aurora-data-api-pg/AuroraDataApiPostgresDriver.ts";
import {Driver} from "./Driver.ts";
import {Connection} from "../connection/Connection.ts";
import {SapDriver} from "./sap/SapDriver.ts";
import {BetterSqlite3Driver} from "./better-sqlite3/BetterSqlite3Driver.ts";
import {CapacitorDriver} from "./capacitor/CapacitorDriver.ts";

/**
 * Helps to create drivers.
 */
export class DriverFactory {

    /**
     * Creates a new driver depend on a given connection's driver type.
     */
    create(connection: Connection): Driver {
        const {type} = connection.options;
        switch (type) {
            case "mysql":
                return new MysqlDriver(connection);
            case "postgres":
                return new PostgresDriver(connection);
            case "cockroachdb":
                return new CockroachDriver(connection);
            case "sap":
                return new SapDriver(connection);
            case "mariadb":
                return new MysqlDriver(connection);
            case "sqlite":
                return new SqliteDriver(connection);
            case "better-sqlite3":
                return new BetterSqlite3Driver(connection);
            case "cordova":
                return new CordovaDriver(connection);
            case "nativescript":
                return new NativescriptDriver(connection);
            case "react-native":
                return new ReactNativeDriver(connection);
            case "sqljs":
                return new SqljsDriver(connection);
            case "oracle":
                return new OracleDriver(connection);
            case "mssql":
                return new SqlServerDriver(connection);
            case "mongodb":
                return new MongoDriver(connection);
            case "expo":
                return new ExpoDriver(connection);
            case "aurora-data-api":
                return new AuroraDataApiDriver(connection);
            case "aurora-data-api-pg":
                return new AuroraDataApiPostgresDriver(connection);
            case "capacitor":
                return new CapacitorDriver(connection);
            default:
                throw new MissingDriverError(
                    type,
                    [
                        "aurora-data-api",
                        "aurora-data-api-pg",
                        "better-sqlite3",
                        "capacitor",
                        "cockroachdb",
                        "cordova",
                        "expo",
                        "mariadb",
                        "mongodb",
                        "mssql",
                        "mysql",
                        "nativescript",
                        "oracle",
                        "postgres",
                        "react-native",
                        "sap",
                        "sqlite",
                        "sqljs",
                    ]
                );
        }
    }

}
