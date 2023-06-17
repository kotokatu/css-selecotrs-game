import { BaseComponent } from '../../common/BaseComponent';
import { LEVELS } from '../../data/levels';
import { state } from '../../controller/state';
import { ComponentParams } from '../../common/BaseComponent';

export class HtmlPane extends BaseComponent {
    public output: BaseComponent;
    constructor(params: ComponentParams) {
        super({ ...params, className: 'pane viewer-pane' });
        new BaseComponent({
            parent: this.element,
            className: 'pane-header',
            content: `HTML Viewer <span class="filename">table.html</span>`,
        });
        new BaseComponent({
            parent: this.element,
            className: 'line-numbers',
            content:
                '1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11<br/>12<br/>13<br/>14<br/>15<br/>16<br/>17<br/>18<br/>19<br/>20',
        });
        this.output = new BaseComponent({
            parent: this.element,
            className: 'viewer-window',
            content: `&lt;div class="table"&gt;${this.getViewerMarkup()}&lt;/div&gt;`, //TODO
        });
    }

    private getViewerMarkup() {
        const markup = LEVELS[state.level].markupElements;
        const escapedElements = markup.map((el) => el.replaceAll('<', '&lt;').replaceAll('>', '&gt;'));
        return escapedElements
            .map((el) => {
                if (el.includes('&gt;&lt;/')) {
                    return `<div>${el}</div>`;
                } else if (el.includes('&lt;/')) {
                    return `${el}</div>`;
                } else return `<div>${el}`;
            })
            .join('');
    }
}
