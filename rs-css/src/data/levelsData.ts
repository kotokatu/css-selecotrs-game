export type LevelObject = {
    id: number;
    task: string;
    selector: string;
    markup: elemObject[];
};

export type elemObject = {
    tag: string;
    class?: string;
    id?: string;
    attribute?: [string, string];
    child?: elemObject;
};

export const LEVELS_LIST: readonly LevelObject[] = [
    {
        id: 1,
        task: 'Select the plates',
        selector: 'plate',
        markup: [{ tag: 'plate' }, { tag: 'plate' }],
    },
    {
        id: 2,
        task: 'Select the bento boxes',
        selector: 'bento',
        markup: [{ tag: 'bento' }, { tag: 'plate' }, { tag: 'bento' }],
    },
    {
        id: 3,
        task: 'Select the fancy plate',
        selector: '#fancy',
        markup: [{ tag: 'plate', id: 'fancy' }, { tag: 'plate' }, { tag: 'bento' }],
    },
    // {
    //     helpTitle: 'Select an element inside another element',
    //     selectorName: 'Descendant Selector',
    //     doThis: 'Select the apple on the plate',
    //     selector: 'plate apple',
    //     syntax: 'A&nbsp;&nbsp;B',
    //     help:
    //         'Selects all <span class="highlight-dark">B</span> inside of <span class="highlight-dark">A</span>. <span class="highlight-dark">B</span> is called a descendant because it is inside of another element.',
    //     examples: [
    //         '<span class="highlight-dark">p&nbsp;&nbsp;strong</span> selects all <span class="highlight-dark">&lt;strong&gt;</span> elements that are inside of any <span class="highlight-dark">&lt;p&gt;</span>',
    //         '<span class="highlight-dark">#fancy&nbsp;&nbsp;span</span> selects any <span class="highlight-dark">&lt;span&gt;</span> elements that are inside of the element with <span class="highlight-dark">id="fancy"</span>',
    //     ],
    //     markupElements: ['<bento></bento>', '<plate>', '<apple></apple>', '</plate>', '<apple></apple>'],
    // },
    // {
    //     doThis: 'Select the pickle on the fancy plate',
    //     selector: '#fancy pickle',
    //     helpTitle: 'Combine the Descendant & ID Selectors',
    //     syntax: '#id&nbsp;&nbsp;A',
    //     help: 'You can combine any selector with the descendent selector.',
    //     examples: [
    //         '<span class="highlight-dark">#cool&nbsp;span</span> selects all <span class="highlight-dark">&lt;span&gt;</span> elements that are inside of elements with <span class="highlight-dark">id="cool"</span>',
    //     ],
    //     markupElements: `
    // <bento>
    // <orange></orange>
    // </bento>
    // <plate id="fancy">
    // <pickle></pickle>
    // </plate>
    // <plate>
    // <pickle></pickle>
    // </plate>
    // `,
    // },
    // {
    //     doThis: 'Select the small apples',
    //     selector: '.small',
    //     selectorName: 'Class Selector',
    //     helpTitle: 'Select elements by their class',
    //     syntax: '.classname',
    //     help:
    //         'The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.',
    //     examples: ['<span class="highlight-dark">.neato</span> selects all elements with <span class="highlight-dark">class="neato"</span>'],
    //     markupElements: `
    // <apple></apple>
    // <apple class="small"></apple>
    // <plate>
    // <apple class="small"></apple>
    // </plate>
    // <plate></plate>
    // `,
    // },
    // {
    //     doThis: 'Select the small oranges',
    //     selector: 'orange.small',
    //     helpTitle: 'Combine the Class Selector',
    //     syntax: 'A.className',
    //     help: 'You can combine the class selector with other selectors, like the type selector.',
    //     examples: [
    //         '<span class="highlight-dark">ul.important</span> selects all <span class="highlight-dark">&lt;ul&gt;</span> elements that have <span class="highlight-dark">class="important"</span>',
    //         '<span class="highlight-dark">#big.wide</span> selects all elements with <span class="highlight-dark">id="big"</span> that also have <span class="highlight-dark">class="wide"</span>',
    //     ],
    //     markupElements: `
    // <apple></apple>
    // <apple class="small"></apple>
    // <bento>
    // <orange class="small"></orange>
    // </bento>
    // <plate>
    // <orange></orange>
    // </plate>
    // <plate>
    // <orange class="small"></orange>
    // </plate>`,
    // },
    // {
    //     doThis: 'Select the small oranges in the bentos',
    //     selector: 'bento orange.small',
    //     syntax: 'Put your back into it!',
    //     helpTitle: 'You can do it...',
    //     help: 'Combine what you learned in the last few levels to solve this one!',
    //     markupElements: `
    // <bento>
    //   <orange/>
    // </bento>
    // <orange class="small"/>
    // <bento>
    //   <orange class="small"/>
    // </bento>
    // <bento>
    //   <apple class="small"/>
    // </bento>
    // <bento>
    //   <orange class="small"/>
    // </bento>
    // `,
    // },
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
    //     selectorName: 'Child Selector',
    //     syntax: 'A > B&nbsp;',
    //     doThis: 'Select the apple directly on a plate',
    //     selector: 'plate > apple',
    //     helpTitle: 'Select direct children of an element',
    //     help:
    //         'You can select elements that are direct children of other elements. A child element is any element that is nested directly in another element. <br><br>Elements that are nested deeper than that are called descendant elements.',
    //     examples: [
    //         '<span class="highlight-dark">A > B</span> selects all <span class="highlight-dark">B</span> that are a direct children <span class="highlight-dark">A</span>',
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
    //     selectorName: 'First Child Pseudo-selector',
    //     helpTitle: 'Select a first child element inside of another element',
    //     doThis: 'Select the top orange',
    //     selector: 'plate :first-child',
    //     syntax: ':first-child',

    //     help:
    //         'You can select the first child element. A child element is any element that is directly nested in another element. You can combine this pseudo-selector with other selectors.',
    //     examples: [
    //         '<span class="highlight-dark">:first-child</span> selects all first child elements.',
    //         '<span class="highlight-dark">p:first-child</span> selects all first child <span class="highlight-dark">&lt;p&gt;</span> elements.',
    //         '<span class="highlight-dark">div p:first-child</span> selects all first child <span class="highlight-dark">&lt;p&gt;</span> elements that are in a <span class="highlight-dark">&lt;div&gt;</span>.',
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
    //     selectorName: 'Only Child Pseudo-selector',
    //     helpTitle: 'Select an element that are the only element inside of another one.',
    //     doThis: 'Select the apple and the pickle on the plates',
    //     selector: 'plate :only-child',
    //     syntax: ':only-child',
    //     help: 'You can select any element that is the only element inside of another one.',
    //     examples: [
    //         '<span class="highlight-dark">span:only-child</span> selects the <span class="highlight-dark">&lt;span&gt;</span> elements that are the only child of some other element.',
    //         '<span class="highlight-dark">ul li:only-child</span> selects the only <span class="highlight-dark">&lt;li&gt;</span> element that are in a <span class="highlight-dark">&lt;ul&gt;</span>.',
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
    //     selectorName: 'Last Child Pseudo-selector',
    //     helpTitle: 'Select the last element inside of another element',
    //     doThis: 'Select the small apple and the pickle',
    //     selector: '.small:last-child',
    //     syntax: ':last-child',
    //     help:
    //         'You can use this selector to select an element that is the last child element inside of another element. <br><br>Pro Tip &rarr; In cases where there is only one element, that element counts as the first-child, only-child and last-child!',
    //     examples: [
    //         '<span class="highlight-dark">:last-child</span> selects all last-child elements.',
    //         '<span class="highlight-dark">span:last-child</span> selects all last-child <span class="highlight-dark">&lt;span&gt;</span> elements.',
    //         '<span class="highlight-dark">ul li:last-child</span> selects the last <span class="highlight-dark">&lt;li&gt;</span> elements inside of any <span class="highlight-dark">&lt;ul&gt;</span>.',
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
    //     selectorName: 'Nth Child Pseudo-selector',
    //     helpTitle: 'Select an element by its order in another element',
    //     doThis: 'Select the 3rd plate',
    //     selector: ':nth-child(3)',
    //     syntax: ':nth-child(A)',
    //     help: 'Selects the <span class="highlight-dark">nth</span> (Ex: 1st, 3rd, 12th etc.) child element in another element.',
    //     examples: [
    //         '<span class="highlight-dark">:nth-child(8)</span> selects every element that is the 8th child of another element.',
    //         '<span class="highlight-dark">div p:nth-child(2)</span> selects the second <span class="highlight-dark">p</span> in every <span class="highlight-dark">div</span>',
    //     ],
    //     markupElements: `
    // <plate/>
    // <plate/>
    // <plate/>
    // <plate id="fancy"/>
    // `,
    // },
    // {
    //     selectorName: 'Nth Last Child Selector',
    //     helpTitle: 'Select an element by its order in another element, counting from the back',
    //     doThis: 'Select the 1st bento',
    //     selector: 'bento:nth-last-child(3)',
    //     syntax: ':nth-last-child(A)',
    //     help: 'Selects the children from the bottom of the parent. This is like nth-child, but counting from the back!',
    //     examples: ['<span class="highlight-dark">:nth-last-child(2)</span> selects all second-to-last child elements.'],
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
    //     helpTitle: "Select elements that don't have children",
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
    //         '<span class="highlight-dark">div:not(:first-child)</span> selects every <span class="highlight-dark">&lt;div&gt;</span> that is not a first child.',
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
];
