import * as moment from "moment";

import { isWebp, mobileNav } from './modules';
import { appVersion } from './version.constant';


/**
 * !!!ПРИМЕР!!!
 * Вставка версии приложения,которая берётся из файла package.json при сборке и выкладывается в файл.
 * @param id - ID HTML элемента.
 */
const insertVersion = (id: string): void => {
    const place: HTMLElement | null = document.querySelector(id);
    if (place) {
        place.innerHTML = appVersion;
    }
};

/**
 * !!!ПРИМЕР!!!
 * Вставка даты и времени с использованием библиотеки moment.
 */
const insertDateTime = (id: string): void => {
    const upd = (): void => {
        const place: HTMLElement | null = document.querySelector(id);
        if (place) {
            // @ts-ignore
            place.innerHTML = moment().format("DD.MM.YYYY HH:mm:ss");
        }
        intervalId = setTimeout(upd, 1000);
    };
    let intervalId;
    upd();
};



isWebp(); // !!!ПРИМЕР!!!
mobileNav(); // !!!ПРИМЕР!!!
insertVersion('#app-version'); // !!!ПРИМЕР!!!
insertDateTime('#current-time'); // !!!ПРИМЕР!!!
