import { BaseComponent } from '../../common/base-component';
import { state } from '../../controller/state';
import { LEVELS_LIST } from '../../data/levels-list';
import { elemObject } from '../../data/levels-list';
import './table.css';

export class Table extends BaseComponent<HTMLDivElement> {
    tableElement: HTMLElement;
    tooltip: HTMLElement;
    constructor(parent: HTMLElement) {
        super({ parent, className: 'table-wrapper' });
        this.tableElement = new BaseComponent<HTMLDivElement>({ parent: this.element, className: 'table' }).element;
        this.tooltip = new BaseComponent<HTMLSpanElement>({
            tag: 'span',
            parent: this.element,
            className: 'tooltip',
        }).element;
        this.renderTableElements();
    }

    private getTableMarkUp(): elemObject[] {
        return LEVELS_LIST[state.level].markupElements;
    }

    private createTableElement(elemObject: elemObject): HTMLElement {
        const elem = document.createElement(elemObject.tag);
        if (elemObject.class) {
            elem.className = elemObject.class;
        }
        if (elemObject.id) {
            elem.id = elemObject.id;
        }
        if (elemObject.attribute) {
            elem.setAttribute(elemObject.attribute[0], elemObject.attribute[1]);
        }
        if (elemObject.child) {
            elem.append(this.createTableElement(elemObject.child));
        }
        return elem;
    }

    renderTableElements() {
        const elems = this.getTableMarkUp();
        elems.forEach((elem) => this.tableElement.append(this.createTableElement(elem)));
    }

    public showTooltip(elem: HTMLElement, posLeft: number, posTop: number) {
        this.tooltip.classList.add('visible');
        this.tooltip.textContent = this.getTooltipContent(elem);
        this.tooltip.style.left = `${posLeft - 10}px`;
        this.tooltip.style.top = `${posTop - 45}px`;
    }

    public hideTooltip() {
        this.tooltip.classList.remove('visible');
        this.tooltip.textContent = '';
    }

    private getTooltipContent(elem: HTMLElement) {
        return Array.from(elem.childNodes)
            .filter((item) => item.nodeType === 3)
            .map((item) => item.textContent)
            .join('');
    }
}
