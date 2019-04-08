// Формочка, що відправляє дані за допомогою JS

document.querySelector('.page-loaded')
    .innerText = new Date().toLocaleTimeString();

document.querySelector('.get-html-ajax')
    .addEventListener('click', getHtmlAjax);
 
 const READY_STATE_FINISHED = 4;
 const HTTP_STATUS_CODE_OK = 200;
    
function getHtmlAjax() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === READY_STATE_FINISHED
            && xhr.status == HTTP_STATUS_CODE_OK) {
            document.querySelector('.html-placeholder')
            .innerHTML = xhr.responseText;
        }    
    }
    xhr.open('GET', 'epigraph.html', true);
    xhr.send();
}   

//Формочка, що зберігає дані в LocalStorage

const text = document.querySelector('textarea');

document.querySelector('input[type=submit]')
    .addEventListener('click', saveText);
    
document.querySelector('.load')
    .addEventListener('click', loadText);
    
function saveText(e) {
    e.preventDefault();
    localStorage['text'] = text.value;
}

function loadText() {
    text.value = localStorage['text'] || '';
}
    
//Дані з стороннього сервісу за допомогою AJAX/FETCH

document.querySelector('.get-json-ajax')
    .addEventListener('click', getJsonAjax);
    
function getJsonAjax() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === READY_STATE_FINISHED 
            && xhr.status == HTTP_STATUS_CODE_OK) {
           const clientData = JSON.parse(xhr.responseText);
           document.querySelector('.client-name')
            .innerText = clientData.name;
           document.querySelector('.account-balance')
            .innerText = clientData.balance;
        } 
    }
    xhr.open('GET', 'client-data.json', true);
    xhr.send();
}

document.querySelector('.fetch-json')
    .addEventListener('click', fetchJSON);
    
function fetchJSON() {
    fetch('client-data.json')
        .then( response => response.json() )
        .then( clientData => {
            document.querySelector('.client-name')
                .innerText = clientData.name;
            document.querySelector('.account-balance')
                .innerText = clientData.balance;
        });
}    

document.querySelector('.login-form').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();
    fetch('form.php', {
        method: 'POST',
        body: new FormData(document.querySelector('.login-form'))
    })
    .then( response => response.text() )
    .then( html => document.querySelector('.server-response')
                                .innerHTML = html );
}

