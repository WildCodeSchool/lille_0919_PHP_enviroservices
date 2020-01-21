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
const organismsLister = document.querySelectorAll('.organismsLister');
const organismsActionsAdd = document.querySelectorAll('.organismsActionsAdd');
const organismsListerCollector = document.querySelectorAll('.organismsListerCollector');
const organismsAddCollector = document.querySelectorAll('.organismsAddCollector');
// eslint-disable-next-line no-plusplus

// eslint-disable-next-line no-plusplus
for (let number = 0; number < organisms.length; number++) {
    organisms[number].addEventListener('click', () => {
        organismsLister[number].classList.toggle('displayed');
        organismsActionsAdd[number].classList.toggle('displayed');
        organismsListerCollector[number].classList.toggle('displayed');
        organismsAddCollector[number].classList.toggle('displayed');
    });
}

const officialDocuments = document.querySelectorAll('.officialDocuments');
const officialDocumentsBc = document.querySelectorAll('.officialDocumentsBc');
const officialDocumentsCi = document.querySelectorAll('.officialDocumentsCi');
// eslint-disable-next-line no-plusplus

// eslint-disable-next-line no-plusplus
for (let number = 0; number < officialDocuments.length; number++) {
    officialDocuments[number].addEventListener('click', () => {
        officialDocumentsBc[number].classList.toggle('displayed');
        officialDocumentsCi[number].classList.toggle('displayed');
    });
    $(document).ready(function () {
        $('#search_nameSearch').keyup(function () {
            // rafaraichir pour avoir un blanc lors de la frappe
            $('.resultSearch').html('');
            // recuperation des données
            let users = $(this).val();
            // eslint-disable-next-line eqeqeq
            if (users !== "") {
                // animation et recuperation des données // rafraichir un bout de page
                $.ajax({
                    type: 'GET',
                    // url pour raffraichir les données
                    url: "home",
                    //encoder la variable pour quelle ne soit pas en claire(secu)
                    data: 'users=' + encodeURIComponent(users),
                    // data valeur par def d'ajax données recup du resultat erreor ou succes.
                    success: function (data) {
                        if (data !== "") {
                            // afficher les données $data
                            $('.resultSearch').innerHTML = data;
                            console.log(data);
                        } else {
                            //meme chose pour recup un element d'un id
                            document.getElementsByClassName('resultSearch').innerHTML ="<div>Aucunes recherches trouvées</div>"
                        }
                    }
                });
            }
        })
    });
}
