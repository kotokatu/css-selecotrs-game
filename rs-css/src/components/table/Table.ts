import { BaseComponent } from '../../common/BaseComponent';
import { getMarkUp } from '../../common/helpers';

export class Table extends BaseComponent<HTMLDivElement> {
    level = 1;
    table: BaseComponent;
    constructor(parent: HTMLElement) {
        super({ parent, className: 'table-wrapper' });
        this.table = new BaseComponent({ parent: this.element, className: 'table', content: getMarkUp(this.level) });
    }

    // render() {
    // }
}
