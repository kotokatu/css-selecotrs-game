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
    constructor(parent: HTMLElement, levelData: LevelObject, onMouseOver: (e: MouseEvent) => void, onMouseOut: (e: MouseEvent) => void) {
        super({ parent, className: 'table-wrapper' });
        this.onMouseOver = onMouseOver;
        this.onMouseOut = onMouseOut;
        this.levelData = levelData;
        this.tableElements = [];
        this.tableContainer = new BaseComponent<HTMLDivElement>({
            parent: this.element,
            className: 'table',
        }).element;
        const tableEdge = new BaseComponent<HTMLDivElement>({ parent: this.element, className: 'table-edge' }).element;
        new BaseComponent<HTMLDivElement>({ parent: tableEdge, className: 'table-leg table-leg__left' });
        new BaseComponent<HTMLDivElement>({ parent: tableEdge, className: 'table-leg table-leg__right' });
        this.tooltip = new BaseComponent<HTMLSpanElement>({
            tag: 'span',
            parent: this.element,
            className: 'tooltip',
        }).element;

        this.renderTableElements();
    }

    private createTableElement(elemObject: elemObject): HTMLElement {
        const elem: HTMLElement = document.createElement(elemObject.tag);
        if (elemObject.class) {
            elem.className = elemObject.class;
        }

        if (elemObject.id) {
            elem.id = elemObject.id;
        }

        if (elemObject.attribute) {
            elem.setAttribute(elemObject.attribute[0], elemObject.attribute[1]);
        }

        if (elemObject.children) {
            elemObject.children.forEach((child: elemObject) => elem.append(this.createTableElement(child)));
        }

        if (elemObject.isAnimated) {
            elem.classList.add('pulsate');
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
        this.tooltip.style.left = `${posLeft}px`;
        this.tooltip.style.top = `${posTop - this.tableContainer.getBoundingClientRect().height - 25}px`;
    }

    public hideTooltip(): void {
        this.tooltip.classList.remove('visible');
        this.tooltip.textContent = '';
    }

    private getTooltipContent(elem: HTMLElement): string {
        const textElements = elem.textContent?.split('><');
        return textElements ? `${textElements[0]}><${textElements[textElements.length - 1]}` : '';
    }

    public bounceElements(elements: HTMLElement[]): void {
        elements.forEach((elem: HTMLElement) => {
            elem.classList.remove('pulsate');
            elem.classList.add('bounce');
        });
    }

    public animateElements(elements: HTMLElement[]): void {
        elements.forEach((elem: HTMLElement) => elem.classList.add('pulsate'));
    }

    public displayWinMessage(): void {
        const winMessage = new BaseComponent<HTMLHeadingElement>({
            tag: 'h2',
            className: 'win-message',
            content: 'Congratulations! You&nbsp;are a pro at CSS!',
        }).element;
        this.tableContainer.replaceChildren(winMessage);
    }

    public update(levelData: LevelObject, isOver?: boolean): void {
        if (isOver) {
            this.displayWinMessage();
        } else {
            this.levelData = levelData;
            this.tableContainer.replaceChildren();
            this.renderTableElements();
        }
    }
}
