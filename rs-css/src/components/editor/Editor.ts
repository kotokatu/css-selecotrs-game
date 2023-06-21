import { BaseComponent } from '../../common/base-component';
import { CssPane } from './css-pane';
import { HtmlPane } from './html-pane';
import { LevelObject } from '../../data/levels-list';
import './editor.css';

export class Editor extends BaseComponent {
    input: HTMLInputElement;
    output: HTMLElement;
    constructor(
        parent: HTMLElement,
        levelData: LevelObject,
        onMouseOver: (e: MouseEvent, selector: string) => void,
        onMouseOut: (e: MouseEvent, selector: string) => void,
        onInput: (e: KeyboardEvent) => void
    ) {
        super({ parent, className: 'editor-wrapper' });
        this.input = new CssPane(this.element).input;
        this.input.addEventListener('keydown', onInput);
        this.output = new HtmlPane(this.element, levelData, onMouseOver, onMouseOut).output;
        this.element.addEventListener('animationend', this.removeEditorAnimation.bind(this));
    }

    public addEditorAnimation() {
        this.element.classList.add('shake');
    }

    private removeEditorAnimation() {
        this.element.classList.remove('shake');
    }
}
