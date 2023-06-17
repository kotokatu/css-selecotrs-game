import { BaseComponent } from '../../common/BaseComponent';
import { CssPane } from './CssPane';
import { HtmlPane } from './HtmlPane';
import './editor.css';

export class Editor extends BaseComponent {
    input: HTMLInputElement = new CssPane({ parent: this.element }).input;
    output: HTMLElement = new HtmlPane({ parent: this.element }).output.element;
    constructor(parent: HTMLElement) {
        super({ parent, className: 'editor-wrapper' });
    }
}
