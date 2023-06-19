import { BaseComponent } from '../../common/base-component';
import { LEVELS_LIST } from '../../data/levels-list';
import { state } from '../../controller/state';
import { ComponentParams } from '../../common/base-component';
import { elemObject } from '../../data/levels-list';

export class HtmlPane extends BaseComponent {
    public output: HTMLElement;
    constructor(params: ComponentParams) {
        super({ ...params, className: 'pane viewer-pane' });
        new BaseComponent({
            parent: this.element,
            className: 'pane-header',
            content: `HTML Viewer <span class="filename">table.html</span>`,
        });
        new BaseComponent({
            parent: this.element,
            className: 'line-numbers',
            content:
                '1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11<br/>12<br/>13<br/>14<br/>15<br/>16<br/>17<br/>18<br/>19<br/>20',
        });
        this.output = new BaseComponent({
            parent: this.element,
            className: 'viewer-window',
            // content: `&lt;div class="table"&gt;${this.getViewerMarkup()}&lt;/div&gt;`, //TODO
        }).element;
        this.renderViewerElements();
    }

    private getViewerMarkup() {
        return LEVELS_LIST[state.level].markupElements;
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
        return elem;
    }

    renderViewerElements() {
        const elems = this.getViewerMarkup();
        this.output.insertAdjacentText('afterbegin', '<div class="table">');
        elems.forEach((elem) => this.output.append(this.createViewerElement(elem)));
        this.output.insertAdjacentText('beforeend', '</div>');
    }
}
