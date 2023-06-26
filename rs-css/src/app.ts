import { Playground } from './components/playground/Playground';
import { Menu } from './components/menu/levels-menu';
import { observer } from './common/observer';
import { LEVELS_LIST } from './data/levelsData';
import './css/style.css';

export const LEVELS_TOTAL = LEVELS_LIST.length;
export const DEFAULT_LEVEL = 0;

export type UpdateStateParams = {
    levelNum?: number;
    isCompleted?: boolean;
    isHintUsed?: boolean;
    reset?: boolean;
};

export type LevelState = Pick<UpdateStateParams, 'isCompleted' | 'isHintUsed'>;

enum StorageKey {
    State = 'state',
    Level = 'level',
}

class App {
    currLevel: number;
    state: LevelState[];
    appRoot: HTMLElement;
    constructor(appRoot: HTMLElement) {
        this.appRoot = appRoot;
        this.currLevel = Number(localStorage.getItem(StorageKey.Level));
        const storedState: string | null = localStorage.getItem(StorageKey.State);
        this.state = typeof storedState === 'string' ? JSON.parse(storedState) : this.createInitialState();
        observer.subscribe(this.updateState.bind(this));
        window.addEventListener('beforeunload', () =>
            localStorage.setItem(StorageKey.State, JSON.stringify(this.state))
        );
        window.addEventListener('beforeunload', () => localStorage.setItem(StorageKey.Level, `${this.currLevel}`));
    }

    public init(): void {
        new Playground(this.appRoot, LEVELS_LIST[this.currLevel], this.currLevel);
        new Menu(this.appRoot, this.currLevel, LEVELS_TOTAL, this.state);
    }

    private updateState(params: UpdateStateParams): void {
        const { levelNum, isCompleted, isHintUsed, reset } = params;
        if (isCompleted) {
            this.state[this.currLevel].isCompleted = params.isCompleted;
        }

        if (isHintUsed) {
            this.state[this.currLevel].isHintUsed = params.isHintUsed;
        }

        if (levelNum !== undefined) {
            this.currLevel = levelNum;
            this.updateApp();
        }

        if (reset) {
            this.createInitialState();
            this.updateApp();
        }
    }

    private updateApp(): void {
        this.appRoot.replaceChildren();
        this.init();
    }

    private createInitialState(): void {
        this.currLevel = DEFAULT_LEVEL;
        this.state = LEVELS_LIST.map((_) => {
            return { isCompleted: false, isHintUsed: false };
        });
    }
}

const app = new App(document.body);
app.init();
