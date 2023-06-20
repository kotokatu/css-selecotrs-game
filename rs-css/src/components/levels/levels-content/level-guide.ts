import { BaseComponent } from '../../../common/base-component';
import { LEVELS_LIST } from '../../../data/levels-list';
import { state } from '../../../controller/state';
import './level-guide.css';

export class LevelGuide extends BaseComponent {
    constructor(parent: HTMLElement) {
        super({ parent, className: 'level-content' });

        this.render();
    }

    private render() {
        new BaseComponent<HTMLHeadingElement>({
            tag: 'h3',
            parent: this.element,
            className: 'selector-type',
            content: LEVELS_LIST[state.level].selectorType,
        });
        new BaseComponent({
            tag: 'p',
            parent: this.element,
            className: 'instruction',
            content: LEVELS_LIST[state.level].helpTitle,
        });
        new BaseComponent({
            tag: 'p',
            parent: this.element,
            className: 'syntax',
            content: LEVELS_LIST[state.level].syntax,
        });
        new BaseComponent({
            tag: 'p',
            parent: this.element,
            className: 'hint',
            content: LEVELS_LIST[state.level].help,
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
        LEVELS_LIST[state.level].examples?.forEach((item) => {
            new BaseComponent({ tag: 'p', parent: examples.element, className: 'example', content: item });
        });
    }

    update() {
        this.element.replaceChildren();
        this.render();
    }
}
