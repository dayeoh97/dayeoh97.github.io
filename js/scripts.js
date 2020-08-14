const hamb = document.querySelector('#hamburger_button');
const menu = document.querySelector('#menu');

hamb.addEventListener('click', () => {
    hamb.classList.toggle('cross');
    menu.classList.toggle('cross');
});