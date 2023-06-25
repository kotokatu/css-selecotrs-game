import { BaseComponent } from '../../common/base-component';
import { Button } from '../button/button';
import { observer } from '../../common/observer';
import { LevelState } from '../../app';
import './levels-menu.css';

export class Menu extends BaseComponent {
    levelNum: number;
    state: LevelState[];
    levelsTotal: number;
    constructor(parent: HTMLElement, levelNum: number, levelsTotal: number, state: LevelState[]) {
        super({ parent, className: 'levels-container' });
        this.levelNum = levelNum;
        this.state = state;
        this.levelsTotal = levelsTotal;

        new BaseComponent<HTMLHeadingElement>({
            tag: 'h2',
            parent: this.element,
            className: 'levels-heading',
            content: `Level`,
        }).element;
        const menuBtn = new Button({
            parent: this.element,
            className: 'menu-btn',
            content: `<span class="menu-btn-line"></span>
                <span class="menu-btn-line"></span>
                <span class="menu-btn-line"></span>`,
        }).element;

        this.renderList();
    }

    renderList() {
        const levelsList: HTMLUListElement = new BaseComponent<HTMLUListElement>({
            tag: 'ul',
            parent: this.element,
            className: 'levels-list',
        }).element;
        for (let i = 0; i < this.levelsTotal; i++) {
            this.createListElement(i, levelsList);
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
        if (this.state[levelNum].isHintUsed && this.state[levelNum].isCompleted) {
            elem.classList.add('hint-used');
        } else if (this.state[levelNum].isCompleted) {
            elem.classList.add('completed');
        }
    }

    highlightCurrent(levelNum: number, elem: HTMLLIElement): void {
        if (this.levelNum === levelNum) {
            elem.classList.add('current');
        }
    }
}
