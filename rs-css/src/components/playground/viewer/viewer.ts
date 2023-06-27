import { BaseComponent } from '../../../common/base-component';
import { LevelObject } from '../../../data/levelsData';
import { elemObject } from '../../../data/levelsData';
import { prettyPrint } from '../../../../node_modules/code-prettify/src/prettify.js';
import '../../../css/custom-pr.css';
import './viewer.css';

export class Viewer extends BaseComponent {
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
        const markupWrapper = new BaseComponent({ tag: 'pre', parent: this.viewer, className: 'prettyprint' }).element;
        markupWrapper.insertAdjacentText('afterbegin', '<div class="table">');
        this.levelData.markup.forEach((elem) => markupWrapper.append(this.createViewerElement(elem)));
        markupWrapper.insertAdjacentText('beforeend', '</div>');
        prettyPrint();
    }

    update(levelData: LevelObject) {
        this.levelData = levelData;
        this.viewer.replaceChildren();
        this.renderViewerElements();
    }
}
