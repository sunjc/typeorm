import glob from "glob";
import {PlatformTools} from "../platform/PlatformTools.ts";
import {EntitySchema} from "../entity-schema/EntitySchema.ts";
import {Logger} from "../logger/Logger.ts";
/**
 * Loads all exported classes from the given directory.
 */
export function importClassesFromDirectories(logger: Logger, directories: string[], formats = [".js", ".cjs", ".ts"]): Function[] {

    const logLevel = "info";
    const classesNotFoundMessage = "No classes were found using the provided glob pattern: ";
    const classesFoundMessage = "All classes found using provided glob pattern";
    function loadFileClasses(exported: any, allLoaded: Function[]) {
        if (typeof exported === "function" || exported instanceof EntitySchema) {
            allLoaded.push(exported);

        } else if (Array.isArray(exported)) {
            exported.forEach((i: any) => loadFileClasses(i, allLoaded));

        } else if (typeof exported === "object" && exported !== null) {
            Object.keys(exported).forEach(key => loadFileClasses(exported[key], allLoaded));

        }
        return allLoaded;
    }

    const allFiles = directories.reduce((allDirs, dir) => {
        return allDirs.concat(glob.sync(PlatformTools.pathNormalize(dir)));
    }, [] as string[]);

    if (directories.length > 0 && allFiles.length === 0) {
        logger.log(logLevel, `${classesNotFoundMessage} "${directories}"`);
    } else if (allFiles.length > 0) {
        logger.log(logLevel, `${classesFoundMessage} "${directories}" : "${allFiles}"`);
    }
    const dirs = allFiles
        .filter(file => {
            const dtsExtension = file.substring(file.length - 5, file.length);
            return formats.indexOf(PlatformTools.pathExtname(file)) !== -1 && dtsExtension !== ".d.ts";
        })
        .map(file => require(PlatformTools.pathResolve(file)));

    return loadFileClasses(dirs, []);
}

/**
 * Loads all json files from the given directory.
 */
export function importJsonsFromDirectories(directories: string[], format = ".json"): any[] {

    const allFiles = directories.reduce((allDirs, dir) => {
        return allDirs.concat(glob.sync(PlatformTools.pathNormalize(dir)));
    }, [] as string[]);

    return allFiles
        .filter(file => PlatformTools.pathExtname(file) === format)
        .map(file => require(PlatformTools.pathResolve(file)));
}
