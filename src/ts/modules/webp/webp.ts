type Fn = (support: boolean) => void;

export function isWebp(): void {
    function testWebp(callbackFn: Fn): void {
        let webp = new Image();
        webp.onload = webp.onerror = function () {
            callbackFn(webp.height === 2);
        };
        webp.src = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA4AAAAvAUAAAAcQEf0PRET/Aw==";
    }

    // Добавление класса в html, сигнализирующего о поддержке webp.
    testWebp((support: boolean): void => {
        let className = support ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
}
