export function mobileNav(): void {
    // Кнопка.
    const navBtn: HTMLElement | null = document.querySelector('.mobile-nav-btn');
    const nav: HTMLElement | null = document.querySelector('.mobile-nav');
    const menuIcon: HTMLElement | null = document.querySelector('.nav-icon');
    const menuList: HTMLElement | null = document.querySelector('.mobile-nav__list');

    // Установка добавление класса активному разделу, для ссылки из меню разделов.
    if (menuList) {
        const currentURI: Location = window.location;
        menuList.childNodes.forEach((child: globalThis.ChildNode): void => {
            if (child.nodeName.toLowerCase() !== 'li') return;
            if (!child.firstChild) return;
            const fc: globalThis.ChildNode = child.firstChild;
            if (fc.nodeName.toLowerCase() === 'a') {
                const item: HTMLAnchorElement = fc as HTMLAnchorElement;
                if (item.href.toLowerCase() === currentURI.toString().toLowerCase()) {
                    item.classList.add("active");
                }
            }
        });
    }

    // Переключатель класса иконки меню.
    if (navBtn !== null && nav !== null) {
        navBtn.onclick = function (): void {
            nav.classList.toggle('mobile-nav--open');
            menuIcon?.classList.toggle('nav-icon--active');
            document.body.classList.toggle('no-scroll');
        };
    }
}
