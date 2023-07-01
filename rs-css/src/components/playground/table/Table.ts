import { BaseComponent } from '../../abstract/base-component';
import { elemObject, LevelObject } from '../../../data/levelsData';
import './table.css';
import { AnimationName } from '../../../app';

export class Table extends BaseComponent<HTMLDivElement> {
    public tableContainer: HTMLElement;
    public tableElements: HTMLElement[];
    private tooltip: HTMLElement;
    private levelData: LevelObject;
    onMouseOver: (e: MouseEvent) => void;
    onMouseOut: (e: MouseEvent) => void;
    onAnimationEnd: () => void;
    constructor(
        parent: HTMLElement,
        levelData: LevelObject,
        onMouseOver: (e: MouseEvent) => void,
        onMouseOut: (e: MouseEvent) => void,
        onAnimationEnd: () => void
    ) {
        super({ parent, className: 'table-wrapper' });
        this.onMouseOver = onMouseOver;
        this.onMouseOut = onMouseOut;
        this.onAnimationEnd = onAnimationEnd;
        this.levelData = levelData;
        this.tableElements = [];
        this.tableContainer = new BaseComponent<HTMLDivElement>({
            parent: this.element,
            className: 'table',
        }).element;
        this.tableContainer.addEventListener('animationend', (e: AnimationEvent) => {
            if (e.animationName === AnimationName.OnCompleteLevel) {
                this.onAnimationEnd();
            }
        });
        this.tooltip = new BaseComponent<HTMLSpanElement>({
            tag: 'span',
            parent: this.element,
            className: 'tooltip',
        }).element;

        this.render();
    }

    private render() {
        const tableEdge = new BaseComponent<HTMLDivElement>({ parent: this.element, className: 'table-edge' }).element;
        new BaseComponent<HTMLDivElement>({ parent: tableEdge, className: 'table-leg table-leg__left' });
        new BaseComponent<HTMLDivElement>({ parent: tableEdge, className: 'table-leg table-leg__right' });
        this.addElementsToTable();
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
            elem.classList.add(AnimationName.ActiveElements);
        }

        elem.addEventListener('mouseover', this.onMouseOver);
        elem.addEventListener('mouseout', this.onMouseOut);

        this.tableElements.push(elem);
        return elem;
    }

    private addElementsToTable(): void {
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

    public removeActiveElements(elements: HTMLElement[]): void {
        elements.forEach((elem: HTMLElement) => {
            elem.classList.remove(AnimationName.ActiveElements);
            elem.classList.add(AnimationName.OnCompleteLevel);
        });
    }

    public displayWinMessage(): void {
        const winMessage = new BaseComponent<HTMLHeadingElement>({
            tag: 'h2',
            className: 'win-message',
            content: 'Congratulations! You&nbsp;are a pro at CSS!',
        }).element;
        this.tableContainer.replaceChildren(winMessage);
    }

    public update(levelData: LevelObject, isGameOver?: boolean): void {
        if (isGameOver) {
            this.displayWinMessage();
        } else {
            this.levelData = levelData;
            this.tableContainer.replaceChildren();
            this.addElementsToTable();
        }
    }
}
