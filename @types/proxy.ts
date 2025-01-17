/**
 * Интерфейс настроек проксирования локального веб сервера.
 * Автор плагина проксирования не потрудился вообще никак описать свою поделку, поэтому назначение некоторых
 * директория не совсем понятны и требуют уточнения через просмотр кода "поделки".
 */
export interface ProxyOptions {
    // Протокол конечного сервера.
    protocol?: 'http:' | 'https:';

    // Домен или ip адрес сервера.
    hostname?: string;

    // Номер порта сервера.
    port?: number;

    // Путь на сервере.
    pathname?: string;

    // ХЗ... ???
    route?: string;

    // HTTP метод.
    method?: string;

    // HTTP заголовки.
    headers?: string[];

    // Forwarding the host breaks dotcloud - на эльфийском сленге хрен поймёшь что.
    preserveHost?: boolean;

    // ХЗ... ???
    href?: string;
}
