import { BaseComponent } from '../../../common/base-component';
import { Button } from '../../button/button';
import { LEVELS_LIST } from '../../../data/levels-list';
import { observer } from '../../../common/observer';
import './levels-header.css';

export class LevelsHeader extends BaseComponent {
    levelNum: number;
    levelsHeading: HTMLHeadingElement;
    nextLevelBtn: HTMLButtonElement;
    prevLevelBtn: HTMLButtonElement;
    menuBtn: HTMLButtonElement;
    constructor(parent: HTMLElement, levelNum: number) {
        super({ parent, className: 'levels-header' });
        this.levelNum = levelNum;
        this.levelsHeading = new BaseComponent<HTMLHeadingElement>({
            tag: 'h2',
            parent: this.element,
            className: 'levels-heading',
            content: `Level ${this.levelNum + 1} of ${LEVELS_LIST.length}`,
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
        this.menuBtn = new Button({
            parent: this.element,
            className: 'menu-btn',
            content: `<span class="menu-btn-line"></span>
                      <span class="menu-btn-line"></span>
                      <span class="menu-btn-line"></span>`,
        }).element;

        // emitter.subscribe('levelChange', this.update.bind(this));
    }

    setNextLevel() {
        if (this.levelNum < LEVELS_LIST.length - 1) observer.notify(this.levelNum + 1);
    }

    setPrevLevel() {
        if (this.levelNum !== 0) observer.notify(this.levelNum - 1);
    }

    // update(level: number) {
    //     this.levelsHeading.innerHTML = `Level ${level + 1} of ${LEVELS_LIST.length}`;
    // }
}
