import { BaseComponent } from '../../common/base-component';
import { CssPane } from './css-pane';
import { HtmlPane } from './html-pane';
import './editor.css';

export class Editor extends BaseComponent {
    input: HTMLInputElement = new CssPane({ parent: this.element }).input;
    output: HTMLElement = new HtmlPane({ parent: this.element }).output.element;
    constructor(parent: HTMLElement) {
        super({ parent, className: 'editor-wrapper' });
    }
}
