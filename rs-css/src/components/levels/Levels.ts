import { BaseComponent } from '../../common/base-component';
import { LevelsHeader } from './levels-header/levels-header';
import { state } from '../../controller/state';
import './levels.css';

export class Levels extends BaseComponent {
    level = state.level;
    levelsHeader: HTMLElement;
    constructor(parent: HTMLElement) {
        super({ parent, className: 'levels-container' });
        this.levelsHeader = new LevelsHeader(this.element, this.level).element;
    }
}
