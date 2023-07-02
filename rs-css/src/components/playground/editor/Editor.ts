import { BaseComponent } from '../../abstract/base-component';
import { Button } from '../../abstract/button/button';
import { delay, disableElements, enableElements } from '../../../common/helpers';
import hljs from 'highlight.js';
import css from '../../../../node_modules/highlight.js/lib/languages/css.js';
import '../../../css/custom-hljs.css';
import './editor.css';
hljs.registerLanguage('css', css);

export class Editor extends BaseComponent {
    private mockInput: HTMLElement;
    private input: HTMLInputElement;
    private onInput: (input: HTMLInputElement) => void;
    constructor(parent: HTMLElement, onInput: (input: HTMLInputElement) => void) {
        super({ parent, className: 'editor pane' });
        this.onInput = onInput;
        this.input = new BaseComponent<HTMLInputElement>({
            tag: 'input',
            className: 'editor-input',
        }).element;
        this.input.setAttribute('placeholder', 'Type in a CSS selector');
        this.mockInput = new BaseComponent({
            tag: 'code',
            className: 'language-css mock-input',
        }).element;
        this.mockInput.setAttribute('aria-hidden', 'true');

        this.render();
        this.addListeners();
    }

    private render(): void {
        const paneHeader: HTMLElement = new BaseComponent({
            parent: this.element,
            className: 'pane-header',
            content: `CSS Editor`,
        }).element;
        new BaseComponent({ tag: 'span', parent: paneHeader, className: 'filename', content: 'style.css' });
        new BaseComponent({
            parent: this.element,
            className: 'gutter',
            content: '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16',
        });
        const editorWindow: HTMLElement = new BaseComponent({
            parent: this.element,
            className: 'editor-window',
        }).element;
        const inputWrapper: HTMLElement = new BaseComponent({ parent: editorWindow, className: 'input-wrapper' })
            .element;
        inputWrapper.append(this.input);
        inputWrapper.append(this.mockInput);
        new Button({
            parent: inputWrapper,
            className: 'enter-button',
            content: 'enter',
            onClick: () => this.onInput(this.input),
        });
        new BaseComponent({
            parent: editorWindow,
            className: 'editor-text',
            content: '{<br/>/* Styles would go here. */<br/>}',
        });

        this.input.focus();
    }

    private addListeners(): void {
        this.input.addEventListener('keydown', (e) => {
            if (e.code === 'Enter') {
                this.onInput(this.input);
            }
        });
        this.input.addEventListener('input', () => {
            this.setMockInputContent(this.input.value);
        });
        this.input.addEventListener('scroll', () => {
            this.syncScroll();
        });
    }

    private highlightCss(): void {
        hljs.highlightElement(this.mockInput);
    }

    public async showAnswer(selector: string, elem: HTMLElement): Promise<void> {
        disableElements(elem, this.input);
        await this.typewrite(selector, 0);
        enableElements(elem, this.input);
        this.input.focus();
    }

    private async typewrite(selector: string, i: number): Promise<void> {
        if (i < selector.length) {
            const j = i + 1;
            this.setInputContent(selector.slice(0, j));
            await delay(150);
            return this.typewrite(selector, j);
        }
    }

    private setInputContent(text: string): void {
        this.input.value = text;
        this.setMockInputContent(text);
    }

    private setMockInputContent(text: string): void {
        this.mockInput.textContent = text;
        this.highlightCss();
    }

    private syncScroll(): void {
        this.mockInput.scrollLeft = this.input.scrollLeft;
    }

    public clear(): void {
        this.setInputContent('');
        this.input.focus();
    }
}
