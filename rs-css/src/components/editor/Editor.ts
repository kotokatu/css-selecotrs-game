import { BaseComponent } from '../../common/BaseComponent';
import { LEVELS } from '../../data/levels';
export class Editor extends BaseComponent {
    level = 3;
    editorInput: BaseComponent | null;
    viewerOutput: BaseComponent | null;
    constructor(parent: HTMLElement) {
        super({ parent, className: 'editor-wrapper' });
        this.editorInput = null;
        this.viewerOutput = null;

        this.renderEditorPane();
        this.renderViewerPane();
    }

    renderEditorPane() {
        const editorPane = new BaseComponent({ parent: this.element, className: 'pane editor-pane' });
        new BaseComponent({
            parent: editorPane.element,
            className: 'pane-header',
            content: `CSS Editor <div class="filename">style.css</div>`,
        });
        new BaseComponent({
            parent: editorPane.element,
            className: 'line-numbers',
            content:
                '1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11<br/>12<br/>13<br/>14<br/>15<br/>16<br/>17<br/>18<br/>19<br/>20',
        });
        const editorWindow = new BaseComponent({
            parent: editorPane.element,
            className: 'editor-window',
            content: `{<br/>
        /* Styles would go here. */<br/>
        }`,
        });
        this.editorInput = new BaseComponent({ tag: 'input', className: 'editor-input' });
        editorWindow.element.prepend(this.editorInput.element);
    }

    renderViewerPane() {
        const viewerPane = new BaseComponent({ parent: this.element, className: 'pane viewer-pane' });
        new BaseComponent({
            parent: viewerPane.element,
            className: 'pane-header',
            content: `HTML Viewer <div class="filename">table.html</div>`,
        });
        new BaseComponent({
            parent: viewerPane.element,
            className: 'line-numbers',
            content:
                '1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11<br/>12<br/>13<br/>14<br/>15<br/>16<br/>17<br/>18<br/>19<br/>20',
        });
        this.viewerOutput = new BaseComponent({
            parent: viewerPane.element,
            className: 'viewer-window',
            content: `&lt;div class="table"&gt;${this.getEditorMarkup()}&lt;/div&gt;`, //TODO
        });
    }

    getEditorMarkup() {
        const markup = LEVELS[this.level].boardMarkup;
        const markupElements = markup.trim().split('\n');
        const escapedElements = markupElements.map((el) => el.replaceAll('<', '&lt;').replaceAll('>', '&gt;'));
        return escapedElements
            .map((el) => {
                if (el.includes('/&gt;')) {
                    return `<div>${el}</div>`;
                } else if (el.includes('/')) {
                    return `${el}</div>`;
                } else return `<div>${el}`;
            })
            .join('');
    }
}
