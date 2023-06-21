import { BaseComponent } from '../../common/base-component';
import { Button } from '../button/button';

export class CssPane extends BaseComponent {
    constructor(parent: HTMLElement, onInput: (input: HTMLInputElement) => void) {
        super({ parent, className: 'pane editor-pane' });
        const paneHeader = new BaseComponent({
            parent: this.element,
            className: 'pane-header',
            content: `CSS Editor`,
        }).element;
        new BaseComponent({ tag: 'span', parent: paneHeader, className: 'filename', content: 'style.css' });
        new BaseComponent({
            parent: this.element,
            className: 'line-numbers',
            content: '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20',
        });
        const editorWindow = new BaseComponent({
            parent: this.element,
            className: 'editor-window',
        }).element;
        const input = new BaseComponent<HTMLInputElement>({
            parent: editorWindow,
            tag: 'input',
            className: 'editor-input',
        }).element;
        input.setAttribute('placeholder', 'Type in a CSS selector');
        input.addEventListener('keydown', (e) => {
            if (e.code === 'Enter') {
                onInput(input);
            }
        });
        input.focus();
        new Button({ parent: editorWindow, className: 'enter-button', content: 'Enter' }, () => onInput(input));
        new BaseComponent({ parent: editorWindow, content: '{<br/>/* Styles would go here. */<br/>}' });
    }
}
