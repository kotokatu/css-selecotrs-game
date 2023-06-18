import { BaseComponent } from '../../common/base-component';
import { state } from '../../controller/state';
import { LEVELS_LIST } from '../../data/levels-list';
import './table.css';

export class Table extends BaseComponent<HTMLDivElement> {
    table: BaseComponent;
    constructor(parent: HTMLElement) {
        super({ parent, className: 'table-wrapper' });
        this.table = new BaseComponent({ parent: this.element, className: 'table', content: this.getTableMarkUp() });
    }

    getTableMarkUp(): string {
        return LEVELS_LIST[state.level].markupElements.join('');
    }

    // render() {
    // }
}
