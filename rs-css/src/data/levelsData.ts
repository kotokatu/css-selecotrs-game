export type LevelObject = {
    task: string;
    selector: string;
    markup: elemObject[];
};

export type elemObject = {
    tag: string;
    isAnimated?: boolean;
    class?: string;
    id?: string;
    attribute?: [string, string];
    children?: elemObject[];
};

export const LEVELS_LIST: readonly LevelObject[] = [
    {
        task: 'Select the plates',
        selector: 'plate',
        markup: [
            { tag: 'plate', isAnimated: true },
            { tag: 'plate', class: 'red', isAnimated: true },
        ],
    },
    {
        task: 'Select the pan',
        selector: 'pan',
        markup: [{ tag: 'plate' }, { tag: 'pan', isAnimated: true }, { tag: 'plate' }],
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
        task: 'Select the yellow apple',
        selector: '.yellow',
        markup: [
            { tag: 'apple', class: 'green' },
            { tag: 'plate', children: [{ tag: 'apple', class: 'green' }, { tag: 'apple' }] },
            { tag: 'apple', class: 'yellow', isAnimated: true },
            { tag: 'apple' },
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
        task: 'Select the big fish',
        selector: 'fish.big',
        markup: [
            { tag: 'plate', children: [{ tag: 'knife', class: 'small' }] },
            { tag: 'plate', children: [{ tag: 'fish' }] },
            { tag: 'plate', children: [{ tag: 'fish', class: 'big', isAnimated: true }] },
            { tag: 'plate', children: [{ tag: 'knife', class: 'big' }] },
        ],
    },
    {
        task: 'Select the big knife on a board',
        selector: 'board .big',
        markup: [
            { tag: 'knife', class: 'big' },
            { tag: 'board', children: [{ tag: 'knife', class: 'small' }] },
            { tag: 'board', children: [{ tag: 'knife', class: 'big', isAnimated: true }] },
            { tag: 'board', children: [{ tag: 'fish', class: 'big' }] },
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
        task: 'Select the big green fish',
        selector: 'fish.big.green',
        markup: [
            { tag: 'board', children: [{ tag: 'fish', class: 'green' }] },
            { tag: 'board', children: [{ tag: 'apple', class: 'big green' }] },
            { tag: 'board', children: [{ tag: 'fish' }] },
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
        ],
    },
];
// {
//     doThis: 'Select all the plates and bentos',
//     selector: 'plate,bento',
//     selectorName: 'Comma Combinator',
//     helpTitle: 'Combine, selectors, with... commas!',
//     syntax: 'A, B',
//     help:
//         'Thanks to Shatner technology, this selects all <span class="highlight-dark">A</span> and <span class="highlight-dark">B</span> elements. You can combine any selectors this way, and you can specify more than two.',
//     examples: [
//         '<span class="highlight-dark">p, .fun</span> selects all <span class="highlight-dark">&lt;p&gt;</span> elements as well as all elements with <span class="highlight-dark">class="fun"</span>',
//         '<span class="highlight-dark">a, p, div</span> selects all <span class="highlight-dark">&lt;a&gt;</span>, <span class="highlight-dark">&lt;p&gt;</span> and <span class="highlight-dark">&lt;div&gt;</span> elements',
//     ],
//     markupElements: `
// <pickle class="small"/>
// <pickle/>
// <plate>
//   <pickle/>
// </plate>
// <bento>
//   <pickle/>
// </bento>
// <plate>
//   <pickle/>
// </plate>
// <pickle/>
// <pickle class="small"/>
// `,
// },
// {
//     doThis: 'Select all the things!',
//     selector: '*',
//     selectorName: 'The Universal Selector',
//     helpTitle: 'You can select everything!',
//     syntax: '*',
//     help: 'You can select all elements with the universal selector! ',
//     examples: ['<span class="highlight-dark">p *</span> selects any element inside all <span class="highlight-dark">&lt;p&gt;</span> elements.'],
//     markupElements: `
// <apple/>
// <plate>
//   <orange class="small" />
// </plate>
// <bento/>
// <bento>
//   <orange/>
// </bento>
// <plate id="fancy"/>
// `,
// },
// {
//     doThis: 'Select everything on a plate',
//     selector: 'plate *',
//     syntax: 'A&nbsp;&nbsp;*',
//     helpTitle: 'Combine the Universal Selector',
//     help: 'This selects all elements inside of <span class="highlight-dark">A</span>.',
//     examples: [
//         '<span class="highlight-dark">p *</span> selects every element inside all <span class="highlight-dark">&lt;p&gt;</span> elements.',
//         '<span class="highlight-dark">ul.fancy *</span> selects every element inside all <span class="highlight-dark">&lt;ul class="fancy"&gt;</span> elements.',
//     ],
//     markupElements: `
// <plate id="fancy">
//   <orange class="small"/>
// </plate>
// <plate>
//   <pickle/>
// </plate>
// <apple class="small"/>
// <plate>
//   <apple/>
// </plate>`,
// },
// {
//     doThis: "Select every apple that's next to a plate",
//     selector: 'plate + apple',
//     helpTitle: 'Select an element that directly follows another element',
//     selectorName: 'Adjacent Sibling Selector',
//     syntax: 'A + B',
//     help:
//         "This selects all <span class="highlight-dark">B</span> elements that directly follow <span class="highlight-dark">A</span>. Elements that follow one another are called siblings. They're on the same level, or depth. <br/><br/>In the HTML markup for this level, elements that have the same indentation are siblings.",
//     examples: [
//         '<span class="highlight-dark">p + .intro</span> selects every element with <span class="highlight-dark">class="intro"</span> that directly follows a <span class="highlight-dark">&lt;p&gt;</span>',
//         '<span class="highlight-dark">div + a</span> selects every <span class="highlight-dark">&lt;a&gt;</span> element that directly follows a <span class="highlight-dark">&lt;div&gt;</span>',
//     ],
//     markupElements: `
// <bento>
//   <apple class="small"/>
// </bento>
// <plate />
// <apple class="small"/>
// <plate />
// <apple/>
// <apple class="small"/>
// <apple class="small"/>
// `,
// },
// {
//     selectorName: 'General Sibling Selector',
//     helpTitle: 'Select elements that follows another element',
//     syntax: 'A ~ B',
//     doThis: 'Select the pickles beside the bento',
//     selector: 'bento ~ pickle',
//     help:
//         'You can select all siblings of an element that follow it. This is like the Adjacent Selector (A + B) except it gets all of the following elements instead of one.',
//     examples: ['<span class="highlight-dark">A ~ B</span> selects all <span class="highlight-dark">B</span> that follow a <span class="highlight-dark">A</span>'],
//     markupElements: `
// <pickle/>
// <bento>
//   <orange class="small"/>
// </bento>
// <pickle class="small"/>
// <pickle/>
// <plate>
//   <pickle/>
// </plate>
// <plate>
//   <pickle class="small"/>
// </plate>
// `,
// },
// {
//     selectorName: 'children Selector',
//     syntax: 'A > B&nbsp;',
//     doThis: 'Select the apple directly on a plate',
//     selector: 'plate > apple',
//     helpTitle: 'Select direct childrenren of an element',
//     help:
//         'You can select elements that are direct childrenren of other elements. A children element is any element that is nested directly in another element. <br><br>Elements that are nested deeper than that are called descendant elements.',
//     examples: [
//         '<span class="highlight-dark">A > B</span> selects all <span class="highlight-dark">B</span> that are a direct childrenren <span class="highlight-dark">A</span>',
//     ],
//     markupElements: `
// <plate>
//   <bento>
//     <apple/>
//   </bento>
// </plate>
// <plate>
//   <apple/>
// </plate>
// <plate/>
// <apple/>
// <apple class="small"/>
// `,
// },
// {
//     selectorName: 'First children Pseudo-selector',
//     helpTitle: 'Select a first children element inside of another element',
//     doThis: 'Select the top orange',
//     selector: 'plate :first-children',
//     syntax: ':first-children',

//     help:
//         'You can select the first children element. A children element is any element that is directly nested in another element. You can combine this pseudo-selector with other selectors.',
//     examples: [
//         '<span class="highlight-dark">:first-children</span> selects all first children elements.',
//         '<span class="highlight-dark">p:first-children</span> selects all first children <span class="highlight-dark">&lt;p&gt;</span> elements.',
//         '<span class="highlight-dark">div p:first-children</span> selects all first children <span class="highlight-dark">&lt;p&gt;</span> elements that are in a <span class="highlight-dark">&lt;div&gt;</span>.',
//     ],
//     markupElements: `
// <bento/>
// <plate />
// <plate>
//   <orange />
//   <orange />
//   <orange />
// </plate>
// <pickle class="small" />
// `,
// },
// {
//     selectorName: 'Only children Pseudo-selector',
//     helpTitle: 'Select an element that are the only element inside of another one.',
//     doThis: 'Select the apple and the pickle on the plates',
//     selector: 'plate :only-children',
//     syntax: ':only-children',
//     help: 'You can select any element that is the only element inside of another one.',
//     examples: [
//         '<span class="highlight-dark">span:only-children</span> selects the <span class="highlight-dark">&lt;span&gt;</span> elements that are the only children of some other element.',
//         '<span class="highlight-dark">ul li:only-children</span> selects the only <span class="highlight-dark">&lt;li&gt;</span> element that are in a <span class="highlight-dark">&lt;ul&gt;</span>.',
//     ],
//     markupElements: `
// <plate>
//   <apple/>
// </plate>
// <plate>
//   <pickle />
// </plate>
// <bento>
//   <pickle />
// </bento>
// <plate>
//   <orange class="small"/>
//   <orange/>
// </plate>
// <pickle class="small"/>
// `,
// },
// {
//     selectorName: 'Last children Pseudo-selector',
//     helpTitle: 'Select the last element inside of another element',
//     doThis: 'Select the small apple and the pickle',
//     selector: '.small:last-children',
//     syntax: ':last-children',
//     help:
//         'You can use this selector to select an element that is the last children element inside of another element. <br><br>Pro Tip &rarr; In cases where there is only one element, that element counts as the first-children, only-children and last-children!',
//     examples: [
//         '<span class="highlight-dark">:last-children</span> selects all last-children elements.',
//         '<span class="highlight-dark">span:last-children</span> selects all last-children <span class="highlight-dark">&lt;span&gt;</span> elements.',
//         '<span class="highlight-dark">ul li:last-children</span> selects the last <span class="highlight-dark">&lt;li&gt;</span> elements inside of any <span class="highlight-dark">&lt;ul&gt;</span>.',
//     ],
//     markupElements: `
// <plate id="fancy">
//   <apple class="small"/>
// </plate>
// <plate/>
// <plate>
//   <orange class="small"/>
//   <orange>
// </plate>
// <pickle class="small"/>`,
// },
// {
//     selectorName: 'Nth children Pseudo-selector',
//     helpTitle: 'Select an element by its order in another element',
//     doThis: 'Select the 3rd plate',
//     selector: ':nth-children(3)',
//     syntax: ':nth-children(A)',
//     help: 'Selects the <span class="highlight-dark">nth</span> (Ex: 1st, 3rd, 12th etc.) children element in another element.',
//     examples: [
//         '<span class="highlight-dark">:nth-children(8)</span> selects every element that is the 8th children of another element.',
//         '<span class="highlight-dark">div p:nth-children(2)</span> selects the second <span class="highlight-dark">p</span> in every <span class="highlight-dark">div</span>',
//     ],
//     markupElements: `
// <plate/>
// <plate/>
// <plate/>
// <plate id="fancy"/>
// `,
// },
// {
//     selectorName: 'Nth Last children Selector',
//     helpTitle: 'Select an element by its order in another element, counting from the back',
//     doThis: 'Select the 1st bento',
//     selector: 'bento:nth-last-children(3)',
//     syntax: ':nth-last-children(A)',
//     help: 'Selects the childrenren from the bottom of the parent. This is like nth-children, but counting from the back!',
//     examples: ['<span class="highlight-dark">:nth-last-children(2)</span> selects all second-to-last children elements.'],
//     markupElements: `
// <plate/>
// <bento/>
// <plate>
//   <orange/>
//   <orange/>
//   <orange/>
// </plate>
// <bento/>
// `,
// },
// {
//     selectorName: 'First of Type Selector',
//     helpTitle: 'Select the first element of a specific type',
//     doThis: 'Select first apple',
//     selector: 'apple:first-of-type',
//     syntax: ':first-of-type',
//     help: 'Selects the first element of that type within another element.',
//     examples: ['<span class="highlight-dark">span:first-of-type</span> selects the first <span class="highlight-dark">&lt;span&gt;</span> in any element.'],
//     markupElements: `
// <orange class="small"/>
// <apple/>
// <apple class="small"/>
// <apple/>
// <apple class="small"/>
// <plate>
//   <orange class="small"/>
//   <orange/>
// </plate>
// `,
// },
// {
//     selectorName: 'Nth of Type Selector',
//     doThis: 'Select all even plates',
//     selector: 'plate:nth-of-type(even)',
//     syntax: ':nth-of-type(A)',
//     help:
//         'Selects a specific element based on its type and order in another element - or even or odd instances of that element.',
//     examples: [
//         '<span class="highlight-dark">div:nth-of-type(2)</span> selects the second instance of a div.',
//         '<span class="highlight-dark">.example:nth-of-type(odd)</span> selects all odd instances of a the example class.',
//     ],
//     markupElements: `
// <plate/>
// <plate/>
// <plate/>
// <plate/>
// <plate id="fancy"/>
// <plate/>
// `,
// },
// {
//     selectorName: 'Nth-of-type Selector with Formula',
//     doThis: 'Select every 2nd plate, starting from the 3rd',
//     selector: 'plate:nth-of-type(2n+3)',
//     syntax: ':nth-of-type(An+B)',
//     help:
//         'The nth-of-type formula selects every nth element, starting the count at a specific instance of that element.',
//     examples: [
//         '<span class="highlight-dark">span:nth-of-type(6n+2)</span> selects every 6th instance of a <span class="highlight-dark">&lt;span&gt;</span>, starting from (and including) the second instance.',
//     ],
//     markupElements: `
// <plate/>
// <plate>
//   <pickle class="small" />
// </plate>
// <plate>
//   <apple class="small" />
// </plate>
// <plate/>
// <plate>
//   <apple />
// </plate>
// <plate/>
// `,
// },
// {
//     selectorName: 'Only of Type Selector',
//     helpTitle: 'Select elements that are the only ones of their type within their parent element',
//     selector: 'apple:only-of-type',
//     syntax: ':only-of-type',
//     doThis: 'Select the apple on the middle plate',
//     help: 'Selects the only element of its type within another element.',
//     examples: [
//         '<span class="highlight-dark">p span:only-of-type</span> selects a <span class="highlight-dark">&lt;span&gt;</span> within any <span class="highlight-dark">&lt;p&gt;</span> if it is the only <span class="highlight-dark">&lt;span&gt;</span> in there.',
//     ],
//     markupElements: `
// <plate id="fancy">
//   <apple class="small" />
//   <apple />
// </plate>
// <plate>
//   <apple class="small" />
// </plate>
// <plate>
//   <pickle />
// </plate>
// `,
// },
// {
//     selectorName: 'Last of Type Selector',
//     helpTitle: 'Select the last element of a specific type',
//     doThis: 'Select the last apple and orange',
//     selector: '.small:last-of-type',
//     syntax: ':last-of-type',
//     help:
//         'Selects each last element of that type within another element. Remember type refers the kind of tag, so <span class="highlight-dark">&lt;p&gt;</span> and <span class="highlight-dark">&lt;span&gt;</span> are different types. <br><br> I wonder if this is how the last dinosaur was selected before it went extinct.',
//     examples: [
//         '<span class="highlight-dark">div:last-of-type</span> selects the last <span class="highlight-dark">&lt;div&gt;</span> in every element.',
//         '<span class="highlight-dark">p span:last-of-type</span> selects the last <span class="highlight-dark">&lt;span&gt;</span> in every <span class="highlight-dark">&lt;p&gt;</span>.',
//     ],
//     markupElements: `
// <orange class="small"/>
// <orange class="small" />
// <pickle />
// <pickle />
// <apple class="small" />
// <apple class="small" />
// `,
// },
// {
//     selectorName: 'Empty Selector',
//     helpTitle: "Select elements that don't have childrenren",
//     doThis: 'Select the empty bentos',
//     selector: 'bento:empty',
//     syntax: ':empty',
//     help: "Selects elements that don't have any other elements inside of them.",
//     examples: ['<span class="highlight-dark">div:empty</span> selects all empty <span class="highlight-dark">&lt;div&gt;</span> elements.'],
//     markupElements: `
// <bento/>
// <bento>
//   <pickle class="small"/>
// </bento>
// <plate/>
// <bento/>`,
// },
// {
//     selectorName: 'Negation Pseudo-class',
//     helpTitle: "Select all elements that don't match the negation selector",
//     doThis: 'Select the big apples',
//     selector: 'apple:not(.small)',
//     syntax: ':not(X)',
//     help: 'You can use this to select all elements that do not match selector <span class="highlight-dark">"X"</span>.',
//     examples: [
//         '<span class="highlight-dark">:not(#fancy)</span> selects all elements that do not have <span class="highlight-dark">id="fancy"</span>.',
//         '<span class="highlight-dark">div:not(:first-children)</span> selects every <span class="highlight-dark">&lt;div&gt;</span> that is not a first children.',
//         '<span class="highlight-dark">:not(.big, .medium)</span> selects all elements that do not have <span class="highlight-dark">class="big"</span> or <span class="highlight-dark">class="medium"</span>.',
//     ],
//     markupElements: `
// <plate id="fancy">
//   <apple class="small" />
// </plate>
// <plate>
//   <apple />
// </plate>
// <apple />
// <plate>
//   <orange class="small" />
// </plate>
// <pickle class="small" />
// `,
// },
// {
//     selectorName: 'Attribute Selector',
//     helpTitle: 'Select all elements that have a specific attribute',
//     doThis: 'Select the items for someone',
//     selector: '[for]',
//     syntax: '[attribute]',
//     help:
//         'Attributes appear inside the opening tag of an element, like this: <span class="highlight-dark">&lt;span attribute="value"&gt;</span>. An attribute does not always have a value, it can be blank!',
//     examples: [
//         '<span class="highlight-dark">a[href]</span> selects all <span class="highlight-dark">&lt;a&gt;</span> elements that have a <span class="highlight-dark">href="anything"</span> attribute.',
//         '<span class="highlight-dark">[type]</span> selects all elements that have a <span class="highlight-dark">type="anything"</span>. attribute',
//     ],
//     markupElements: `
// <bento><apple class="small"/></bento>
// <apple for="Ethan"/>
// <plate for="Alice">
// <pickle/>
// </plate>
// <bento for="Clara">
// <orange/>
// </bento>
// <pickle/>`,
// },
// {
//     selectorName: 'Attribute Selector',
//     helpTitle: 'Select all elements that have a specific attribute',
//     doThis: 'Select the plates for someone',
//     selector: 'plate[for]',
//     syntax: 'A[attribute]',
//     help:
//         'Combine the attribute selector with another selector (like the tag name selector) by adding it to the end.',
//     examples: [
//         '<span class="highlight-dark">[value]</span> selects all elements that have a <span class="highlight-dark">value="anything"</span> attribute.',
//         '<span class="highlight-dark">a[href]</span> selects all <span class="highlight-dark">&lt;a&gt;</span> elements that have a <span class="highlight-dark">href="anything"</span> attribute.',
//         '<span class="highlight-dark">input[disabled]</span> selects all <span class="highlight-dark">&lt;input&gt;</span> elements with the <span class="highlight-dark">disabled</span> attribute',
//     ],
//     markupElements: `
// <plate for="Sarah">
// <pickle/>
// </plate>
// <plate for="Luke">
// <apple/>
// </plate>
// <plate/>
// <bento for="Steve">
// <orange/>
// </bento>
// `,
// },
// {
//     selectorName: 'Attribute Value Selector',
//     helpTitle: 'Select all elements that have a specific attribute value',
//     doThis: "Select Vitaly's meal",
//     selector: '[for=Vitaly]',
//     syntax: '[attribute="value"]',
//     help: 'Attribute selectors are case sensitive, each character must match exactly.',
//     examples: ['<span class="highlight-dark">input[type="checkbox"]</span> selects all checkbox input elements.'],
//     markupElements: `
// <apple for="Alexei" />
// <bento for="Albina">
// <apple />
// </bento>
// <bento for="Vitaly">
// <orange/>
// </bento>
// <pickle/>
// `,
// },
// {
//     selectorName: 'Attribute Starts With Selector',
//     helpTitle: 'Select all elements with an attribute value that starts with specific characters',
//     doThis: "Select the items for names that start with 'Sa'",
//     selector: '[for^="Sa"]',
//     syntax: '[attribute^="value"]',
//     // help : "You can use quotes around the value in the selector, or not&mdash;it's optional!",
//     examples: [
//         '<span class="highlight-dark">.toy[category^="Swim"]</span> selects elements with class <span class="highlight-dark">toy</span> and either <span class="highlight-dark">category="Swimwear"</span> or <span class="highlight-dark">category="Swimming"</span>.',
//     ],
//     markupElements: `
// <plate for="Sam">
// <pickle/>
// </plate>
// <bento for="Sarah">
// <apple class="small"/>
// </bento>
// <bento for="Mary">
// <orange/>
// </bento>
// `,
// },
// {
//     selectorName: 'Attribute Ends With Selector',
//     helpTitle: 'Select all elements with an attribute value that ends with specific characters',
//     doThis: "Select the items for names that end with 'ato'",
//     selector: '[for$="ato"]',
//     syntax: '[attribute$="value"]',
//     help: '',
//     examples: ['<span class="highlight-dark">img[src$=".jpg"]</span> selects all images display a <span class="highlight-dark">.jpg</span> image.'],
//     markupElements: `
// <apple class="small"/>
// <bento for="Hayato">
// <pickle/>
// </bento>
// <apple for="Ryota" />
// <plate for="Minato">
// <orange/>
// </plate>
// <pickle class="small"/>
// `,
// },
// {
//     selectorName: 'Attribute Wildcard Selector',
//     helpTitle: 'Select all elements with an attribute value that contains specific characters anywhere',
//     syntax: '[attribute*="value"]',
//     doThis: "Select the meals for names that contain 'obb'",
//     selector: '[for*="obb"]',
//     help:
//         'A useful selector if you can identify a common pattern in things like <span class="highlight-dark">class</span>, <span class="highlight-dark">href</span> or <span class="highlight-dark">src</span> attributes.',
//     examples: [
//         '<span class="highlight-dark">img[src*="/thumbnails/"]</span> selects all image elements that show images from the "thumbnails" folder.',
//         '<span class="highlight-dark">[class*="heading"]</span> selects all elements with "heading" in their class, like <span class="highlight-dark">class="main-heading"</span> and <span class="highlight-dark">class="sub-heading"</span>',
//     ],
//     markupElements: `
// <bento for="Robbie">
// <apple />
// </bento>
// <bento for="Timmy">
// <pickle />
// </bento>
// <bento for="Bobby">
// <orange />
// </bento>
// `,
// },
