//initiate swup
const swup = new Swup(); 

init = () => {
    const hamButton = document.querySelector('#hamburger-button');
    const logo = document.querySelector('#logo');
    const menu = document.querySelector("#menu");
    //scroll work section into view on index
    menu.querySelector("a:first-of-type").addEventListener('click', () => { 
        menuSwitch();
        if (cases) {
            cases[0].scrollIntoView(true);
            window.scrollBy(0, -100);
        };
    });
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
    //add zoom animation if case study thumbnail is clicked
    hamButton.addEventListener('click', menuSwitch);
    const cases = document.querySelectorAll('.case-study');
    if (cases) {
        cases.forEach(study => {
            study.addEventListener('click', () => {
                study.classList.add('hidden');
                study.querySelector('img').classList.add('transition-zoom');
            });
        });
    };
    window.scrollTo(0, 0);
};

document.addEventListener('DOMContentLoaded', init);
swup.on('contentReplaced', init);

unload = () => {
    document.body.classList.remove('menu-switch');
    bodyScrollLock.enableBodyScroll(menu);
}
swup.on('willReplaceContent', unload);

