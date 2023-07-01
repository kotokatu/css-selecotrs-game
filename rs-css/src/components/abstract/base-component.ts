export interface ComponentParams {
    tag?: keyof HTMLElementTagNameMap;
    parent?: HTMLElement;
    className?: string;
    content?: string;
}

export class BaseComponent<T extends HTMLElement = HTMLElement> {
    public element: T;
    constructor({ tag = 'div', parent, className, content }: ComponentParams = {}) {
        this.element = document.createElement(tag) as T;
        if (className) {
            this.element.className = className;
        }

        if (content) {
            this.element.innerHTML = content;
        }

        if (parent) {
            parent.append(this.element);
        }
    }

    destroy(): void {
        this.element.remove();
    }
}
