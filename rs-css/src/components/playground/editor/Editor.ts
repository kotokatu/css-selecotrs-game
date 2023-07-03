import { BaseComponent } from '../../abstract/base-component';
import { Button } from '../../abstract/button/button';
import { delay, disableElement, enableElement } from '../../../common/helpers';
import hljs from 'highlight.js';
import css from '../../../../node_modules/highlight.js/lib/languages/css.js';
import '../../../css/custom-hljs.css';
import './editor.css';
hljs.registerLanguage('css', css);

export class Editor extends BaseComponent {
    private mockInput: HTMLDivElement;
    private input: HTMLInputElement;
    private onInput: (inputText: string) => void;
    private isCleared = false;
    constructor(parent: HTMLDivElement, onInput: (inputText: string) => void) {
        super({ parent, className: 'editor pane' });
        this.onInput = onInput;
        this.input = new BaseComponent<HTMLInputElement>({
            tag: 'input',
            className: 'editor-input',
        }).element;
        this.input.setAttribute('placeholder', 'Type in a CSS selector');
        this.mockInput = new BaseComponent<HTMLDivElement>({
            tag: 'code',
            className: 'language-css mock-input',
        }).element;
        this.mockInput.setAttribute('aria-hidden', 'true');

        this.render();
        this.addListeners();
    }

    private render(): void {
        const paneHeader: HTMLDivElement = new BaseComponent<HTMLDivElement>({
            parent: this.element,
            className: 'pane-header',
            content: `CSS Editor`,
        }).element;
        new BaseComponent<HTMLSpanElement>({
            tag: 'span',
            parent: paneHeader,
            className: 'filename',
            content: 'style.css',
        });
        new BaseComponent<HTMLDivElement>({
            parent: this.element,
            className: 'gutter',
            content: '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16',
        });
        const editorWindow: HTMLDivElement = new BaseComponent<HTMLDivElement>({
            parent: this.element,
            className: 'editor-window',
        }).element;
        const inputWrapper: HTMLDivElement = new BaseComponent<HTMLDivElement>({
            parent: editorWindow,
            className: 'input-wrapper',
        }).element;
        inputWrapper.append(this.input);
        inputWrapper.append(this.mockInput);
        new Button({
            parent: inputWrapper,
            className: 'enter-button',
            content: 'enter',
            onClick: () => this.onInput(this.input.value),
        });
        new BaseComponent<HTMLDivElement>({
            parent: editorWindow,
            className: 'editor-text',
            content: '{<br/>/* Styles would go here. */<br/>}',
        });

        this.input.focus();
    }

    private addListeners(): void {
        this.input.addEventListener('keydown', (e: KeyboardEvent): void => {
            if (e.code === 'Enter') {
                this.onInput(this.input.value);
            }
        });
        this.input.addEventListener('input', (): void => {
            this.setMockInputContent(this.input.value);
        });
        this.input.addEventListener('scroll', (): void => {
            this.syncScroll();
        });
    }

    private highlightCss(): void {
        hljs.highlightElement(this.mockInput);
    }

    public async showAnswer(selector: string): Promise<void> {
        this.isCleared = false;
        disableElement(this.input);
        await this.typewrite(selector, 0);
        enableElement(this.input);
        this.input.focus();
    }

    private async typewrite(selector: string, i: number): Promise<void> {
        if (i < selector.length && !this.isCleared) {
            const j: number = i + 1;
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
        this.isCleared = true;
        this.setInputContent('');
        this.input.focus();
    }
}
