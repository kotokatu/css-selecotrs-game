import { Playground } from './components/playground/Playground';
import { Menu } from './components/menu/levels-menu';
import { observer } from './common/observer';
import { LEVELS_LIST } from './data/levelsData';
import './css/style.css';

export const LEVELS_TOTAL = LEVELS_LIST.length;
// export const DEFAULT_LEVEL = 0;

export type LevelState = {
    levelNum: number;
    isCompleted: boolean;
    isHintUsed: boolean;
};

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
        this.state = typeof storedState === 'string' ? JSON.parse(storedState) : this.createState();
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

    private updateState(params: Partial<LevelState>): void {
        if (params.isCompleted) {
            this.state[this.currLevel].isCompleted = params.isCompleted;
        }

        if (params.isHintUsed) {
            this.state[this.currLevel].isHintUsed = params.isHintUsed;
        }

        if (params.levelNum) {
            this.currLevel = params.levelNum;
            this.updateApp();
        }
    }

    private updateApp(): void {
        this.appRoot.replaceChildren();
        this.init();
    }

    private createState(): LevelState[] {
        return LEVELS_LIST.map((_, idx) => {
            return { levelNum: idx, isCompleted: false, isHintUsed: false };
        });
    }
}

const app = new App(document.body);
app.init();
