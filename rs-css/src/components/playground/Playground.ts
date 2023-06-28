import { BaseComponent } from '../../common/base-component';
import { Editor } from './editor/Editor';
import { Viewer } from './viewer/Viewer';
import { Table } from './table/Table';
import { observer } from '../../common/observer';
import { LevelObject } from '../../data/levelsData';
import { Button } from '../../common/button/button';
import './playground.css';

export class Playground extends BaseComponent {
    private table: Table;
    private editor: Editor;
    private viewer: Viewer;
    private editorWrapper: HTMLElement;
    private task: HTMLHeadingElement;
    private levelNum: number;
    private levelData: LevelObject;
    constructor(parent: HTMLElement, levelData: LevelObject, levelNum: number) {
        super({ parent, className: 'playground-container' });
        this.levelData = levelData;
        this.levelNum = levelNum;
        this.task = new BaseComponent<HTMLHeadingElement>({
            tag: 'h2',
            parent: this.element,
            content: `${levelData.task}`,
            className: 'task',
        }).element;
        this.table = new Table(this.element, this.levelData, this.onMouseOver.bind(this), this.onMouseOut.bind(this));
        this.editorWrapper = new BaseComponent({ parent: this.element, className: 'editor-wrapper' }).element;
        this.editorWrapper.addEventListener('animationend', this.removeEditorAnimation.bind(this));
        this.editor = new Editor(this.editorWrapper, this.checkGuess.bind(this));
        this.viewer = new Viewer(
            this.editorWrapper,
            levelData,
            this.onMouseOver.bind(this),
            this.onMouseOut.bind(this)
        );
        new Button({
            parent: this.element,
            className: 'help-btn',
            content: 'help',
            onClick: this.handleHelpButtonClick.bind(this),
        });
    }

    private onMouseOver(e: MouseEvent): void {
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

    private onMouseOut(e: MouseEvent): void {
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
        const viewerElements = this.viewer.viewerElements;
        const tableElements = this.table.tableElements;
        if (viewerElements.includes(elem)) {
            ind = viewerElements.indexOf(elem);
        } else if (tableElements.includes(elem)) {
            ind = tableElements.indexOf(elem);
        } else return null;

        return { tableElement: tableElements[ind], viewerElement: viewerElements[ind] };
    }

    public checkGuess(input: HTMLInputElement): void {
        try {
            const guessValue: NodeListOf<HTMLElement> = this.table.tableContainer.querySelectorAll(input.value);
            const testValue: NodeListOf<HTMLElement> = this.table.tableContainer.querySelectorAll(
                this.levelData.selector
            );

            if (
                testValue.length &&
                guessValue.length === testValue.length &&
                [...guessValue].every((elem, ind) => elem === testValue[ind])
            ) {
                this.onCorrectGuess([...guessValue]);
            } else {
                this.addEditorAnimation();
            }
        } catch (err) {
            this.addEditorAnimation();
        }
    }

    public onCorrectGuess(elements: HTMLElement[]) {
        this.table.animateElements(elements);
        setTimeout(
            () =>
                observer.notify({
                    levelNum: this.levelNum + 1,
                    isCompleted: true,
                }),
            1000
        );
    }

    public handleHelpButtonClick(): void {
        observer.notify({ isHintUsed: true });
        this.editor.update();
        this.editor.showAnswer(this.levelData.selector, 0);
    }

    private addEditorAnimation() {
        this.editorWrapper.classList.add('shake');
    }

    private removeEditorAnimation() {
        this.editorWrapper.classList.remove('shake');
    }

    public update(levelData: LevelObject, levelNum: number, isOver?: boolean) {
        this.editor.update();
        this.levelData = levelData;
        this.levelNum = levelNum;
        this.task.textContent = `${levelData.task}`;
        this.viewer.update(levelData, isOver);
        this.table.update(levelData, isOver);
    }
}
