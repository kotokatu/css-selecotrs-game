import { BaseComponent } from '../../../common/base-component';
import { elemObject, LevelObject } from '../../../data/levelsData';
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
        this.tableContainer = new BaseComponent<HTMLDivElement>({
            parent: this.element,
            className: 'table',
        }).element;
        new BaseComponent<HTMLDivElement>({ parent: this.element, className: 'table-edge' }).element;
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
        this.levelData.markup.forEach((elem: elemObject) => this.tableContainer.append(this.createTableElement(elem)));
    }

    public showTooltip(elem: HTMLElement, posLeft: number, posTop: number): void {
        this.tooltip.classList.add('visible');
        this.tooltip.textContent = this.getTooltipContent(elem);
        this.tooltip.style.left = `${posLeft - 10}px`;
        this.tooltip.style.top = `${posTop}px`;
    }

    public hideTooltip(): void {
        this.tooltip.classList.remove('visible');
        this.tooltip.textContent = '';
    }

    private getTooltipContent(elem: HTMLElement): string {
        const textElements = elem.textContent?.split('><');
        return textElements ? `${textElements[0]}><${textElements[textElements.length - 1]}` : '';
    }

    public animateElements(elements: HTMLElement[]) {
        elements.forEach((elem) => elem.classList.add('out'));
    }

    public displayWinMessage() {
        const winMessage = new BaseComponent<HTMLHeadingElement>({
            tag: 'h2',
            className: 'win-message',
            content: 'Hooray! You did it!',
        }).element;
        this.tableContainer.replaceChildren(winMessage);
    }

    public update(levelData: LevelObject, isOver?: boolean) {
        if (isOver) {
            this.displayWinMessage();
        } else {
            this.levelData = levelData;
            this.tableContainer.replaceChildren();
            this.renderTableElements();
        }
    }
}
