import { BaseComponent } from '../../common/base-component';
import { LevelObject } from '../../data/levels-list';
// import { state } from '../../controller/state';
import { elemObject } from '../../data/levels-list';

export class HtmlPane extends BaseComponent {
    private viewer: HTMLElement;
    public viewerElements: HTMLElement[];
    onMouseOver: (e: MouseEvent) => void;
    onMouseOut: (e: MouseEvent) => void;
    private levelData: LevelObject;
    constructor(
        parent: HTMLElement,
        levelData: LevelObject,
        onMouseOver: (e: MouseEvent) => void,
        onMouseOut: (e: MouseEvent) => void
    ) {
        super({ parent, className: 'pane viewer-pane' });
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
            className: 'line-numbers',
            content: '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20',
        });
        this.viewer = new BaseComponent({
            parent: this.element,
            className: 'viewer-window',
        }).element;
        this.renderViewerElements();
    }

    createViewerElement(elemObject: elemObject): HTMLElement {
        const elem = document.createElement('div');
        let elemContent = `<${elemObject.tag}`;

        if (elemObject.class) {
            elemContent += ` class="${elemObject.class}"`;
        }

        if (elemObject.id) {
            elemContent += ` id="${elemObject.id}"`;
        }

        if (elemObject.attribute) {
            elemContent += ` ${elemObject.attribute[0]}="${elemObject.attribute[1]}"`;
        }

        elem.insertAdjacentText('afterbegin', `${elemContent}>`);

        if (elemObject.child) {
            elem.insertAdjacentElement('beforeend', this.createViewerElement(elemObject.child));
        }

        elem.insertAdjacentText('beforeend', `</${elemObject.tag}>`);

        elem.addEventListener('mouseover', this.onMouseOver);
        elem.addEventListener('mouseout', this.onMouseOut);
        this.viewerElements.push(elem);
        return elem;
    }

    renderViewerElements() {
        this.viewer.insertAdjacentText('afterbegin', '<div class="table">');
        this.levelData.markupElements.forEach((elem) => this.viewer.append(this.createViewerElement(elem)));
        this.viewer.insertAdjacentText('beforeend', '</div>');
    }
}
