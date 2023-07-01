import { Playground } from './components/playground/Playground';
import { Menu } from './components/menu/Menu';
import { observer } from './common/observer';
import { LEVELS_LIST } from './data/levelsData';
import './css/style.css';

export const LEVELS_TOTAL: number = LEVELS_LIST.length;
export const DEFAULT_LEVEL = 0;

export type UpdateStateParams = {
    levelNum?: number;
    isCompleted?: boolean;
    isHintUsed?: boolean;
    isReset?: boolean;
};

export type LevelState = Pick<UpdateStateParams, 'isCompleted' | 'isHintUsed'>;

export enum AnimationName {
    OnCompleteLevel = 'bounce',
    OnError = 'shake',
    HelpButton = 'press',
    ActiveItem = 'pulsate',
}

enum StorageKey {
    State = 'state-rs-css',
    Level = 'level-rs-css',
}

class App {
    private currLevel: number;
    private levelsState: LevelState[];
    private menu: Menu;
    private playground: Playground;
    constructor(appRoot: HTMLElement) {
        this.currLevel = Number(localStorage.getItem(StorageKey.Level)) || DEFAULT_LEVEL;
        const storedState: string | null = localStorage.getItem(StorageKey.State);
        this.levelsState = typeof storedState === 'string' ? JSON.parse(storedState) : this.createDefaultLevelsState();
        this.playground = new Playground(appRoot, LEVELS_LIST[this.currLevel], this.currLevel);
        this.menu = new Menu(appRoot, this.currLevel, LEVELS_TOTAL, this.levelsState);
        observer.subscribe(this.updateState.bind(this));
        window.addEventListener('beforeunload', () => {
            localStorage.setItem(StorageKey.State, JSON.stringify(this.levelsState));
            localStorage.setItem(StorageKey.Level, `${this.currLevel}`);
        });
    }

    private updateState(params: UpdateStateParams): void {
        const { levelNum, isCompleted, isHintUsed, isReset } = params;

        if (isCompleted) {
            this.levelsState[this.currLevel].isCompleted = true;
        }

        if (isHintUsed) {
            this.levelsState[this.currLevel].isHintUsed = true;
            return;
        }

        if (levelNum === LEVELS_TOTAL) {
            this.updateApp(true);
            return;
        } else if (levelNum !== undefined) {
            this.currLevel = levelNum;
        }

        if (isReset) {
            this.setDefaultState();
        }

        this.updateApp();
    }

    private updateApp(isGameOver?: boolean): void {
        this.menu.update(this.currLevel, this.levelsState);
        this.playground.update(LEVELS_LIST[this.currLevel], this.currLevel, isGameOver);
    }

    private setDefaultState(): void {
        this.currLevel = DEFAULT_LEVEL;
        this.levelsState = this.createDefaultLevelsState();
    }

    private createDefaultLevelsState(): LevelState[] {
        return LEVELS_LIST.map(() => ({ isCompleted: false, isHintUsed: false }));
    }
}

new App(document.body);
