import { app } from "../app";


/**
 * Создание директории, готовой для публикации проекта, либо внедрению файлов проекта в серверное back-end приложение.
 * Используется отдельная директория, так как разработка back-end и front-end может вестись параллельно и
 * back-end-у может требоваться стабильная версия front-end файлов.
 */
export const dist = () => {
    return app.gulp.src(`${app.path.dirBuild}/**/*`)
        .pipe(app.gulp.dest(app.path.dirDist))
}
