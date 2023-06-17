import { BaseComponent } from '../common/BaseComponent';
import { Table } from '../components/table/Table';
import { Editor } from '../components/editor/Editor';
import { state } from '../controller/state';
import { LEVELS } from '../data/levels';

export class GameView extends BaseComponent {
    table: HTMLElement;
    output: HTMLElement;
    constructor(parent: HTMLElement) {
        super({ parent, className: 'game-container' });
        new BaseComponent<HTMLHeadingElement>({
            tag: 'h2',
            parent: this.element,
            content: `${LEVELS[state.level].doThis}`,
            className: 'directions',
        });
        this.table = new Table(this.element).element;
        this.output = new Editor(this.element).output;
        this.output.querySelectorAll('div').forEach((el) => {
            el.addEventListener('mouseenter', (e) => this.onMouseEnter(e, '.viewer-window div'));
            // el.addEventListener('mouseleave', this.onMouseOver(e, '.viewer-window div'));
        });
        // this.output.querySelectorAll('div').forEach((el) => el.addEventListener('mouseout', this.onMouseOut));
    }

    onMouseEnter(e: Event, selector: string) {
        if (e.target && e.target instanceof HTMLElement) {
            const ind: number = Array.from(document.querySelectorAll(selector)).indexOf(e.target);
            if (ind > -1) {
                this.table.querySelectorAll('*')[ind + 1]?.classList.add('hover');
                this.output.querySelectorAll('*')[ind]?.classList.add('hover');
            }
        }
    }

    onMouseLeave() {
        this.table?.querySelector('.hover')?.classList.remove('hover');
        this.output?.querySelector('.hover')?.classList.remove('hover');
    }
}
