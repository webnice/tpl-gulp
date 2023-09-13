export interface PathBuild {
    assets: string | string[];
    fonts: string | string[];
    img: string | string[];
    html: string | string[];
    css: string | string[];
    js: string | string[];
}

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

export interface PathWatch {
    assets: string | string[];
    img: string | string[];
    html: string | string[];
    scss: string | string[];
    ts: string | string[];
    js: string | string[];
    svgIcon: string | string[];
}

export interface PathTemp {
    fonts: string;
    js: string;
}

export interface Path {
    build: PathBuild;
    src: PathSource;
    watch: PathWatch;
    clean: string[];
    tmp: PathTemp;
    dirRoot: string;
    dirBuild: string;
    dirSource: string;
    dirDist: string;
}
