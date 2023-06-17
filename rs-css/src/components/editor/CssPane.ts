import { BaseComponent } from '../../common/BaseComponent';
import { ComponentParams } from '../../common/BaseComponent';

export class CssPane extends BaseComponent {
    public input: HTMLInputElement;
    constructor(params: ComponentParams) {
        super({ ...params, className: 'pane editor-pane' });
        new BaseComponent({
            parent: this.element,
            className: 'pane-header',
            content: `CSS Editor <span class="filename">style.css</span>`,
        });
        new BaseComponent({
            parent: this.element,
            className: 'line-numbers',
            content:
                '1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11<br/>12<br/>13<br/>14<br/>15<br/>16<br/>17<br/>18<br/>19<br/>20',
        });
        const editorWindow = new BaseComponent({
            parent: this.element,
            className: 'editor-window',
            content: `<div class="">{<br/>/* Styles would go here. */<br/>}</div>`,
        }).element;
        this.input = new BaseComponent<HTMLInputElement>({ tag: 'input', className: 'editor-input' }).element;
        this.input.setAttribute('placeholder', 'Type in a CSS selector');
        editorWindow.prepend(this.input);
    }
}
