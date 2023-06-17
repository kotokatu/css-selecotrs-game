import { BaseComponent } from '../../common/BaseComponent';
import { state } from '../../controller/state';
import { LEVELS } from '../../data/levels';
import './table.css';

export class Table extends BaseComponent<HTMLDivElement> {
    table: BaseComponent;
    constructor(parent: HTMLElement) {
        super({ parent, className: 'table-wrapper' });
        this.table = new BaseComponent({ parent: this.element, className: 'table', content: this.getTableMarkUp() });
    }

    getTableMarkUp(): string {
        return LEVELS[state.level].markupElements.join('');
    }

    // render() {
    // }
}
