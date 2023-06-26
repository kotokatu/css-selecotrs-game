import { BaseComponent } from '../../../common/base-component';
import { Button } from '../../button/button';
// import hljs from '../../../node_modules/highlight.js/lib/common';
import hljs from 'highlight.js';
import css from '../../../../node_modules/highlight.js/lib/languages/css.js';
hljs.registerLanguage('css', css);
import '../../../css/custom-hljs.css';

export class Editor extends BaseComponent {
    mockInputContent: HTMLElement;
    input: HTMLInputElement;
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
            className: 'gutter',
            content: '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20',
        });
        const editorWindow = new BaseComponent({
            parent: this.element,
            className: 'editor-window',
        }).element;
        const inputWrapper = new BaseComponent({ parent: editorWindow, className: 'input-wrapper' }).element;
        this.input = new BaseComponent<HTMLInputElement>({
            parent: inputWrapper,
            tag: 'input',
            className: 'editor-input',
        }).element;
        this.input.setAttribute('placeholder', 'Type in a CSS selector');
        this.input.addEventListener('keydown', (e) => {
            if (e.code === 'Enter') {
                onInput(this.input);
            }
        });
        this.input.addEventListener('input', () => {
            this.setMockInputContent(this.input.value);
        });
        this.input.focus();
        const mockInput = new BaseComponent({ tag: 'pre', parent: inputWrapper, className: 'mock-input' }).element;
        mockInput.setAttribute('aria-hidden', 'true');
        this.mockInputContent = new BaseComponent({
            tag: 'code',
            parent: mockInput,
            className: 'language-css mock-input-content',
        }).element;
        new Button({
            parent: inputWrapper,
            className: 'enter-button',
            content: 'Enter',
            onClick: () => onInput(this.input),
        });
        new BaseComponent({
            parent: editorWindow,
            className: 'editor-text',
            content: '{<br/>/* Styles would go here. */<br/>}',
        });
    }

    highlightCssSyntax() {
        hljs.highlightElement(this.mockInputContent);
    }

    setMockInputContent(text: string) {
        this.mockInputContent.innerText = text;
        this.highlightCssSyntax();
    }

    showAnswer(selector: string) {
        this.input.value = selector;
        this.setMockInputContent(selector);
    }
}
