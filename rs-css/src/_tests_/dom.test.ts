/**
 * @jest-environment jsdom
 */

import { disableElement, enableElement } from '../common/helpers';
import { BaseComponent } from '../components/abstract/base-component';
import { App } from '../app';
import { Playground } from '../components/playground/Playground';
import { Table } from '../components/playground/table/Table';
import { Editor } from '../components/playground/editor/Editor';
import { Viewer } from '../components/playground/viewer/Viewer';
import { Menu } from '../components/menu/Menu';

let container: HTMLElement;
const f = (): null => null;

beforeAll(() => {
    container = document.createElement('div');
});

afterAll(() => {
    container.remove();
});

describe('input disable/enable', () => {
    let elem: HTMLInputElement;
    beforeEach(() => {
        elem = document.createElement('input');
    });
    afterEach(() => {
        elem.remove();
    });
    it('should add attribute "disabled" to element', () => {
        disableElement(elem);
        expect(elem).toBeDisabled();
    });
    it('should remove attribute "disabled" from element', () => {
        elem.disabled = true;
        enableElement(elem);
        expect(elem).toBeEnabled;
    });
});

describe('BaseComponent', () => {
    let testComponent: BaseComponent;
    beforeAll(() => {
        testComponent = new BaseComponent({
            tag: 'div',
            parent: document.body,
            className: 'component',
            content: 'test-content',
        });
    });
    afterAll(() => {
        testComponent.destroy();
    });
    it('should create a base component', () => {
        expect(testComponent.element).not.toBeNull();
        expect(testComponent.element.textContent).toEqual('test-content');
        expect(testComponent.element.className).toEqual('component');
        expect(document.body).toContainElement(testComponent.element);
    });
});

jest.mock('../components/menu/Menu');
const mockedMenu = jest.mocked(Menu, { shallow: false });
afterEach(() => {
    mockedMenu.mockClear();
});
describe('Menu', () => {
    it('should call Menu class constructor from App', () => {
        new App(document.body);
        expect(mockedMenu).toHaveBeenCalledTimes(1);
    });
});

describe('Editor', () => {
    let editor: Editor;
    beforeEach(() => {
        editor = new Editor(container, f);
    });
    afterEach(() => {
        editor.destroy();
    });
    it('should clear input value', () => {
        editor.clear();
        expect(editor.input.value).toEqual('');
    });
});

describe('Viewer', () => {
    let viewer: Viewer;
    beforeEach(() => {
        const data = {
            task: 'task1',
            selector: 'selector1',
            markup: [{ tag: 'parent', children: [{ tag: 'child' }] }],
        };
        viewer = new Viewer(container, data, f, f);
    });
    afterEach(() => {
        viewer.destroy();
    });
    it('should create an array of elements', () => {
        expect(viewer.viewerElements).not.toBeNull;
    });
});

describe('Table', () => {
    let table: Table;
    beforeEach(() => {
        const data = {
            task: 'task1',
            selector: 'selector1',
            markup: [{ tag: 'parent', children: [{ tag: 'child' }] }],
        };
        table = new Table(container, data, f, f, f);
    });
    afterEach(() => {
        table.destroy();
    });
    it('should add all elements from array are in the DOM', () => {
        table.tableElements.every((elem: HTMLElement) => expect(table.tableContainer).toContainElement(elem));
    });
    it('should add message "Congratulations! You are a pro at CSS!" to table', () => {
        table.displayWinMessage();
        expect(table.tableContainer.children.length).toEqual(1);
        expect(table.tableContainer.children[0].textContent).toEqual('Congratulations! You are a pro at CSS!');
    });
    it('should add animation to table items', () => {
        table.addWrongItemAnimation(table.tableElements);
        table.tableElements.every((elem: HTMLElement) => expect(elem).toHaveClass('shake'));
    });
});

// describe('Menu', () => {
//     const menu: Menu = new Menu(container, 0, 1, [{ isCompleted: false, isHintUsed: false }]);

//     afterEach(() => {
//         menu.destroy();
//     });
//     it('clear input value', () => {
//         expect(1).not.toBeNull;
//     });
// });
