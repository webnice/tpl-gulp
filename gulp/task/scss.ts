import * as dartSass from "sass"
import * as gulpSass from "gulp-sass";
import * as rename from "gulp-rename";
import * as webpcss from "gulp-webpcss";
import * as cleanCss from "gulp-clean-css";
import * as autoprefixer from "gulp-autoprefixer";
import * as postcss from "gulp-postcss";

import { app } from "../app";


/**
 * Константы настройки обработки SCSS стилей.
 */

// @ts-ignore
const sassProcessor: any = gulpSass(dartSass);
const sassProcessorOpt: any = {
    outputStyle: 'expanded',
    silenceDeprecations: ['legacy-js-api'],
};
const webpcssOpt: any = {
    webpClass: ".webp", // Класс для браузеров поддерживающих webp.
    noWebpClass: ".no-webp", // Класс для браузеров не поддерживающих webp.
};
const autoprefixerOpt: any = {
    grid: true, // Включение обработки грид свойств.
    overrideBrowserslist: ["last 5 versions"], // Указание количества поддерживаемых версий браузеров.
    cascade: true,
};
const cleanCssOpt = {};


/**
 * Обработка SCSS стилей и формирование CSS стилей с учётом современных обработок.
 */
export const scss = () => {
    return app.gulp.src(app.path.src.scss, {sourcemaps: app.isDev})
        .pipe(app.plugins.plumber(app.plugins.plumberNotifyHandler('Ошибка в SCSS')))
        .pipe(sassProcessor(sassProcessorOpt))

        
        // Выполняется в режиме продакшн.
        // .pipe(app.plugins.if( // Выполняется только в продакшн режиме.
        //     app.isProd,
        //     webpcss(webpcssOpt), // Вставка в CSS возможности выбора браузером использовать WEBP версию изображений.
        // ))

        // Выполняется в любом режиме.
        .pipe(webpcss(webpcssOpt)) // Вставка в CSS возможности выбора браузером использовать WEBP версию изображений.


        // Выполняется в режиме разработчика.
        .pipe(app.plugins.if(
            app.isDev,
            app.gulp.dest(app.path.build.css), // ОТЛАДКА: Выгрузка не сжатого файла.
        ))

        // Замена констант на значения.
        .pipe(app.plugins.replace(/@img\//g, '/img/'))
        .pipe(app.plugins.replace(/@fonts\//g, '/fonts/'))

        // Подключение стилей созданных через утилиту tailwindcss.
        // @ts-ignore
        .pipe(postcss([
            require('tailwindcss'),
            require('autoprefixer'),
        ]))

        // @ts-ignore
        .pipe(autoprefixer(autoprefixerOpt)) // Выполнение autoprefixer.

        // @ts-ignore
        .pipe(cleanCss(cleanCssOpt)) // Очистка и сжатие CSS.

        // @ts-ignore
        .pipe(rename({extname: ".bundle.css"})) // Формирование единственного CSS файла из множества.

        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream())
}
