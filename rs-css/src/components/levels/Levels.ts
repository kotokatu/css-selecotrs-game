import { BaseComponent } from '../../common/base-component';
import { LevelsHeader } from './levels-header/levels-header';
import { LevelGuide } from './levels-content/level-guide';
import { state } from '../../controller/state';
import './levels.css';

export class Levels extends BaseComponent {
    levelsHeader: BaseComponent;
    levelGuide: BaseComponent;
    constructor(parent: HTMLElement) {
        super({ parent, className: 'levels-container' });
        this.levelsHeader = new LevelsHeader(this.element, state.level);
        this.levelGuide = new LevelGuide(this.element);
    }
}
