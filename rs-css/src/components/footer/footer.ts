import { BaseComponent } from '../abstract/base-component';
import '../footer/footer.css';

export class Footer extends BaseComponent {
    constructor(parent: HTMLElement) {
        super({ tag: 'footer', parent, className: 'footer' });
        this.render();
    }

    private render() {
        const githubLink = new BaseComponent<HTMLAnchorElement>({
            tag: 'a',
            parent: this.element,
            className: 'footer-link__github',
            content: '@kotokatu<br>2023',
        }).element;
        githubLink.href = 'https://github.com/kotokatu';
        const rsSchoolLink = new BaseComponent<HTMLAnchorElement>({
            tag: 'a',
            parent: this.element,
            className: 'footer-rsschool',
        }).element;
        rsSchoolLink.href = 'https://rs.school/js/';
    }
}
