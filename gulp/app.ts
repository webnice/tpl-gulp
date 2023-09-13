import * as gulp from "gulp";

import { TApp } from "../@types";
import { path, plugins } from "./config";


/**
 * Переменная с настройками сборки проекта.
 */
export let app: TApp = {
    isProd: process['argv'].includes('--prod'),
    isDev: !process['argv'].includes('--prod'),
    path: path,
    gulp: gulp,
    plugins: plugins,
};
