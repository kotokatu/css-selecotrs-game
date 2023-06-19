import { BaseComponent } from '../../common/base-component';
import { CssPane } from './css-pane';
import { HtmlPane } from './html-pane';
import './editor.css';

export class Editor extends BaseComponent {
    input: HTMLInputElement;
    output: HTMLElement;
    constructor(
        parent: HTMLElement,
        cb1: (e: Event, selector: string) => void,
        cb2: (e: Event, selector: string) => void
    ) {
        super({ parent, className: 'editor-wrapper' });
        this.input = new CssPane({ parent: this.element }).input;
        this.output = new HtmlPane(this.element, cb1, cb2).output;
    }
}
