/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
const $ = require('jquery');

// any CSS you require will output into a single css file (app.css in this case)
require('../scss/admin.scss');

// any CSS you require will output into a single css file (app.css in this case)
require('bootstrap');

const organisms = document.querySelectorAll('.organisms');
const organismActionsLister = document.querySelectorAll('.organismActionsLister');
const organismActionsAdd = document.querySelectorAll('.organismActionsAdd');
// eslint-disable-next-line no-plusplus

// eslint-disable-next-line no-plusplus
for (let number = 0; number < organisms.length; number++) {
    organisms[number].addEventListener('click', () => {
        organismActionsLister[number].classList.toggle('displayed');
        organismActionsAdd[number].classList.toggle('displayed');
    });
}

const officialDocuments = document.querySelectorAll('.officialDocuments');
const officialDocumentsBc = document.querySelectorAll('.officialDocumentsBc');
const officialDocumentsCi = document.querySelectorAll('.officialDocumentsCi');
// eslint-disable-next-line no-plusplus

// eslint-disable-next-line no-plusplus
for (let number = 0; number < collecters.length; number++) {
    officialDocuments[number].addEventListener('click', () => {
        officialDocumentsBc[number].classList.toggle('displayed');
        officialDocumentsCi[number].classList.toggle('displayed');
    });
}
