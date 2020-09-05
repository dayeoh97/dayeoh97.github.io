//initiate swup
const swup = new Swup(); 

init = () => {
    const hamButton = document.querySelector('#hamburger-button');
    const logo = document.querySelector('#logo');
    const menu = document.querySelector("#menu");
    const cases = document.querySelectorAll('.case-study');
    //scroll work section into view on index
    if(document.querySelector('.index')){
        menu.querySelector("a:first-of-type").addEventListener('click', () => { 
            menuSwitch();
            cases[0].scrollIntoView(true);
            window.scrollBy(0, -100);
        });
    };
    //check for the correct URL then scroll to element or top of screen
    if (window.location.href.includes("#work")){
        cases[0].scrollIntoView(true);
        window.scrollBy(0, -100);
    } else {
        window.scrollTo(0, 0);
    };
    //toggle for menu
    menuSwitch = () => {
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
    };
    hamButton.addEventListener('click', menuSwitch);
    //get element's position from screen top then apply to its top property on click
    if (cases) {
        cases.forEach(study => {
            study.addEventListener('click', () => {
                study.querySelector("[class*='transition']").style.top = -(study.getBoundingClientRect().top) + "px";
                study.querySelector("[class*='transition']").style.width = document.documentElement.clientWidth + "px";
            })
        })
    }
};

document.addEventListener('DOMContentLoaded', init);
swup.on('contentReplaced', init);

unload = () => {
    document.body.classList.remove('menu-switch');
    bodyScrollLock.enableBodyScroll(menu);
}
swup.on('willReplaceContent', unload);

