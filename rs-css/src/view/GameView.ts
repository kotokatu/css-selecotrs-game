import { BaseComponent } from '../common/BaseComponent';
import { Table } from '../components/table/Table';
import { LEVELS } from '../data/levels';
import { Editor } from '../components/editor/Editor';

export class GameView extends BaseComponent {
    level = 1;
    constructor(parent: HTMLElement) {
        super({ parent, className: 'game-container' });
    }

    render() {
        const directions = new BaseComponent<HTMLHeadingElement>({
            tag: 'h2',
            parent: this.element,
            content: `${LEVELS[this.level].doThis}`,
            className: 'directions',
        });
        const table = new Table(this.element);
        new Editor(this.element);
    }
}
