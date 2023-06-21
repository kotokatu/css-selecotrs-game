import { BaseComponent } from '../../common/base-component';
import { LevelsHeader } from './levels-header/levels-header';
import { LevelGuide } from './levels-content/level-guide';
import { LevelObject } from '../../data/levels-list';
// import { state } from '../../controller/state';
// import { DEFAULT_LEVEL } from '../../common/constants';
import './levels.css';

export class Levels extends BaseComponent {
    levelsHeader: BaseComponent;
    levelGuide: BaseComponent;
    constructor(parent: HTMLElement, levelNum: number, levelData: LevelObject) {
        super({ parent, className: 'levels-container' });
        this.levelsHeader = new LevelsHeader(this.element, levelNum);
        this.levelGuide = new LevelGuide(this.element, levelData);
    }
}
