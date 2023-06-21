import { BaseComponent } from '../../common/base-component';
import { LevelObject } from '../../data/levels-list';
// import { state } from '../../controller/state';
import { elemObject } from '../../data/levels-list';

export class HtmlPane extends BaseComponent {
    public output: HTMLElement;
    onMouseOver: (e: MouseEvent, selector: string) => void;
    onMouseOut: (e: MouseEvent, selector: string) => void;
    levelData: LevelObject;
    constructor(
        parent: HTMLElement,
        levelData: LevelObject,
        onMouseOver: (e: MouseEvent, selector: string) => void,
        onMouseOut: (e: MouseEvent, selector: string) => void
    ) {
        super({ parent, className: 'pane viewer-pane' });
        this.onMouseOver = onMouseOver;
        this.onMouseOut = onMouseOut;
        this.levelData = levelData;
        new BaseComponent({
            parent: this.element,
            className: 'pane-header',
            content: `HTML Viewer <span class="filename">table.html</span>`,
        });
        new BaseComponent({
            parent: this.element,
            className: 'line-numbers',
            content: '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20',
        });
        this.output = new BaseComponent({
            parent: this.element,
            className: 'viewer-window',
            // content: `&lt;div class="table"&gt;${this.getViewerMarkup()}&lt;/div&gt;`, //TODO
        }).element;
        this.renderViewerElements();
    }

    private getViewerMarkup() {
        return this.levelData.markupElements;
        //     const escapedElements = markup.map((el) => el.replaceAll('<', '&lt;').replaceAll('>', '&gt;'));
        //     return escapedElements
        //         .map((el) => {
        //             if (el.includes('&gt;&lt;/')) {
        //                 return `<div>${el}</div>`;
        //             } else if (el.includes('&lt;/')) {
        //                 return `${el}</div>`;
        //             } else return `<div>${el}`;
        //         })
        //         .join('');
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

        elem.addEventListener('mouseover', (e: MouseEvent): void => this.onMouseOver(e, '.viewer-window div'));
        elem.addEventListener('mouseout', (e: MouseEvent): void => this.onMouseOut(e, '.viewer-window div'));

        return elem;
    }

    renderViewerElements() {
        const elems = this.getViewerMarkup();
        this.output.insertAdjacentText('afterbegin', '<div class="table">');
        elems.forEach((elem) => this.output.append(this.createViewerElement(elem)));
        this.output.insertAdjacentText('beforeend', '</div>');
    }
}
