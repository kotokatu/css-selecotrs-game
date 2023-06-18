import { BaseComponent } from '../../common/base-component';
import { ComponentParams } from '../../common/base-component';
import './button.css';

export class Button extends BaseComponent<HTMLButtonElement> {
    constructor(params: ComponentParams, onClick: () => void) {
        super({ tag: 'button', parent: params.parent, className: `button ${params.className}` });
        this.element.onclick = onClick;
    }
}
