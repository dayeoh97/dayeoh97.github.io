/*eslint-env browser*/
let hamButton = document.querySelector('#hamburger-button')
let shapeLogo = document.querySelector('#logo > div:first-of-type');
let letterLogo = document.querySelector('#logo > div:last-of-type');
let menu = document.querySelector("#menu");

hamButton.addEventListener('click', () => {
    hamButton.classList.toggle('menu-switch');
    shapeLogo.classList.toggle('menu-switch');
    letterLogo.classList.toggle('menu-switch');
    menu.classList.toggle('menu-switch');
});