import * as path from "path";
import * as vinyl from "vinyl";
import { TransformCallback, obj as through2Obj } from "through2";
import { rmSync, rmdirSync, Stats, statSync, readdirSync } from "fs";


// Функция управляемого логирования.
const log = (options: CleanOption, ...data: any[]): void => {
    if (options.verbose) {
        console.log(...data);
    }
}

// Интерфейс настроек.
export interface CleanOption {
    verbose: boolean;
}

// Функция очистки.
export const clean = (options?: CleanOption): NodeJS.ReadWriteStream => {
    let rmEmptyDir: (dirName: string) => void;
    let parentDir: string = '';
    let ret: vinyl.StreamFile[] = [];

    !options ? options = {verbose: false} : options;
    // Удаление пустой директории.
    // Если удаление пустой директории создало пустую директорию, так же удаление и её, рекурсивно.
    rmEmptyDir = (dirName: string): void => {
        const list: string[] = readdirSync(dirName);
        if (dirName !== '' && dirName !== '.' && list.length == 0) {
            try {
                rmdirSync(dirName);
                log(options!, `удаление пустой директории '${dirName}'`);
            } catch (e: unknown) {
                log(options!, `удаление пустой директории ${dirName} прервано ошибкой: ${e}`);
            }
            parentDir = path.dirname(dirName);
            if (parentDir !== '' && parentDir !== '.') rmEmptyDir(parentDir); // Рекурсия.
        }
    };

    // Возврат функции очистки в обёртке для использования в gulp.
    return through2Obj((file: vinyl.StreamFile, _enc: BufferEncoding, cb: TransformCallback): vinyl.StreamFile[] => {
        let filepath: string = file.path;
        let cwd: string = file.cwd;
        let relative: string = path.relative(cwd, filepath);
        let stat: Stats = statSync(relative);

        // Директорию удаляем только если она пустая.
        if (stat.isDirectory()) {
            // Проверка, если директория пустая, удалить так же и директорию.
            rmEmptyDir(relative);
            // Завершение.
            ret.push(file);
            cb();
            return ret;
        }
        try {
            rmSync(filepath);
            ret.push(file);
            log(options!, `${relative} - файл, удалён.`);
        } catch (e: unknown) {
            log(options!, `удаление файла ${filepath} прервано ошибкой: ${e}`);
        }
        // Проверка, если директория пустая, удалить так же и директорию.
        rmEmptyDir(path.dirname(relative));
        // Завершение.
        cb();

        return ret;
    });
};
