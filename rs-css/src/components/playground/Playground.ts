import { BaseComponent } from '../../common/BaseComponent';
import { Table } from '../table/Table';
import { Editor } from '../editor/Editor';
import { state } from '../../controller/state';
import { LEVELS } from '../../data/levelsList';

export class Playground extends BaseComponent {
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
            el.addEventListener('mouseover', (e) => this.onMouseOver(e, '.viewer-window div'));
            el.addEventListener('mouseout', (e) => this.onMouseOut(e, '.viewer-window div'));
        });
        this.table.querySelectorAll('.table *').forEach((el) => {
            el.addEventListener('mouseover', (e) => this.onMouseOver(e, '.table *'));
            el.addEventListener('mouseout', (e) => this.onMouseOut(e, '.table *'));
        });
    }

    onMouseOver(e: Event, selector: string) {
        if (e.target && e.target instanceof HTMLElement) {
            const ind: number = Array.from(document.querySelectorAll(selector)).indexOf(e.target);
            if (ind > -1) {
                this.table.querySelectorAll('.table *')[ind]?.classList.add('hover');
                this.output.querySelectorAll('.viewer-window *')[ind]?.classList.add('hover');
            }
        }
    }

    onMouseOut(e: Event, selector: string) {
        if (e.target && e.target instanceof HTMLElement) {
            const ind: number = Array.from(document.querySelectorAll(selector)).indexOf(e.target);
            if (ind > -1) {
                this.table.querySelectorAll('.table *')[ind]?.classList.remove('hover');
                this.output.querySelectorAll('.viewer-window *')[ind]?.classList.remove('hover');
            }
        }
    }
}