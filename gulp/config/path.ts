// @ts-ignore
import * as nodePath from 'path';

import { Path } from "../../@types/path";


// @ts-ignore
const dirRoot: string = nodePath.resolve(process.cwd());
const dirBuild: string = `${dirRoot}/build`;
const dirSource: string = `${dirRoot}/src`;
const dirDist: string = `${dirRoot}/dist`;

export const path: Path = {
    build: {
        assets: `${dirBuild}/assets/`,
        fonts: `${dirBuild}/fonts/`,
        img: `${dirBuild}/img/`,
        html: `${dirBuild}/`,
        css: `${dirBuild}/css/`,
        js: `${dirBuild}/js/`,
    },
    src: {
        assets: `${dirSource}/assets/**/*`,
        fonts: `${dirSource}/fonts/`,
        fontsOtf: `${dirSource}/fonts/**/*.otf`,
        fontsTtf: [
            `${dirRoot}/.tmp/fonts/**/*.ttf`,
            `${dirSource}/fonts/**/*.ttf`,
        ],
        img: `${dirSource}/img/**/*.{webp,png,jpg,jpeg,gif}`,
        svg: `${dirSource}/img/**/*.svg`,
        html: `${dirSource}/html/*.html`,
        scss: `${dirSource}/scss/**/main.scss`,
        ts: `${dirSource}/ts/**/*.ts`,
        svgIcon: `${dirSource}/svg-icon/**/*.svg`,
    },
    watch: {
        assets: `${dirSource}/assets/**/*.{webp,svg,png,jpg,jpeg,gif}`,
        img: `${dirSource}/img/**/*`,
        html: `${dirSource}/html/**/*.html`,
        scss: `${dirSource}/scss/**/*.scss`,
        ts: `${dirSource}/ts/**/*.ts`,
        js: `${dirRoot}/.tmp/js/**/*.js`,
        svgIcon: `${dirSource}/svg-icon/**/*.svg`,
    },
    clean: [
        `${dirBuild}/assets/**/*`,
        `${dirBuild}/img/**/*`,
        `${dirBuild}/css/**/*`,
        `${dirBuild}/js/**/*`,
        `${dirBuild}/**/*.html`,
    ],
    tmp: {
        fonts: `${dirRoot}/.tmp/fonts`,
        js: `${dirRoot}/.tmp/js`,
    },
    dirRoot: dirRoot,
    dirBuild: dirBuild,
    dirSource: dirSource,
    dirDist: dirDist,
}
