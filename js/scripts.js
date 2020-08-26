const hamb = document.querySelector('#hamburger_button');
const menu = document.querySelector('#menu');

hamb.addEventListener('click', () => {
    menu.classList.toggle('menu-active');
});