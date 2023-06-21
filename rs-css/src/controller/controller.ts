// import { emitter } from '../common/event-emitter';
import { Playground } from '../components/playground/playground';
import { Levels } from '../components/levels/levels';
import { observer } from '../common/observer';
import { LEVELS_LIST, LevelObject } from '../data/levels-list';

export const LEVELS_TOTAL = LEVELS_LIST.length;
export const DEFAULT_LEVEL = 0;

export class Controller {
    levelNum: number = Number(localStorage.getItem('level')) || DEFAULT_LEVEL;
    levelsCompleted: number[] = [];
    levelData: LevelObject = LEVELS_LIST[this.levelNum];
    appRoot: HTMLElement;
    constructor(appRoot: HTMLElement) {
        this.appRoot = appRoot;
        observer.subscribe(this.update.bind(this));
    }

    public start() {
        this.appRoot.replaceChildren();
        new Playground(this.appRoot, this.levelData, this.levelNum);
        new Levels(this.appRoot, this.levelNum, this.levelData, this.levelsCompleted);
    }

    private update(levelNum: number, levelCompleted?: boolean) {
        if (levelCompleted && !this.levelsCompleted.includes(this.levelNum)) this.levelsCompleted.push(this.levelNum);
        this.levelNum = levelNum;
        this.levelData = LEVELS_LIST[this.levelNum];
        this.start();
    }
}
