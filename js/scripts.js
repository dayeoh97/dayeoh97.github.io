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
                study.classList.toggle('hidden');
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
                imagesLoaded: true,
                arrowShape: 'M72.6,91.2v-81c0-9-10.9-13.5-17.3-7.2L14.8,43.5c-4,4-4,10.4,0,14.3l40.5,40.5C61.7,104.7,72.6,100.2,72.6,91.2zM21.9,50.6l40.5-40.5v81L21.9,50.6z'
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

