import { BaseComponent } from '../abstract/base-component';
import { Editor } from './editor/Editor';
import { Viewer } from './viewer/viewer';
import { Table } from './table/Table';
import { LevelData } from '../../data/levelsData';
import { Button } from '../abstract/button/button';
import { AnimationName } from '../../app';
import { disableElement, enableElement } from '../../common/helpers';
import { observer } from '../../common/observer';
import './playground.css';

type ItemPair = {
    tableItem: HTMLElement;
    viewerItem: HTMLElement;
};

export class Playground extends BaseComponent {
    private table: Table;
    private editor: Editor;
    private viewer: Viewer;
    private editorWrapper: HTMLDivElement;
    private task: HTMLHeadingElement;
    private levelNum: number;
    private levelData: LevelData;
    private helpButton: HTMLButtonElement;
    constructor(parent: HTMLElement, levelData: LevelData, levelNum: number) {
        super({ parent, className: 'playground-container' });
        this.levelData = levelData;
        this.levelNum = levelNum;
        this.task = new BaseComponent<HTMLHeadingElement>({
            tag: 'h2',
            parent: this.element,
            content: `${levelData.task}`,
            className: 'task',
        }).element;
        this.table = new Table(
            this.element,
            this.levelData,
            this.onMouseOver.bind(this),
            this.onMouseOut.bind(this),
            this.onCompletedLevel.bind(this)
        );
        this.helpButton = new Button({
            parent: this.element,
            className: 'help-btn',
            content: 'help',
            onClick: this.handleHelpButtonClick.bind(this),
        }).element;
        this.editorWrapper = new BaseComponent<HTMLDivElement>({
            parent: this.element,
            className: 'editor-wrapper',
        }).element;
        this.editorWrapper.addEventListener('animationend', this.removeEditorAnimation.bind(this));
        this.editor = new Editor(this.editorWrapper, this.checkGuess.bind(this));
        this.viewer = new Viewer(
            this.editorWrapper,
            levelData,
            this.onMouseOver.bind(this),
            this.onMouseOut.bind(this)
        );
    }

    private onMouseOver(e: MouseEvent): void {
        if (e.target instanceof HTMLElement) {
            const item: HTMLElement = e.target.closest('.viewer-window div') || e.target;

            if (item instanceof HTMLElement) {
                const { tableItem, viewerItem }: ItemPair = this.getItems(item);

                if (tableItem && viewerItem) {
                    tableItem.classList.add('hover');
                    viewerItem.classList.add('hover');
                    this.table.showTooltip(viewerItem, tableItem.getBoundingClientRect().left);
                }
            }
        }
    }

    public onMouseOut(e: MouseEvent): void {
        if (e.target instanceof HTMLElement) {
            const item: HTMLElement = e.target.closest('.viewer-window div') || e.target;

            if (item instanceof HTMLElement) {
                const { tableItem, viewerItem }: ItemPair = this.getItems(item);

                if (tableItem && viewerItem) {
                    tableItem.classList.remove('hover');
                    viewerItem.classList.remove('hover');
                    this.table.hideTooltip();
                }
            }
        }
    }

    private getItems(item: HTMLElement): ItemPair {
        let ind: number;
        const viewerItems: HTMLElement[] = this.viewer.viewerItems;
        const tableItems: HTMLElement[] = this.table.tableItems;
        if (viewerItems.includes(item)) {
            ind = viewerItems.indexOf(item);
        } else {
            ind = tableItems.indexOf(item);
        }

        return { tableItem: tableItems[ind], viewerItem: viewerItems[ind] };
    }

    public checkGuess(inputText: string): void {
        try {
            const guessValue: NodeListOf<HTMLElement> = this.table.tableContainer.querySelectorAll(inputText);
            const testValue: NodeListOf<HTMLElement> = this.table.tableContainer.querySelectorAll(
                this.levelData.selector
            );

            if (
                testValue.length &&
                guessValue.length === testValue.length &&
                [...guessValue].every((item, ind) => item === testValue[ind])
            ) {
                this.table.removeActiveElements([...guessValue]);
            } else if (guessValue.length) {
                this.table.addWrongItemAnimation([...guessValue]);
            } else {
                this.addEditorAnimation();
            }
        } catch {
            this.addEditorAnimation();
        }
    }

    private onCompletedLevel(): void {
        observer.notify({
            levelNum: this.levelNum + 1,
            isCompleted: true,
        });
    }

    private async handleHelpButtonClick(): Promise<void> {
        observer.notify({ isHintUsed: true });
        disableElement(this.helpButton);
        await this.editor.showAnswer(this.levelData.selector);
        enableElement(this.helpButton);
    }

    private addEditorAnimation(): void {
        this.editorWrapper.classList.add(AnimationName.OnError);
    }

    private removeEditorAnimation(): void {
        this.editorWrapper.classList.remove(AnimationName.OnError);
    }

    public update(levelData: LevelData, levelNum: number, isGameOver?: boolean): void {
        this.levelData = levelData;
        this.levelNum = levelNum;
        this.task.textContent = `${levelData.task}`;
        this.editor.clear();
        this.viewer.update(levelData, isGameOver);
        this.table.update(levelData, isGameOver);
    }
}
