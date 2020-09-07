//initiate swup
const swup = new Swup(); 

init = () => {
    const hamButton = document.querySelector('#hamburger-button');
    const navbar = document.querySelector('nav');
    const logo = document.querySelector('#logo');
    const menu = document.querySelector("#menu");
    const cases = document.querySelectorAll('.case-study');
    //handle scrolling on index
    workScroll = () => {
        document.querySelector('#padding-square').scrollIntoView({
                behavior: "smooth",
                block: "start"
        });
    };
    if(document.querySelector('.index')){
        menu.querySelector("a:first-of-type").addEventListener('click', () => { 
            menuSwitch();
            workScroll();
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
        document.querySelector('#scrolldown-button').addEventListener('click', () => {
            workScroll();
        })
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
        navbar.classList.toggle('flatten');
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
                navbar.classList.toggle('hidden');
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
                arrowShape: 'M70.1,22.7v55.3L22.5,50.4L70.1,22.7 M73.3,9.4c-1.3,0-2.6,0.3-3.9,1.1L12.2,43.7c-2.6,1.5-3.9,4.1-3.9,6.7c0,2.6,1.3,5.2,3.9,6.7l57.2,33.2c1.3,0.7,2.6,1.1,3.9,1.1c4.1,0,7.8-3.3,7.8-7.8V17.2C81.1,12.6,77.4,9.4,73.3,9.4L73.3,9.4z'
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
    //make the navbar transparent if scroll position is less than 1 screen height
    navScroll = () => {
        if (document.documentElement.scrollTop > 0 || window.scrollY > 0){
            navbar.classList.add('shadow');
        } else {
            navbar.classList.remove('shadow');
        };
    };
    document.addEventListener('scroll', () => {
        if (window.matchMedia('screen and (max-width:768px)').matches){
            navScroll();
        };
    });
};

document.addEventListener('DOMContentLoaded', init);
swup.on('contentReplaced', init);

unload = () => {
    document.body.classList.remove('menu-switch');
    bodyScrollLock.enableBodyScroll(menu);
}
swup.on('willReplaceContent', unload);

