import '@testing-library/jest-dom';
import { disableElement, enableElement } from '../common/helpers';
import { BaseComponent } from '../components/abstract/base-component';
import { App } from '../app';
import { Menu } from '../components/menu/Menu';
import { Table } from '../components/playground/table/Table';
import { Editor } from '../components/playground/editor/Editor';

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
    it('add attribute "disabled" to element', () => {
        disableElement(elem);
        expect(elem).toBeDisabled();
    });
    it('remove attribute "disabled" from element', () => {
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
    it('creates a base component', () => {
        expect(testComponent.element).not.toBeNull();
        expect(testComponent.element.textContent).toEqual('test-content');
        expect(testComponent.element.className).toEqual('component');
        expect(document.body).toContainElement(testComponent.element);
    });
});

jest.mock('../components/menu/Menu');
const mockedMenu = jest.mocked(Menu, { shallow: false });
afterAll(() => {
    mockedMenu.mockClear();
});
describe('Menu', () => {
    it('calls Menu class constructor from App', () => {
        new App(document.body);
        expect(mockedMenu).toHaveBeenCalledTimes(1);
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
    it('adds message "Congratulations! You are a pro at CSS!" to table', () => {
        table.displayWinMessage();
        expect(table.tableContainer.children.length).toEqual(1);
        expect(table.tableContainer.children[0].textContent).toEqual('Congratulations! You are a pro at CSS!');
    });
    it('tests if all elements from array are in the DOM', () => {
        table.tableElements.every((elem: HTMLElement) => expect(table.tableContainer).toContainElement(elem));
    });
    it('adds animation to table items', () => {
        table.addWrongItemAnimation(table.tableElements);
        table.tableElements.every((elem: HTMLElement) => expect(elem).toHaveClass('shake'));
    });
});

describe('editor.clear', () => {
    let editor: Editor;
    beforeEach(() => {
        editor = new Editor(container, f);
    });
    afterEach(() => {
        editor.destroy();
    });
    it('clear input value', () => {
        editor.clear();
        expect(editor.input.value).toEqual('');
    });
});

jest.mock('../app');
const mockedApp = jest.mocked(App, { shallow: false });
afterEach(() => {
    mockedApp.mockClear();
});
