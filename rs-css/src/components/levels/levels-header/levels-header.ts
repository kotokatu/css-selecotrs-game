import { BaseComponent } from '../../../common/base-component';
import { Button } from '../../button/button';
import { LEVELS_LIST } from '../../../data/levels-list';
import './levels-header.css';

export class LevelsHeader extends BaseComponent {
    level: number;
    levelsHeading: HTMLHeadingElement;
    nextLevelBtn: HTMLButtonElement;
    prevLevelBtn: HTMLButtonElement;
    menuBtn: HTMLButtonElement;
    constructor(parent: HTMLElement, level: number) {
        super({ parent, className: 'levels-header' });
        this.level = level;
        this.levelsHeading = new BaseComponent<HTMLHeadingElement>({
            tag: 'h2',
            parent: this.element,
            className: 'levels-heading',
            content: `Level ${this.level + 1} of 10`,
        }).element;
        this.prevLevelBtn = new Button(
            {
                parent: this.element,
                className: 'prev-level-btn',
            },
            this.setPrevLevel.bind(this)
        ).element;
        this.nextLevelBtn = new Button(
            {
                parent: this.element,
                className: 'next-level-btn',
            },
            this.setNextLevel.bind(this)
        ).element;
        this.menuBtn = new BaseComponent<HTMLButtonElement>({
            parent: this.element,
            className: 'menu-btn',
        }).element;
    }

    setNextLevel() {
        if (this.level < LEVELS_LIST.length - 1) this.level += 1;
        this.update();
    }

    setPrevLevel() {
        if (this.level !== 0) this.level -= 1;
        this.update();
    }

    update() {
        this.levelsHeading.innerHTML = `Level ${this.level + 1} of 10`;
    }
}
