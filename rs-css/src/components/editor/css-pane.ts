import { BaseComponent } from '../../common/base-component';
import { Button } from '../button/button';
import hljs from '../../../node_modules/highlight.js/lib/common';
import '../../custom.css';

export class CssPane extends BaseComponent {
    mockInputContent: HTMLElement;
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
        const inputWrapper = new BaseComponent({ parent: editorWindow, className: 'input-wrapper' }).element;
        const input = new BaseComponent<HTMLInputElement>({
            parent: inputWrapper,
            tag: 'input',
            className: 'editor-input',
        }).element;
        input.setAttribute('placeholder', 'Type in a CSS selector');
        input.setAttribute('placeholder', 'Type in a CSS selector');
        input.addEventListener('keydown', (e) => {
            if (e.code === 'Enter') {
                onInput(input);
            }
        });
        input.addEventListener('input', () => {
            this.highlightCssSyntax(input.value);
        });
        input.focus();
        const mockInput = new BaseComponent({ tag: 'pre', parent: inputWrapper, className: 'mock-input' }).element;
        mockInput.setAttribute('aria-hidden', 'true');
        this.mockInputContent = new BaseComponent({
            tag: 'code',
            parent: mockInput,
            className: 'language-css mock-input-content',
        }).element;
        new Button({ parent: inputWrapper, className: 'enter-button', content: 'Enter' }, () => onInput(input));
        new BaseComponent({
            parent: editorWindow,
            className: 'editor-text',
            content: '{<br/>/* Styles would go here. */<br/>}',
        });
    }

    highlightCssSyntax(text: string) {
        this.mockInputContent.innerText = text;
        hljs.highlightElement(this.mockInputContent);
    }
}
