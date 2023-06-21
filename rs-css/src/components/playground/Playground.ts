import { BaseComponent } from '../../common/base-component';
import { Table } from '../table/table';
import { Editor } from '../editor/editor';
import { observer } from '../../common/observer';
import { LevelObject } from '../../data/levels-list';
import { LEVELS_TOTAL } from '../../app';
import './playground.css';

export class Playground extends BaseComponent {
    table: Table;
    editor: Editor;
    output: HTMLElement;
    levelNum: number;
    levelData: LevelObject;
    constructor(parent: HTMLElement, levelData: LevelObject, levelNum: number) {
        super({ parent, className: 'game-container' });
        new BaseComponent<HTMLHeadingElement>({
            tag: 'h2',
            parent: this.element,
            content: `${levelData.doThis}`,
            className: 'directions',
        });
        this.levelData = levelData;
        this.levelNum = levelNum;
        this.table = new Table(
            this.element,
            this.levelData,
            this.onMouseOver.bind(this),
            this.onMouseOut.bind(this),
            this.completeLevel.bind(this)
        );
        this.editor = new Editor(
            this.element,
            this.levelData,
            this.onMouseOver.bind(this),
            this.onMouseOut.bind(this),
            this.checkGuess.bind(this)
        );
        this.output = this.editor.output;
    }

    public onMouseOver(e: MouseEvent, selector: string): void {
        if (e.target && e.target instanceof HTMLElement) {
            const ind: number = [...document.querySelectorAll(selector)].indexOf(e.target);
            if (ind > -1) {
                const elemOnTable = this.table.tableElement.querySelectorAll('*')[ind];
                const elemInViewer = this.output.querySelectorAll('*')[ind];
                if (elemOnTable instanceof HTMLElement && elemInViewer instanceof HTMLElement) {
                    elemOnTable.classList.add('hover');
                    elemInViewer.classList.add('hover');
                    this.table.showTooltip(elemInViewer, elemOnTable.offsetLeft, elemOnTable.offsetTop);
                }
            }
        }
    }

    public onMouseOut(e: MouseEvent, selector: string): void {
        if (e.target && e.target instanceof HTMLElement) {
            const ind: number = [...document.querySelectorAll(selector)].indexOf(e.target);
            if (ind > -1) {
                this.table.tableElement.querySelectorAll('*')[ind]?.classList.remove('hover');
                this.output.querySelectorAll('*')[ind]?.classList.remove('hover');
                this.table.hideTooltip();
            }
        }
    }

    public checkGuess(e: KeyboardEvent): void {
        if (e.code === 'Enter' && e.target instanceof HTMLInputElement) {
            // eslint-disable-next-line prettier/prettier

            if (e.target.value) {
                const guessValue: NodeListOf<HTMLElement> = this.table.tableElement.querySelectorAll(e.target.value);
                const testValue: NodeListOf<HTMLElement> = this.table.tableElement.querySelectorAll(
                    this.levelData.selector
                );

                if (
                    guessValue.length === testValue.length &&
                    [...guessValue].every((elem, ind) => elem === testValue[ind])
                ) {
                    this.onCorrectGuess([...guessValue]);
                    return;
                }
            }

            this.onWrongGuess();
        }
    }

    private onCorrectGuess(elements: HTMLElement[]) {
        this.table.animateElements(elements);
    }

    private onWrongGuess() {
        this.editor.addEditorAnimation();
    }

    public completeLevel() {
        observer.notify(this.levelNum < LEVELS_TOTAL - 1 ? this.levelNum + 1 : this.levelNum, true);
    }
}
