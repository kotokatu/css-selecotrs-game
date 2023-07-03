import { BaseComponent } from '../../abstract/base-component';
import { LevelData, ItemData } from '../../../data/levelsData';
import { AnimationName } from '../../../app';
import './table.css';

export class Table extends BaseComponent<HTMLDivElement> {
    public tableContainer: HTMLElement;
    public tableItems: HTMLElement[];
    private tooltip: HTMLElement;
    private levelData: LevelData;
    onMouseOver: (e: MouseEvent) => void;
    onMouseOut: (e: MouseEvent) => void;
    onAnimationEnd: () => void;
    constructor(
        parent: HTMLElement,
        levelData: LevelData,
        onMouseOver: (e: MouseEvent) => void,
        onMouseOut: (e: MouseEvent) => void,
        onAnimationEnd: () => void
    ) {
        super({ parent, className: 'table-wrapper' });
        this.onMouseOver = onMouseOver;
        this.onMouseOut = onMouseOut;
        this.onAnimationEnd = onAnimationEnd;
        this.levelData = levelData;
        this.tableItems = [];
        this.tableContainer = new BaseComponent<HTMLDivElement>({
            parent: this.element,
            className: 'table',
        }).element;
        this.tableContainer.addEventListener('animationend', (e: AnimationEvent): void => {
            if (e.animationName === AnimationName.OnCompleteLevel) {
                this.onAnimationEnd();
            }
            if (e.animationName === AnimationName.OnError) {
                this.update(this.levelData);
            }
        });
        this.tooltip = new BaseComponent<HTMLSpanElement>({
            tag: 'span',
            parent: this.element,
            className: 'tooltip',
        }).element;

        this.render();
    }

    private render(): void {
        const tableEdge: HTMLDivElement = new BaseComponent<HTMLDivElement>({
            parent: this.element,
            className: 'table-edge',
        }).element;
        new BaseComponent<HTMLDivElement>({ parent: tableEdge, className: 'table-leg table-leg__left' });
        new BaseComponent<HTMLDivElement>({ parent: tableEdge, className: 'table-leg table-leg__right' });
        this.addItemsToTable();
    }

    private createTableItem(itemData: ItemData): HTMLElement {
        const item: HTMLElement = document.createElement(itemData.tag);
        if (itemData.class) {
            item.className = itemData.class;
        }

        if (itemData.id) {
            item.id = itemData.id;
        }

        if (itemData.attribute) {
            item.setAttribute(itemData.attribute[0], itemData.attribute[1]);
        }

        if (itemData.children) {
            itemData.children.forEach((child: ItemData) => item.append(this.createTableItem(child)));
        }

        if (itemData.isAnimated) {
            item.classList.add(AnimationName.ActiveItem);
        }

        item.addEventListener('mouseover', this.onMouseOver);
        item.addEventListener('mouseout', this.onMouseOut);

        this.tableItems.push(item);
        return item;
    }

    private addItemsToTable(): void {
        this.levelData.markup.forEach((item: ItemData) => this.tableContainer.append(this.createTableItem(item)));
    }

    public showTooltip(elem: HTMLElement, posLeft: number): void {
        this.tooltip.classList.add('visible');
        this.tooltip.textContent = this.getTooltipContent(elem);
        this.tooltip.style.left = `${posLeft}px`;
    }

    public hideTooltip(): void {
        this.tooltip.classList.remove('visible');
        this.tooltip.textContent = '';
    }

    private getTooltipContent(elem: HTMLElement): string {
        const strings = elem.textContent?.split('><');
        return strings ? `${strings[0]}><${strings[strings.length - 1]}` : '';
    }

    public removeActiveElements(elems: HTMLElement[]): void {
        elems.forEach((elem: HTMLElement) => {
            elem.classList.remove(AnimationName.ActiveItem);
            elem.classList.add(AnimationName.OnCompleteLevel);
        });
    }

    public addWrongItemAnimation(elems: HTMLElement[]) {
        elems.forEach((elem) => {
            elem.classList.remove(AnimationName.ActiveItem);
            elem.classList.add(AnimationName.OnError);
        });
    }

    public displayWinMessage(): void {
        const winMessage = new BaseComponent<HTMLHeadingElement>({
            tag: 'h2',
            className: 'win-message',
            content: 'Congratulations! You are a pro at CSS!',
        }).element;
        this.tableContainer.replaceChildren(winMessage);
    }

    public update(levelData?: LevelData, isGameOver?: boolean): void {
        if (isGameOver) {
            this.displayWinMessage();
        } else {
            if (levelData) this.levelData = levelData;
            this.tableItems = [];
            this.tableContainer.replaceChildren();
            this.addItemsToTable();
        }
    }
}
