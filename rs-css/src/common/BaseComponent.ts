export interface ComponentParams {
    tag?: keyof HTMLElementTagNameMap;
    parent?: HTMLElement;
    className?: string;
    content?: string;
}

export class BaseComponent<T extends HTMLElement = HTMLElement> {
    public element: T;
    constructor({ tag = 'div', parent, className = '', content = '' }: ComponentParams) {
        this.element = document.createElement(tag) as T;
        this.element.className = className;
        this.element.innerHTML = content;
        if (parent) parent.append(this.element);
    }

    remove() {
        this.element.remove();
    }

    // appendTo(parentNode: HTMLElement) {
    //     parentNode.append(this.element);
    // }

    // append(...elements: BaseComponent[] | HTMLElement[]) {
    //     this.element.append(...elements);
    // }
}
