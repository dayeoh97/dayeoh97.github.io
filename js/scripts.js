/*eslint-env browser*/
let hamButton = document.querySelector('#hamburger-button');
let logo = document.querySelector('#logo');
const menu = document.querySelector("#menu");

//click event for menu
hamButton.addEventListener('click', () => {
    hamButton.classList.toggle('menu-switch');
    logo.classList.toggle('menu-switch');
    menu.classList.toggle('menu-switch');
    document.body.classList.toggle('menu-switch');
    //check if menu is present then disable scrolling
    if(menu.className === 'menu-switch'){
        bodyScrollLock.disableBodyScroll(menu, {reserveScrollBarGap: true,});
    } else {
        bodyScrollLock.enableBodyScroll(menu);
    }
});