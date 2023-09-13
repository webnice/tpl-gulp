/**
 * Директории сборки результата.
 */
export interface PathBuild {
    assets: string | string[];
    fonts: string | string[];
    img: string | string[];
    html: string | string[];
    css: string | string[];
    js: string | string[];
}

/**
 * Директории исходных данных.
 */
export interface PathSource {
    assets: string | string[];
    fonts: string | string[];
    fontsOtf: string | string[];
    fontsTtf: string | string[];
    img: string | string[];
    svg: string | string[];
    html: string | string[];
    scss: string | string[];
    ts: string | string[];
    svgIcon: string | string[];
}

/**
 * Директории наблюдения.
 */
export interface PathWatch {
    assets: string | string[];
    img: string | string[];
    html: string | string[];
    scss: string | string[];
    ts: string | string[];
    js: string | string[];
    svgIcon: string | string[];
}

/**
 * Директории временных или промежуточных результатов.
 */
export interface PathTemp {
    fonts: string;
    js: string;
}

/**
 * Директории сборки.
 */
export interface Path {
    /** Директории сборки результата. */
    build: PathBuild;

    /** Директории исходных данных. */
    src: PathSource;

    /** Директории наблюдения. */
    watch: PathWatch;

    /** Директории очистки. */
    clean: string[];

    /** Директории временных или промежуточных результатов. */
    tmp: PathTemp;

    /** Корневая директория сборки. */
    dirRoot: string;

    /** Корневая директория сборки результата. */
    dirBuild: string;

    /** Корневая директория исходных данных. */
    dirSource: string;

    /** Директория результата в режиме "продакшн". */
    dirDist: string;
}
