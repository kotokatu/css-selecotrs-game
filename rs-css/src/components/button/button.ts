import { BaseComponent } from '../../common/base-component';
import { ComponentParams } from '../../common/base-component';
import './button.css';

export interface ButtonParams extends ComponentParams {
    onClick?: () => void;
}

export class Button extends BaseComponent<HTMLButtonElement> {
    constructor(params: ButtonParams) {
        super({
            tag: 'button',
            parent: params.parent,
            className: `button ${params.className}`,
            content: params.content,
        });
        if (params.onClick) this.element.onclick = params.onClick;
    }
}
