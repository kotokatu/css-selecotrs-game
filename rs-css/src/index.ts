import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

document.querySelector('pre code').addEventListener('mouseover', (e) => {
    hljs.highlightElement(e.target);
});
