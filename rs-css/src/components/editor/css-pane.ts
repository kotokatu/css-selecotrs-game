import { BaseComponent } from '../../common/base-component';

export class CssPane extends BaseComponent {
    public input: HTMLInputElement;
    constructor(parent: HTMLElement) {
        super({ parent, className: 'pane editor-pane' });
        new BaseComponent({
            parent: this.element,
            className: 'pane-header',
            content: `CSS Editor <span class="filename">style.css</span>`,
        });
        new BaseComponent({
            parent: this.element,
            className: 'line-numbers',
            content: '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20',
        });
        const editorWindow = new BaseComponent({
            parent: this.element,
            className: 'editor-window',
        }).element;
        this.input = new BaseComponent<HTMLInputElement>({
            parent: editorWindow,
            tag: 'input',
            className: 'editor-input',
        }).element;
        this.input.setAttribute('placeholder', 'Type in a CSS selector');
        this.input.focus();
        new BaseComponent({ parent: editorWindow, content: '{<br/>/* Styles would go here. */<br/>}' });
    }
}
