export function delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export function disableElements(...elems: HTMLElement[]) {
    [...elems].forEach((elem) => elem.setAttribute('disabled', 'true'));
}

export function enableElements(...elems: HTMLElement[]) {
    [...elems].forEach((elem) => elem.removeAttribute('disabled'));
}
