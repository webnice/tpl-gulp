import * as gulp from "gulp";


export interface TApp {
    isProd: boolean;
    isDev: boolean;
    gulp: gulp.Gulp;
    path: any;
    plugins: any;
}
