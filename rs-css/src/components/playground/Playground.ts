import { BaseComponent } from '../../common/base-component';
import { Table } from '../table/table';
import { Editor } from '../editor/editor';
import { state } from '../../controller/state';
import { LEVELS_LIST } from '../../data/levels-list';
import './playground.css';

export class Playground extends BaseComponent {
    table: Table;
    output: HTMLElement;
    constructor(parent: HTMLElement) {
        super({ parent, className: 'game-container' });
        new BaseComponent<HTMLHeadingElement>({
            tag: 'h2',
            parent: this.element,
            content: `${LEVELS_LIST[state.level].doThis}`,
            className: 'directions',
        });
        this.table = new Table(this.element, this.onMouseOver.bind(this), this.onMouseOut.bind(this));
        this.output = new Editor(this.element, this.onMouseOver.bind(this), this.onMouseOut.bind(this)).output;
    }

    public onMouseOver(e: Event, selector: string): void {
        if (e.target && e.target instanceof HTMLElement) {
            const ind: number = [...document.querySelectorAll(selector)].indexOf(e.target);
            if (ind > -1) {
                const elemOnTable = this.table.tableElement.querySelectorAll('*')[ind];
                const elemInViewer = this.output.querySelectorAll('*')[ind];
                if (elemOnTable instanceof HTMLElement && elemInViewer instanceof HTMLElement) {
                    elemOnTable.classList.add('hover');
                    elemInViewer.classList.add('hover');
                    this.table.showTooltip(elemInViewer, elemOnTable.offsetLeft, elemOnTable.offsetTop);
                }
            }
        }
    }

    public onMouseOut(e: Event, selector: string): void {
        if (e.target && e.target instanceof HTMLElement) {
            const ind: number = [...document.querySelectorAll(selector)].indexOf(e.target);
            if (ind > -1) {
                this.table.tableElement.querySelectorAll('*')[ind]?.classList.remove('hover');
                this.output.querySelectorAll('*')[ind]?.classList.remove('hover');
                this.table.hideTooltip();
            }
        }
    }
}
