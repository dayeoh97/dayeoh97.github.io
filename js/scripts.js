//initiate swup
const swup = new Swup(); 

init = () => {
    const hamButton = document.querySelector('#hamburger-button');
    const logo = document.querySelector('#logo');
    const menu = document.querySelector("#menu");
    const cases = document.querySelectorAll('.case-study');
    //handle scrolling on index
    if(document.querySelector('.index')){
        menu.querySelector("a:first-of-type").addEventListener('click', () => { 
            menuSwitch();
            document.querySelector('#padding-square').scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
        logo.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            if(document.body.className === 'menu-switch'){
                menuSwitch();
            };
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
        if(document.body.className === 'menu-switch'){
            bodyScrollLock.disableBodyScroll(menu, {reserveScrollBarGap: true,});
        } else {
            bodyScrollLock.enableBodyScroll(menu);
        }
    };
    hamButton.addEventListener('click', menuSwitch);
    //get viewport size and position relative to element then apply properties on click
    if (cases) {
        cases.forEach(study => {
            study.addEventListener('click', () => {
                study.querySelector("[class*='transition']").style.top = -(study.getBoundingClientRect().top) + "px";
                study.querySelector("[class*='transition']").style.width = document.documentElement.clientWidth + "px";
            });
        });
    };
    //check for and then initiate carousel
    if (document.querySelector('.main-carousel')) {
        var caros = document.querySelectorAll('.main-carousel');
        caros.forEach(caro => {
            var flkty = new Flickity( caro, {
                pageDots: false,
                cellSelector: '.carousel-cell',
                wrapAround: true,
                imagesLoaded: true
            });
        });
    };
    //scroll page to top of screen if current page in menu is clicked
    menu.querySelectorAll('a:not(:first-of-type)').forEach(menuLink => {
        menuLink.addEventListener('click', () => {
            if (menuLink.getAttribute("href").match(window.location.pathname)){
                menuSwitch();
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            };
        });
    });
};

document.addEventListener('DOMContentLoaded', init);
swup.on('contentReplaced', init);

unload = () => {
    document.body.classList.remove('menu-switch');
    bodyScrollLock.enableBodyScroll(menu);
}
swup.on('willReplaceContent', unload);

