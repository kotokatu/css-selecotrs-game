import { BaseComponent } from '../../common/base-component';
import { Button } from '../../common/button/button';
import { observer } from '../../common/observer';
import { LevelState } from '../../app';
import './menu.css';

export class Menu extends BaseComponent {
    private levelNum: number;
    private levelsState: LevelState[];
    private levelsTotal: number;
    private levelsList: HTMLUListElement;
    constructor(parent: HTMLElement, levelNum: number, levelsTotal: number, levelsState: LevelState[]) {
        super({ parent, className: 'levels-wrapper' });
        this.levelNum = levelNum;
        this.levelsState = levelsState;
        this.levelsTotal = levelsTotal;

        const overlay = new BaseComponent({ parent, className: 'overlay' }).element;
        overlay.addEventListener('click', this.hideMenu.bind(this));
        const levelsContainer = new BaseComponent<HTMLHeadingElement>({
            parent: this.element,
            className: 'levels-container',
        }).element;
        new BaseComponent<HTMLHeadingElement>({
            tag: 'h2',
            parent: levelsContainer,
            className: 'levels-heading',
            content: `Level`,
        }).element;
        new Button({
            parent: this.element,
            className: 'menu-btn',
            content: `menu`,
            onClick: this.toggleMenu.bind(this),
        }).element;
        this.levelsList = new BaseComponent<HTMLUListElement>({
            tag: 'ul',
            parent: levelsContainer,
            className: 'levels-list',
        }).element;
        new Button({
            parent: levelsContainer,
            className: 'reset-btn',
            content: `reset`,
            onClick: () => observer.notify({ isReset: true }),
        }).element;
        this.renderList();
    }

    private renderList(): void {
        this.levelsList.replaceChildren();
        for (let i = 0; i < this.levelsTotal; i++) {
            this.createListElement(i, this.levelsList);
        }
    }

    private createListElement(levelNum: number, parent: HTMLElement): HTMLLIElement {
        const levelsItem: HTMLLIElement = new BaseComponent<HTMLLIElement>({
            tag: 'li',
            parent,
            className: 'levels-item',
            content: `${levelNum + 1}`,
        }).element;

        this.highlightCurrent(levelNum, levelsItem);
        this.markCompleted(levelNum, levelsItem);
        levelsItem.addEventListener('click', () => {
            if (levelNum !== this.levelNum) {
                observer.notify({ levelNum });
            }
        });

        return levelsItem;
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

    private toggleMenu() {
        if (this.element.classList.contains('visible')) {
            this.hideMenu();
        } else {
            this.showMenu();
        }
    }

    private hideMenu() {
        this.element.classList.remove('visible');
    }

    private showMenu() {
        this.element.classList.add('visible');
    }

    private addOverlay() {
        this.element.append;
    }

    public update(levelNum: number, levelsState: LevelState[]) {
        this.levelNum = levelNum;
        this.levelsState = levelsState;
        this.renderList();
        this.hideMenu();
    }
}
