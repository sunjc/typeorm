import {CockroachConnectionOptions} from "../driver/cockroachdb/CockroachConnectionOptions.ts";
import {MysqlConnectionOptions} from "../driver/mysql/MysqlConnectionOptions.ts";
import {PostgresConnectionOptions} from "../driver/postgres/PostgresConnectionOptions.ts";
import {SqliteConnectionOptions} from "../driver/sqlite/SqliteConnectionOptions.ts";
import {SqlServerConnectionOptions} from "../driver/sqlserver/SqlServerConnectionOptions.ts";
import {OracleConnectionOptions} from "../driver/oracle/OracleConnectionOptions.ts";
import {MongoConnectionOptions} from "../driver/mongodb/MongoConnectionOptions.ts";
import {CordovaConnectionOptions} from "../driver/cordova/CordovaConnectionOptions.ts";
import {SqljsConnectionOptions} from "../driver/sqljs/SqljsConnectionOptions.ts";
import {ReactNativeConnectionOptions} from "../driver/react-native/ReactNativeConnectionOptions.ts";
import {NativescriptConnectionOptions} from "../driver/nativescript/NativescriptConnectionOptions.ts";
import {ExpoConnectionOptions} from "../driver/expo/ExpoConnectionOptions.ts";
import {AuroraDataApiConnectionOptions} from "../driver/aurora-data-api/AuroraDataApiConnectionOptions.ts";
import {SapConnectionOptions} from "../driver/sap/SapConnectionOptions.ts";
import {AuroraDataApiPostgresConnectionOptions} from "../driver/aurora-data-api-pg/AuroraDataApiPostgresConnectionOptions.ts";
import {BetterSqlite3ConnectionOptions} from "../driver/better-sqlite3/BetterSqlite3ConnectionOptions.ts";
import {CapacitorConnectionOptions} from "../driver/capacitor/CapacitorConnectionOptions.ts";


/**
 * ConnectionOptions is an interface with settings and options for specific connection.
 * Options contain database and other connection-related settings.
 * Consumer must provide connection options for each of your connections.
 */
export type ConnectionOptions =
    MysqlConnectionOptions|
    PostgresConnectionOptions|
    CockroachConnectionOptions|
    SqliteConnectionOptions|
    SqlServerConnectionOptions|
    SapConnectionOptions|
    OracleConnectionOptions|
    CordovaConnectionOptions|
    NativescriptConnectionOptions|
    ReactNativeConnectionOptions|
    SqljsConnectionOptions|
    MongoConnectionOptions|
    AuroraDataApiConnectionOptions|
    AuroraDataApiPostgresConnectionOptions|
    ExpoConnectionOptions|
    BetterSqlite3ConnectionOptions |
    CapacitorConnectionOptions;
