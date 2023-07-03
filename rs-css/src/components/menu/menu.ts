import { BaseComponent } from '../abstract/base-component';
import { Button } from '../abstract/button/button';
import { LevelState } from '../../app';
import { observer } from '../../common/observer';
import './menu.css';

export class Menu extends BaseComponent {
    private levelNum: number;
    private levelsState: LevelState[];
    private levelsTotal: number;
    private menuList: HTMLUListElement;
    constructor(parent: HTMLElement, levelNum: number, levelsTotal: number, levelsState: LevelState[]) {
        super({ parent, className: 'levels-wrapper' });
        this.levelNum = levelNum;
        this.levelsState = levelsState;
        this.levelsTotal = levelsTotal;
        this.menuList = new BaseComponent<HTMLUListElement>({
            tag: 'ul',
            className: 'levels-list',
        }).element;

        const overlay = new BaseComponent({ parent, className: 'overlay' }).element;
        overlay.addEventListener('click', this.hideMenu.bind(this));

        this.render();
    }

    private render(): void {
        const menuContainer = new BaseComponent<HTMLHeadingElement>({
            parent: this.element,
            className: 'levels-container',
        }).element;
        new BaseComponent<HTMLHeadingElement>({
            tag: 'h2',
            parent: menuContainer,
            className: 'levels-heading',
            content: `Level`,
        }).element;
        menuContainer.append(this.menuList);
        new Button({
            parent: this.element,
            className: 'menu-btn',
            content: `menu`,
            onClick: this.toggleMenu.bind(this),
        }).element;
        new Button({
            parent: menuContainer,
            className: 'reset-btn',
            content: `reset`,
            onClick: () => observer.notify({ isReset: true }),
        }).element;
        this.renderList();
    }

    private renderList(): void {
        this.menuList.replaceChildren();
        for (let i = 0; i < this.levelsTotal; i++) {
            this.createListItem(i, this.menuList);
        }
    }

    private createListItem(levelNum: number, parent: HTMLElement): HTMLLIElement {
        const listItem: HTMLLIElement = new BaseComponent<HTMLLIElement>({
            tag: 'li',
            parent,
            className: 'levels-item',
            content: `${levelNum + 1}`,
        }).element;

        this.highlightCurrent(levelNum, listItem);
        this.markCompleted(levelNum, listItem);
        listItem.addEventListener('click', () => {
            if (levelNum !== this.levelNum) {
                observer.notify({ levelNum });
            }
        });

        return listItem;
    }

    private markCompleted(levelNum: number, elem: HTMLLIElement): void {
        if (this.levelsState[levelNum].isHintUsed && this.levelsState[levelNum].isCompleted) {
            elem.classList.add('hint-used');
        } else if (this.levelsState[levelNum].isCompleted) {
            elem.classList.add('completed');
        }
    }

    private highlightCurrent(levelNum: number, elem: HTMLLIElement): void {
        if (this.levelNum === levelNum) {
            elem.classList.add('current');
        }
    }

    private toggleMenu(): void {
        if (this.element.classList.contains('visible')) {
            this.hideMenu();
        } else {
            this.showMenu();
        }
    }

    private hideMenu(): void {
        this.element.classList.remove('visible');
    }

    private showMenu(): void {
        this.element.classList.add('visible');
    }

    public update(levelNum: number, levelsState: LevelState[]) {
        this.levelNum = levelNum;
        this.levelsState = levelsState;
        this.renderList();
        this.hideMenu();
    }
}
