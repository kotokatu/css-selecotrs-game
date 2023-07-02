export function delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export function disableElement(elem: HTMLInputElement | HTMLButtonElement) {
    elem.disabled = true;
}

export function enableElement(elem: HTMLInputElement | HTMLButtonElement) {
    elem.disabled = false;
}
