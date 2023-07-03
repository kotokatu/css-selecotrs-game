import { BaseComponent } from '../../abstract/base-component';
import { LevelObject, ElemObject } from '../../../data/levelsData';
import hljs from 'highlight.js';
import xml from '../../../../node_modules/highlight.js/lib/languages/xml.js';
import './viewer.css';
hljs.registerLanguage('xml', xml);

export class Viewer extends BaseComponent {
    private viewerWindow: HTMLElement;
    public viewerItems: HTMLElement[];
    onMouseOver: (e: MouseEvent) => void;
    onMouseOut: (e: MouseEvent) => void;
    private levelData: LevelObject;
    constructor(
        parent: HTMLElement,
        levelData: LevelObject,
        onMouseOver: (e: MouseEvent) => void,
        onMouseOut: (e: MouseEvent) => void
    ) {
        super({ parent, className: 'viewer pane' });
        this.levelData = levelData;
        this.viewerItems = [];
        this.onMouseOver = onMouseOver;
        this.onMouseOut = onMouseOut;
        this.viewerWindow = new BaseComponent({
            parent: this.element,
            className: 'viewer-window',
        }).element;
        this.render();
    }

    private render() {
        const paneHeader = new BaseComponent({
            parent: this.element,
            className: 'pane-header',
            content: `HTML Viewer`,
        }).element;
        new BaseComponent<HTMLSpanElement>({
            tag: 'span',
            parent: paneHeader,
            className: 'filename',
            content: 'index.html',
        });
        new BaseComponent({
            parent: this.element,
            className: 'gutter',
            content: '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16',
        });
        this.addItemsToViewer();
    }

    private createViewerItem(itemData: ElemObject): HTMLElement {
        const item: HTMLElement = new BaseComponent().element;
        const code: HTMLElement = new BaseComponent({ tag: 'code', parent: item }).element;
        let content = `<${itemData.tag}`;

        if (itemData.class) {
            content += ` class="${itemData.class}"`;
        }

        if (itemData.id) {
            content += ` id="${itemData.id}"`;
        }

        if (itemData.attribute) {
            content += ` ${itemData.attribute[0]}="${itemData.attribute[1]}"`;
        }

        code.insertAdjacentHTML('afterbegin', hljs.highlight(`${content}>`, { language: 'html' }).value);

        if (itemData.children) {
            itemData.children.forEach((child: ElemObject) => code.append(this.createViewerItem(child)));
        }

        code.insertAdjacentHTML('beforeend', hljs.highlight(`</${itemData.tag}>`, { language: 'html' }).value);

        item.addEventListener('mouseover', this.onMouseOver);
        item.addEventListener('mouseout', this.onMouseOut);

        this.viewerItems.push(item);
        return item;
    }

    private addItemsToViewer() {
        const markupWrapper: HTMLElement = new BaseComponent({ tag: 'div', parent: this.viewerWindow }).element;
        markupWrapper.insertAdjacentHTML(
            'afterbegin',
            hljs.highlight('<div class="table">', { language: 'html' }).value
        );
        this.levelData.markup.forEach((elem: ElemObject) =>
            markupWrapper.insertAdjacentElement('beforeend', this.createViewerItem(elem))
        );
        markupWrapper.insertAdjacentHTML('beforeend', hljs.highlight('</div>', { language: 'html' }).value);
    }

    public update(levelData?: LevelObject, isGameOver?: boolean) {
        if (isGameOver) {
            this.viewerWindow.classList.add('hover-disabled');
        } else {
            if (levelData) this.levelData = levelData;
            this.viewerItems = [];
            this.viewerWindow.classList.remove('hover-disabled');
            this.viewerWindow.replaceChildren();
            this.addItemsToViewer();
        }
    }
}
