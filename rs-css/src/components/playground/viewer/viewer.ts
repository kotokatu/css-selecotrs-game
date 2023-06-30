import { BaseComponent } from '../../../common/base-component';
import { LevelObject, elemObject } from '../../../data/levelsData';
import hljs from 'highlight.js';
import xml from '../../../../node_modules/highlight.js/lib/languages/xml.js';
import './viewer.css';
hljs.registerLanguage('xml', xml);

export class Viewer extends BaseComponent {
    private viewer: HTMLElement;
    public viewerElements: HTMLElement[];
    onMouseOver: (e: MouseEvent) => void;
    onMouseOut: (e: MouseEvent) => void;
    private levelData: LevelObject;
    constructor(parent: HTMLElement, levelData: LevelObject, onMouseOver: (e: MouseEvent) => void, onMouseOut: (e: MouseEvent) => void) {
        super({ parent, className: 'viewer pane' });
        this.levelData = levelData;
        this.viewerElements = [];
        this.onMouseOver = onMouseOver;
        this.onMouseOut = onMouseOut;
        const paneHeader = new BaseComponent({
            parent: this.element,
            className: 'pane-header',
            content: `HTML Viewer`,
        }).element;
        new BaseComponent({ tag: 'span', parent: paneHeader, className: 'filename', content: 'table.html' });
        new BaseComponent({
            parent: this.element,
            className: 'gutter',
            content: '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20',
        });
        this.viewer = new BaseComponent({
            parent: this.element,
            className: 'viewer-window',
        }).element;
        this.renderViewerElements();
    }

    createViewerElement(elemObject: elemObject): HTMLElement {
        const elem: HTMLElement = new BaseComponent().element;
        const code: HTMLElement = new BaseComponent({ tag: 'code', parent: elem }).element;
        let content = `<${elemObject.tag}`;

        if (elemObject.class) {
            content += ` class="${elemObject.class}"`;
        }

        if (elemObject.id) {
            content += ` id="${elemObject.id}"`;
        }

        if (elemObject.attribute) {
            content += ` ${elemObject.attribute[0]}="${elemObject.attribute[1]}"`;
        }

        code.insertAdjacentHTML('afterbegin', hljs.highlight(`${content}>`, { language: 'html' }).value);

        if (elemObject.children) {
            elemObject.children.forEach((child: elemObject) => code.append(this.createViewerElement(child)));
        }

        code.insertAdjacentHTML('beforeend', hljs.highlight(`</${elemObject.tag}>`, { language: 'html' }).value);

        elem.addEventListener('mouseover', this.onMouseOver);
        elem.addEventListener('mouseout', this.onMouseOut);

        this.viewerElements.push(elem);

        return elem;
    }

    renderViewerElements() {
        const markupWrapper: HTMLElement = new BaseComponent({ tag: 'div', parent: this.viewer }).element;
        markupWrapper.insertAdjacentHTML('afterbegin', hljs.highlight('<div class="table">', { language: 'html' }).value);
        this.levelData.markup.forEach((elem: elemObject) => markupWrapper.insertAdjacentElement('beforeend', this.createViewerElement(elem)));
        markupWrapper.insertAdjacentHTML('beforeend', hljs.highlight('</div>', { language: 'html' }).value);
    }

    update(levelData: LevelObject, isOver?: boolean) {
        if (isOver) {
            this.viewer.classList.add('hover-disabled');
        } else {
            this.levelData = levelData;
            this.viewer.classList.remove('hover-disabled');
            this.viewer.replaceChildren();
            this.renderViewerElements();
        }
    }
}
