/**
 * @jest-environment jsdom
 */
import { disableElements, enableElements } from '../src/common/helpers';

describe('test toggling element disable', () => {
    let elem: HTMLDivElement;
    beforeEach(() => {
        elem = document.createElement('div');
    });
    afterEach(() => {
        elem.remove();
    });
    it('add attribute "disabled" to element', () => {
        disableElements(elem);
        expect(elem.getAttribute('disabled')).toBeTruthy();
    });
    it('add attribute "disabled" to element', () => {
        elem.setAttribute('disabled', 'true');
        enableElements(elem);
        expect(elem.getAttribute('disabled')).toBeFalsy();
    });
});
