import { BaseComponent } from '../../common/base-component';
import { Button } from '../../common/button/button';
import { observer } from '../../common/observer';
import { LevelState } from '../../app';
import './levels-menu.css';

export class Menu extends BaseComponent {
    levelNum: number;
    levelsState: LevelState[];
    levelsTotal: number;
    levelsList: HTMLUListElement;
    constructor(parent: HTMLElement, levelNum: number, levelsTotal: number, levelsState: LevelState[]) {
        super({ parent, className: 'levels-container' });
        this.levelNum = levelNum;
        this.levelsState = levelsState;
        this.levelsTotal = levelsTotal;

        new BaseComponent<HTMLHeadingElement>({
            tag: 'h2',
            parent: this.element,
            className: 'levels-heading',
            content: `Level`,
        }).element;
        new Button({
            parent: this.element,
            className: 'menu-btn',
            content: `<span class="menu-btn-line"></span>
                <span class="menu-btn-line"></span>
                <span class="menu-btn-line"></span>`,
        }).element;
        this.levelsList = new BaseComponent<HTMLUListElement>({
            tag: 'ul',
            parent: this.element,
            className: 'levels-list',
        }).element;
        new Button({
            parent: this.element,
            className: 'reset-btn',
            content: `reset progress`,
            onClick: () => observer.notify({ isReset: true }),
        }).element;

        this.renderList();
    }

    renderList() {
        this.levelsList.replaceChildren();
        for (let i = 0; i < this.levelsTotal; i++) {
            this.createListElement(i, this.levelsList);
        }
    }

    createListElement(levelNum: number, parent: HTMLElement): HTMLLIElement {
        const levelsItem: HTMLLIElement = new BaseComponent<HTMLLIElement>({
            tag: 'li',
            parent,
            className: 'levels-item',
            content: `${levelNum + 1}`,
        }).element;

        this.highlightCurrent(levelNum, levelsItem);
        this.markCompleted(levelNum, levelsItem);
        levelsItem.addEventListener('click', () => observer.notify({ levelNum }));

        return levelsItem;
    }

    markCompleted(levelNum: number, elem: HTMLLIElement): void {
        if (this.levelsState[levelNum].isHintUsed && this.levelsState[levelNum].isCompleted) {
            elem.classList.add('hint-used');
        } else if (this.levelsState[levelNum].isCompleted) {
            elem.classList.add('completed');
        }
    }

    highlightCurrent(levelNum: number, elem: HTMLLIElement): void {
        if (this.levelNum === levelNum) {
            elem.classList.add('current');
        }
    }

    update(levelNum: number, levelsState: LevelState[]) {
        this.levelNum = levelNum;
        this.levelsState = levelsState;
        this.renderList();
    }
}
