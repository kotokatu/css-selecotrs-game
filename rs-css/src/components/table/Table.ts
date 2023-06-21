import { BaseComponent } from '../../common/base-component';
import { elemObject, LevelObject } from '../../data/levels-list';
import './table.css';

export class Table extends BaseComponent<HTMLDivElement> {
    public tableContainer: HTMLElement;
    public tableElements: HTMLElement[];
    private tooltip: HTMLElement;
    private levelData: LevelObject;
    onMouseOver: (e: MouseEvent) => void;
    onMouseOut: (e: MouseEvent) => void;
    constructor(
        parent: HTMLElement,
        levelData: LevelObject,
        onMouseOver: (e: MouseEvent) => void,
        onMouseOut: (e: MouseEvent) => void
    ) {
        super({ parent, className: 'table-wrapper' });
        this.onMouseOver = onMouseOver;
        this.onMouseOut = onMouseOut;
        this.levelData = levelData;
        this.tableElements = [];
        this.tableContainer = new BaseComponent<HTMLDivElement>({ parent: this.element, className: 'table' }).element;
        this.tooltip = new BaseComponent<HTMLSpanElement>({
            tag: 'span',
            parent: this.element,
            className: 'tooltip',
        }).element;

        this.renderTableElements();
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

        elem.addEventListener('mouseover', this.onMouseOver);
        elem.addEventListener('mouseout', this.onMouseOut);
        this.tableElements.push(elem);

        return elem;
    }

    private renderTableElements(): void {
        this.levelData.markupElements.forEach((elem) => this.tableContainer.append(this.createTableElement(elem)));
    }

    public showTooltip(elem: HTMLElement, posLeft: number, posTop: number): void {
        this.tooltip.classList.add('visible');
        this.tooltip.textContent = this.getTooltipContent(elem);
        this.tooltip.style.left = `${posLeft - 10}px`;
        this.tooltip.style.top = `${posTop - 45}px`;
    }

    public hideTooltip(): void {
        this.tooltip.classList.remove('visible');
        this.tooltip.textContent = '';
    }

    private getTooltipContent(elem: HTMLElement): string {
        return Array.from(elem.childNodes)
            .filter((item) => item.nodeType === Node.TEXT_NODE)
            .map((item) => item.textContent)
            .join('');
    }

    public animateElements(elements: HTMLElement[]) {
        elements.forEach((elem) => elem.classList.add('out'));
    }
}
