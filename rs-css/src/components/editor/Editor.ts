import { BaseComponent } from '../../common/base-component';
import { CssPane } from './css-pane';
import { HtmlPane } from './html-pane';
import { LevelObject } from '../../data/levels-list';
import './editor.css';

export class Editor extends BaseComponent {
    viewerElements: HTMLElement[];
    constructor(
        parent: HTMLElement,
        levelData: LevelObject,
        onMouseOver: (e: MouseEvent) => void,
        onMouseOut: (e: MouseEvent) => void,
        onInput: (input: HTMLInputElement) => void
    ) {
        super({ parent, className: 'editor-wrapper' });
        new CssPane(this.element, onInput);
        this.viewerElements = new HtmlPane(this.element, levelData, onMouseOver, onMouseOut).viewerElements;
        this.element.addEventListener('animationend', this.removeEditorAnimation.bind(this));
    }

    public addEditorAnimation() {
        this.element.classList.add('shake');
    }

    private removeEditorAnimation() {
        this.element.classList.remove('shake');
    }
}
