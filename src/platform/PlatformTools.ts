import * as path from "https://deno.land/std/path/mod.ts";
import * as colors from "https://deno.land/std/fmt/colors.ts";
export type ReadStream = unknown;

// TODO(Sunjc) implement EventEmitter
export class EventEmitter {
    constructor() {
        throw new Error('EventEmitter.constructor');
    }
}
// TODO(Sunjc) implement Readable
export class Readable {
    constructor() {
        throw new Error('Readable.constructor');
    }
}

// TODO(Sunjc) implement Writable
export class Writable {
    constructor() {
        throw new Error('Writable.constructor');
    }
}

/**
 * Platform-specific tools.
 */
export class PlatformTools {

    /**
     * Type of the currently running platform.
     */
    static type: "browser"|"deno" = "deno";

    /**
     * Gets global variable where global stuff can be stored.
     */
    static getGlobalVariable(): any {
        return window;
    }

    /**
     * Loads ("require"-s) given file or package.
     * This operation only supports on node platform
     */
    static load(name: string): any {

        // if name is not absolute or relative, then try to load package from the node_modules of the directory we are currently in
        // this is useful when we are using typeorm package globally installed and it accesses drivers
        // that are not installed globally

            // switch case to explicit require statements for webpack compatibility.

        switch (name) {

            /**
             * mongodb
             */
            case "mongodb":
                return import("https://deno.land/x/mongodb/mod.ts");

            /**
             * mysql
             */
            case "mysql":
                return import("https://deno.land/x/mysql/mod.ts");

            /**
             * postgres
             */
            case "pg":
                return import("https://deno.land/x/postgres/mod.ts");
            /**
             * redis
             */
            case "redis":
                return import("https://deno.land/x/redis/mod.ts");

            /**
             * sqlite
             */
            case "sqlite3":
                return import("https://deno.land/x/sqlite/mod.ts");

            /**
             * sqlserver
             */
            case "mssql":
                return import("https://deno.land/x/mssql/mod.ts");
        }

        // If nothing above matched and we get here, the package was not listed within PlatformTools
        // and is an Invalid Package.  To make it explicit that this is NOT the intended use case for
        // PlatformTools.load - it's not just a way to replace `require` all willy-nilly - let's throw
        // an error.
        throw new TypeError(`Invalid Package for PlatformTools.load: ${name}`);
    }

    /**
     * Normalizes given path. Does "path.normalize".
     */
    static pathNormalize(pathStr: string): string {
        return path.normalize(pathStr);
    }

    /**
     * Gets file extension. Does "path.extname".
     */
    static pathExtname(pathStr: string): string {
        return path.extname(pathStr);
    }

    /**
     * Resolved given path. Does "path.resolve".
     */
    static pathResolve(pathStr: string): string {
        return path.resolve(pathStr);
    }

    /**
     * Synchronously checks if file exist. Does "fs.existsSync".
     */
    static fileExist(pathStr: string): boolean {
        throw new Error('PlatformTools.fileExist');
    }

    static readFile(filename: string): Promise<Uint8Array> {
        return Deno.readFile(filename);
    }

    static readFileSync(filename: string): Uint8Array {
        return Deno.readFileSync(filename);
    }

    static appendFileSync(filename: string, data: any): void {
        throw new Error('PlatformTools.appendFileSync');
    }

    static async writeFile(path: string, data: any): Promise<void> {
        if (data instanceof Uint8Array) {
            return Deno.writeFile(path, data);
        } else {
            return Deno.writeTextFile(path, data);
        }
    }

    /**
     * Gets environment variable.
     */
    static getEnvVariable(name: string): any {
        return Deno.env.get(name);
    }

    // TODO(Sunjc) implement this method.
    /**
     * Highlights sql string to be print in the console.
     */
    static highlightSql(sql: string) {
        return sql;
    }

    // TODO(Sunjc) implement this method.
    /**
     * Highlights json string to be print in the console.
     */
    static highlightJson(json: string) {
        return json;
    }

    /**
     * Logging functions needed by AdvancedConsoleLogger
     */
    static logInfo(prefix: string, info: any) {
        console.log(colors.underline(colors.gray(prefix)), info);
    }

    static logError(prefix: string, error: any) {
        console.log(colors.underline(colors.red(prefix)), error);
    }

    static logWarn(prefix: string, warning: any) {
        console.log(colors.underline(colors.yellow(prefix)), warning);
    }

    static log(message: string) {
        console.log(colors.underline(message));
    }

    static warn(message: string) {
        return colors.yellow(message);
    }
}
