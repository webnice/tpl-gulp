// @ts-ignore
import * as proxy from "proxy-middleware";
import { Options } from "browser-sync";
import { TransformCallback } from "through2";

import { app } from "../app";
import { ProxyOptions } from "../../@types";


/**
 * Номер порта на котором запускается локальный веб сервер.
 */
const defaultPort: number = 8190;
/**
 * Хост, доменное имя или IP адрес, на котором запускается локальный веб сервер.
 */
const defaultHost: string = 'backend';

/**
 * Настройки проксирования запросов к API (бэк-энд серверу).
 * Все запросы к /api* проксируются на back-end сервер по адресу http://backend:80/api*.
 * Имя хоста или IP можно прописать в hosts, либо заменить в конфиге на ip адрес или доменное имя.
 */
const proxyOptApi: () => ProxyOptions = (): ProxyOptions => {
    let ret: ProxyOptions = {};

    ret.protocol = "http:";
    ret.port = 80;
    ret.hostname = 'backend';
    ret.pathname = '/api';
    ret.route = '/api';

    return ret;
};

/**
 * Настройки переадресации к /favicon.
 * Все запросы к /favicon* проксируются на back-end сервер по адресу http://backend:80/favicon*.
 * Имя хоста или IP можно прописать в hosts, либо заменить в конфиге на ip адрес или доменное имя.
 */
const proxyOptFavicon: () => ProxyOptions = (): ProxyOptions => {
    let ret: ProxyOptions = {};

    ret.protocol = "http:";
    ret.port = 80;
    ret.hostname = 'backend';
    ret.pathname = '/favicon';
    ret.route = '/favicon';

    return ret;
};

/**
 * Настройки запуска локального web сервера для режима разработки.
 */
const serverOpt: Options = {
    server: {
        baseDir: `${app.path.build.html}`,
        middleware: [
            proxy(proxyOptFavicon()),
            proxy(proxyOptApi()),
        ],
    },
    notify: false,
    host: defaultHost,
    listen: defaultHost,
    port: defaultPort,
    open: false,
    reloadOnRestart: true,
};

/**
 * Задача gulp запуска локального web сервера.
 * @param done - Функция обратного вызова, должна вызываться при завершении задачи,
 * при использовании не потоковых задач.
 */
export const server: (done: TransformCallback) => void = (done: TransformCallback): void => {
    app.plugins.browsersync.init(serverOpt)
    done();
}
