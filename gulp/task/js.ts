import * as webpack from "webpack-stream";
import * as wp from "webpack";

import { app } from "../app";


/**
 * Константа текущего режима сборки проекта.
 */
const mode: "production" | "development" | "none" | undefined = app.isProd ? 'production' : 'development';

/**
 * Константа текущего режима создания карты исходников.
 */
const devtool: string | undefined = app.isDev ? 'inline-source-map' : undefined;

/**
 * Константа текущего режима генерации кода под разные версии браузеров.
 */
const target: string = app.isDev ? 'web' : 'browserslist';

/**
 * Настройки webpack.
 * Реализована возможность создания нескольких отдельных javascript файлов для раздельного подключения в HTML,
 * в том числе на разных страницах.
 * Каждый дополнительный javascript файл необходимо прописывать в секции "entry".
 */
const webpackOpt: wp.Configuration = {
    mode: mode,
    devtool: devtool,
    target: target,
    entry: {
        index: './.tmp/js/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: "[name].chunk.js",
        library: 'my',
        libraryTarget: 'var',
    },
    resolve: {
        extensions: [".js"],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.m?js/,
                type: "javascript/auto",
                resolve: {
                    fullySpecified: false,
                },
            },
        ],
    },
    performance: {
        hints: false,
    },
};

/**
 * Обработка, преобразование, сжатие, конвертация javascript кода с использованием webpack.
 */
export const js: () => NodeJS.ReadWriteStream = (): NodeJS.ReadWriteStream => {
    return app.gulp.src(`${app.path.tmp.js}/**/*.js`, {sourcemaps: app.isDev, allowEmpty: true})
        .pipe(app.plugins.plumber(app.plugins.plumberNotifyHandler('Ошибка в JS')))
        // @ts-ignore
        .pipe(webpack(webpackOpt))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browsersync.stream());
}
