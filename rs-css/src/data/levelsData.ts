export type LevelData = {
    task: string;
    selector: string;
    markup: ItemData[];
};

export type ItemData = {
    tag: string;
    isAnimated?: boolean;
    class?: string;
    id?: string;
    attribute?: [string, string];
    children?: ItemData[];
};

export const LEVELS_LIST: readonly LevelData[] = [
    {
        task: 'Select the pan',
        selector: 'pan',
        markup: [{ tag: 'plate' }, { tag: 'pan', isAnimated: true }, { tag: 'plate' }],
    },
    {
        task: 'Select the plates',
        selector: 'plate',
        markup: [
            { tag: 'plate', isAnimated: true },
            { tag: 'plate', class: 'red', isAnimated: true },
        ],
    },
    {
        task: 'Select all tomatoes and cookies',
        selector: 'tomato, cookie',
        markup: [
            { tag: 'plate', children: [{ tag: 'tomato', isAnimated: true }] },
            { tag: 'knife' },
            { tag: 'cookie', class: 'big', isAnimated: true },
            {
                tag: 'towel',
                children: [
                    { tag: 'tomato', isAnimated: true },
                    { tag: 'cookie', isAnimated: true },
                ],
            },
            { tag: 'fork' },
        ],
    },
    {
        task: 'Select the dessert plate',
        selector: '#dessert',
        markup: [{ tag: 'plate', id: 'dessert', isAnimated: true }, { tag: 'plate' }, { tag: 'plate', class: 'red' }],
    },
    {
        task: 'Select the napkin on a plate',
        selector: 'plate napkin',
        markup: [
            { tag: 'napkin' },
            { tag: 'plate', class: 'red', children: [{ tag: 'napkin', isAnimated: true }] },
            { tag: 'plate', class: 'green' },
        ],
    },
    {
        task: 'Select the red napkins',
        selector: 'napkin.red',
        markup: [
            { tag: 'plate', class: 'green', children: [{ tag: 'napkin', class: 'red', isAnimated: true }] },
            { tag: 'plate', children: [{ tag: 'napkin' }] },
            { tag: 'plate', class: 'red', children: [{ tag: 'napkin', class: 'red', isAnimated: true }] },
        ],
    },
    {
        task: 'Select the napkin on the dessert plate',
        selector: '#dessert napkin',
        markup: [
            { tag: 'plate', children: [{ tag: 'napkin' }] },
            { tag: 'plate', id: 'dessert', children: [{ tag: 'napkin', class: 'red', isAnimated: true }] },
            { tag: 'plate', children: [{ tag: 'napkin', class: 'red' }] },
        ],
    },
    {
        task: 'Select the fork on an empty plate',
        selector: 'plate > fork',
        markup: [
            { tag: 'plate', children: [{ tag: 'napkin', class: 'red', children: [{ tag: 'fork' }] }] },
            { tag: 'plate', children: [{ tag: 'fork', isAnimated: true }] },
            { tag: 'plate', class: 'green', children: [{ tag: 'napkin', class: 'red' }] },
        ],
    },
    {
        task: 'Select the big knife on a board',
        selector: 'board knife.big',
        markup: [
            { tag: 'knife', class: 'big' },
            { tag: 'board', children: [{ tag: 'knife', class: 'small' }] },
            { tag: 'board', children: [{ tag: 'knife', class: 'big', isAnimated: true }] },
            { tag: 'board', children: [{ tag: 'fish', class: 'big' }] },
        ],
    },
    {
        task: 'Select the big green fish',
        selector: 'fish.big.green',
        markup: [
            { tag: 'board', children: [{ tag: 'fish', class: 'green' }] },
            { tag: 'board', children: [{ tag: 'apple', class: 'big green' }] },
            { tag: 'board', children: [{ tag: 'fish', class: 'big' }] },
            { tag: 'board', children: [{ tag: 'fish', class: 'big green', isAnimated: true }] },
        ],
    },
    {
        task: 'Select everything',
        selector: '*',
        markup: [
            { tag: 'plate', children: [{ tag: 'steak', isAnimated: true }], isAnimated: true },
            { tag: 'plate', id: 'dessert', children: [{ tag: 'apple', isAnimated: true }], isAnimated: true },
            { tag: 'plate', children: [{ tag: 'broccoli', isAnimated: true }], isAnimated: true },
            {
                tag: 'napkin',
                children: [
                    { tag: 'knife', isAnimated: true },
                    { tag: 'fork', isAnimated: true },
                ],
                isAnimated: true,
            },
        ],
    },
    {
        task: 'Select the empty pan',
        selector: 'pan:empty',
        markup: [
            { tag: 'pan', children: [{ tag: 'sausage' }] },
            { tag: 'plate', class: 'green', children: [{ tag: 'broccoli' }] },
            { tag: 'pan', isAnimated: true },
            { tag: 'napkin' },
        ],
    },
    {
        task: 'Select the plate with a big fish',
        selector: 'plate:has(fish.big)',
        markup: [
            { tag: 'board', children: [{ tag: 'fish', class: 'big' }] },
            { tag: 'plate', children: [{ tag: 'fish' }] },
            { tag: 'plate', children: [{ tag: 'fish', class: 'big' }], isAnimated: true },
            { tag: 'plate', children: [{ tag: 'knife', class: 'big' }] },
        ],
    },
    {
        task: 'Select everything except the butcher knife',
        selector: ':not(.butcher)',
        markup: [
            { tag: 'fork', isAnimated: true },
            { tag: 'knife', class: 'small', isAnimated: true },
            { tag: 'knife', class: 'big', isAnimated: true },
            { tag: 'knife', class: 'butcher' },
            { tag: 'knife', isAnimated: true },
            { tag: 'spoon', isAnimated: true },
        ],
    },
    {
        task: 'Select the pans with no steak',
        selector: 'pan:not(:has(steak))',
        markup: [
            { tag: 'pan', children: [{ tag: 'broccoli' }, { tag: 'steak' }] },
            { tag: 'pan', children: [{ tag: 'fish' }], isAnimated: true },
            { tag: 'pan', children: [{ tag: 'egg' }], isAnimated: true },
            { tag: 'pan', children: [{ tag: 'steak' }] },
        ],
    },
    {
        task: 'Select every cookie that is right next to a plate',
        selector: 'plate + cookie',
        markup: [
            { tag: 'cookie' },
            { tag: 'plate', id: 'dessert', children: [{ tag: 'cookie' }] },
            { tag: 'cookie', class: 'big', isAnimated: true },
            { tag: 'cookie' },
            { tag: 'plate', class: 'red' },
            { tag: 'cookie', isAnimated: true },
        ],
    },
    {
        task: 'Select all spoons preceded by a towel',
        selector: 'towel ~ spoon',
        markup: [
            { tag: 'spoon' },
            { tag: 'towel', children: [{ tag: 'spoon' }] },
            { tag: 'spoon', isAnimated: true },
            { tag: 'spoon', isAnimated: true },
            { tag: 'plate', children: [{ tag: 'spoon' }, { tag: 'fork' }] },
            { tag: 'spoon', isAnimated: true },
        ],
    },
    {
        task: 'Select the top cookie on a plate',
        selector: 'cookie:first-child',
        markup: [
            { tag: 'broccoli' },
            { tag: 'towel', children: [{ tag: 'tomato' }, { tag: 'cookie' }] },
            { tag: 'plate', children: [{ tag: 'cookie', isAnimated: true }, { tag: 'cookie' }, { tag: 'cookie' }] },
            { tag: 'cookie', class: 'big' },
        ],
    },
    {
        task: 'Select the 2nd plate',
        selector: 'plate:nth-child(2)',
        markup: [
            { tag: 'plate', class: 'green' },
            { tag: 'plate', isAnimated: true },
            { tag: 'plate', class: 'red' },
            { tag: 'plate', id: 'dessert' },
        ],
    },
    {
        task: 'Select every other apple',
        selector: 'apple:nth-of-type(odd)',
        markup: [
            { tag: 'apple', class: 'green', isAnimated: true },
            { tag: 'apple' },
            { tag: 'spoon' },
            { tag: 'apple', isAnimated: true },
            { tag: 'fork' },
            { tag: 'apple', class: 'yellow' },
            { tag: 'apple', class: 'big green', isAnimated: true },
        ],
    },
    {
        task: 'Select the plates for someone',
        selector: '[for]',
        markup: [
            { tag: 'plate', class: 'red', attribute: ['for', 'Nina'], children: [{ tag: 'egg' }], isAnimated: true },
            {
                tag: 'plate',
                class: 'green',
                attribute: ['for', 'Clive'],
                children: [{ tag: 'steak' }],
                isAnimated: true,
            },
            { tag: 'plate', class: 'red', children: [{ tag: 'fish', class: 'big green' }] },
            { tag: 'plate', attribute: ['for', 'Alex'], children: [{ tag: 'broccoli' }], isAnimated: true },
        ],
    },
    {
        task: 'Select the plates for Nina and Nick',
        selector: '[for^=Ni]',
        markup: [
            { tag: 'plate', attribute: ['for', 'Annie'], children: [{ tag: 'fish', class: 'green' }] },
            { tag: 'fork' },
            {
                tag: 'plate',
                class: 'red',
                attribute: ['for', 'Nina'],
                children: [{ tag: 'fish', class: 'green' }],
                isAnimated: true,
            },
            { tag: 'plate', attribute: ['for', 'Nick'], children: [{ tag: 'cake' }], isAnimated: true },
            { tag: 'napkin', children: [{ tag: 'knife' }] },
        ],
    },
];
