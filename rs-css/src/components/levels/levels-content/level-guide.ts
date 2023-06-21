import { BaseComponent } from '../../../common/base-component';
import { LevelObject } from '../../../data/levels-list';
// import { state } from '../../../controller/state';
import './level-guide.css';

export class LevelGuide extends BaseComponent {
    constructor(parent: HTMLElement, levelData: LevelObject) {
        super({ parent, className: 'level-content' });

        this.render(levelData);
    }

    private render(levelData: LevelObject) {
        new BaseComponent<HTMLHeadingElement>({
            tag: 'h3',
            parent: this.element,
            className: 'selector-type',
            content: levelData.selectorType,
        });
        new BaseComponent({
            tag: 'p',
            parent: this.element,
            className: 'instruction',
            content: levelData.helpTitle,
        });
        new BaseComponent({
            tag: 'p',
            parent: this.element,
            className: 'syntax',
            content: levelData.syntax,
        });
        new BaseComponent({
            tag: 'p',
            parent: this.element,
            className: 'hint',
            content: levelData.help,
        });
        new BaseComponent({
            tag: 'h4',
            parent: this.element,
            className: 'examples-title',
            content: 'Examples',
        });
        const examples = new BaseComponent({
            parent: this.element,
            className: 'examples',
        });
        levelData.examples?.forEach((item) => {
            new BaseComponent({ tag: 'p', parent: examples.element, className: 'example', content: item });
        });
    }

    update(levelData: LevelObject) {
        this.element.replaceChildren();
        this.render(levelData);
    }
}
