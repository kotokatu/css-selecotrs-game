import { BaseComponent } from '../../common/base-component';
import { Table } from '../table/Table';
import { Editor } from '../editor/Editor';
import { observer } from '../../common/observer';
import { LevelObject } from '../../data/levels-list';
import { LEVELS_TOTAL } from '../../app';
import './playground.css';

export class Playground extends BaseComponent {
    table: Table;
    editor: Editor;
    viewerElements: HTMLElement[];
    levelNum: number;
    levelData: LevelObject;
    constructor(parent: HTMLElement, levelData: LevelObject, levelNum: number) {
        super({ parent, className: 'playground-container' });
        new BaseComponent<HTMLHeadingElement>({
            tag: 'h2',
            parent: this.element,
            content: `${levelData.doThis}`,
            className: 'directions',
        });
        this.levelData = levelData;
        this.levelNum = levelNum;
        this.table = new Table(this.element, this.levelData, this.onMouseOver.bind(this), this.onMouseOut.bind(this));
        this.editor = new Editor(
            this.element,
            this.levelData,
            this.onMouseOver.bind(this),
            this.onMouseOut.bind(this),
            this.checkGuess.bind(this)
        );
        this.viewerElements = this.editor.viewerElements;
    }

    public onMouseOver(e: MouseEvent): void {
        if (e.target instanceof HTMLElement) {
            const elem = e.target.closest('.viewer-window div') || e.target;

            if (elem instanceof HTMLElement) {
                const { tableElement, viewerElement } = this.getElements(elem) || {};

                if (tableElement && viewerElement) {
                    tableElement.classList.add('hover');
                    viewerElement.classList.add('hover');
                    this.table.showTooltip(viewerElement, tableElement.offsetLeft, tableElement.offsetTop);
                }
            }
        }
    }

    public onMouseOut(e: MouseEvent): void {
        if (e.target instanceof HTMLElement) {
            const elem = e.target.closest('.viewer-window div') || e.target;

            if (elem instanceof HTMLElement) {
                const { tableElement, viewerElement } = this.getElements(elem) || {};

                if (tableElement && viewerElement) {
                    tableElement.classList.remove('hover');
                    viewerElement.classList.remove('hover');
                    this.table.hideTooltip();
                }
            }
        }
    }

    private getElements(elem: HTMLElement): { tableElement: HTMLElement; viewerElement: HTMLElement } | null {
        let ind: number;
        if (this.viewerElements.includes(elem)) {
            ind = this.viewerElements.indexOf(elem);
        } else if (this.table.tableElements.includes(elem)) {
            ind = this.table.tableElements.indexOf(elem);
        } else return null;

        return { tableElement: this.table.tableElements[ind], viewerElement: this.viewerElements[ind] };
    }

    public checkGuess(input: HTMLInputElement): void {
        if (input.value.trim()) {
            const guessValue: NodeListOf<HTMLElement> = this.table.tableContainer.querySelectorAll(input.value);
            const testValue: NodeListOf<HTMLElement> = this.table.tableContainer.querySelectorAll(
                this.levelData.selector
            );

            if (
                guessValue.length === testValue.length &&
                [...guessValue].every((elem, ind) => elem === testValue[ind])
            ) {
                this.onCorrectGuess([...guessValue]);
                return;
            }
        } else input.value = '';

        this.onWrongGuess();
    }

    private onCorrectGuess(elements: HTMLElement[]) {
        this.table.animateElements(elements);
        setTimeout(
            () => observer.notify(this.levelNum < LEVELS_TOTAL - 1 ? this.levelNum + 1 : this.levelNum, true),
            1000
        );
    }

    private onWrongGuess() {
        this.editor.addEditorAnimation();
    }
}
