/**
 * @jest-environment jsdom
 */

import { disableElement, enableElement } from '../common/helpers';
import { BaseComponent } from '../components/abstract/base-component';
import { App } from '../app';
import { Table } from '../components/playground/table/Table';
import { Editor } from '../components/playground/editor/Editor';
import { Viewer } from '../components/playground/viewer/Viewer';
import { Menu } from '../components/menu/Menu';
import { LevelData } from '../data/levelsData';

afterEach(() => {
    jest.clearAllMocks();
});

let container: HTMLDivElement;
const f = (): null => null;

beforeEach(() => {
    container = document.createElement('div');
});

afterEach(() => {
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
        expect(editor['input'].value).toEqual('');
    });
    it('should input "text" string in input and mockInput', async () => {
        await editor.showAnswer('test');
        expect(editor['input'].value).toEqual('test');
        expect(editor['mockInput'].textContent).toEqual('test');
    });
});

describe('Viewer', () => {
    let viewer: Viewer;
    let levelData: LevelData;
    beforeEach(() => {
        levelData = {
            task: 'task1',
            selector: 'selector1',
            markup: [{ tag: 'div' }],
        };
        viewer = new Viewer(container, levelData, f, f);
    });
    afterEach(() => {
        viewer.destroy();
    });
    it('should create a Viewer item and add it to items array', () => {
        viewer.viewerItems = [];
        const item: HTMLElement = viewer['createViewerItem']({ tag: 'test' });
        expect(item).toBeInstanceOf(HTMLDivElement);
        expect(viewer.viewerItems).toContain(item);
    });
    it('should add items to viewer window', () => {
        viewer['viewerWindow'].replaceChildren();
        viewer['addItemsToViewer']();
        expect(viewer['viewerWindow']).not.toBeEmptyDOMElement();
        expect(viewer['viewerWindow'].querySelectorAll('*').length).toBeGreaterThan(1);
    });
});

describe('Table', () => {
    let table: Table;
    beforeEach(() => {
        const data = {
            task: 'task1',
            selector: 'selector1',
            markup: [{ tag: 'div' }],
        };
        table = new Table(container, data, f, f, f);
    });
    afterEach(() => {
        table.destroy();
    });
    it('should create a Table item and add it to items array', () => {
        table.tableItems = [];
        const item: HTMLElement = table['createTableItem']({
            tag: 'div',
            class: 'test-class',
            id: 'test-id',
            attribute: ['data-test', 'data-value'],
            children: [{ tag: 'span' }],
        });
        expect(item).toBeInstanceOf(HTMLElement);
        expect(item).toHaveClass('test-class');
        expect(item.id).toEqual('test-id');
        expect(item).toHaveAttribute('data-test', 'data-value');
        expect(item).toContainHTML('<span></span>');
        expect(table.tableItems).toContain(item);
    });
    it('should add all elements from Items array to the DOM', () => {
        table.tableContainer.replaceChildren();
        table.tableItems = [];
        table['addItemsToTable']();
        table.tableItems.every((elem: HTMLElement) => expect(table.tableContainer).toContainElement(elem));
    });
    it('should add a container with the message "Congratulations! You are a pro at CSS!" to table', () => {
        table.displayWinMessage();
        expect(table.tableContainer.children.length).toEqual(1);
        expect(table.tableContainer.children[0].textContent).toEqual('Congratulations! You are a pro at CSS!');
    });
    it('should add animation to table items', () => {
        table.addWrongItemAnimation(table.tableItems);
        table.tableItems.every((elem: HTMLElement) => expect(elem).toHaveClass('shake'));
    });
});

jest.mock('../components/menu/Menu');
const mockedMenu = jest.mocked(Menu, { shallow: false });
describe('App', () => {
    let app: App;
    beforeEach(() => {
        app = new App(container);
    });
    it('should create default levels state', () => {
        const defaultState = app['createDefaultLevelsState']();
        defaultState.every((elem) => expect(elem).toEqual({ isCompleted: false, isHintUsed: false }));
    });
    it('should call Menu constructor from App class', () => {
        expect(mockedMenu).toHaveBeenCalledTimes(1);
    });
});
